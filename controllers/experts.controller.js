const Expert = require('../models/Expert')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const axios = require('axios')

exports.createExpert = async (req, res, next) => {
  const { profilePicture, resume } = req.files

  const profilePictureUrl = profilePicture[0].path
  const resumeUrl = resume[0].path

  const {
    firstName,
    lastName,
    specialization,
    email,
    phoneNumber,
    address,
    city,
    pinCode,
    displayName,
    username,
    password,
    calendlyUsername,
    podcastRss,
  } = req.body

  // console.log(firstName, lastName, specialization, email)

  // console.log(profilePictureUrl, resumeUrl)

  // Just create the Expert Collection now with new Expert({..pass data})
  // My pc is doomed ;(

  try {
    const expert = await Expert.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
        {
          displayName: displayName,
        },
      ],
    })

    if (!expert) {
      try {
        console.log({
          firstName,
          lastName,
          specialization,
          email,
          phoneNumber,
          address,
          city,
          pinCode,
          displayName,
          username,
          password,
          calendlyUsername,
          podcastRss,
          profilePicture: profilePictureUrl,
          resume: resumeUrl,
        })
        const expert = await Expert.create({
          firstName,
          lastName,
          specialization,
          email,
          phoneNumber,
          address,
          city,
          pinCode,
          displayName,
          username,
          password,
          calendlyUsername,
          podcastRss,
          profilePicture: profilePictureUrl,
          resume: resumeUrl,
        })

        if (expert) {
          try {
            await sendEmail({
              to: email,
              templateName: 'expertRegistration',
            })

            res.status(200).json({
              success: true,
              data: 'email sent!',
            })
          } catch (error) {
            return next(new ErrorResponse('Email Could not be sent!', 500))
          }
        } else {
          return next(new ErrorResponse('User Could Not Be Registered', 500))
        }
      } catch (err) {
        return next(new ErrorResponse(err, 500))
      }
    } else {
      return next(new ErrorResponse('User Already Exists', 409))
    }
  } catch (error) {
    next(error)
  }
}

exports.fetchAllExperts = async (req, res, next) => {
  try {
    const experts = await Expert.find()

    return res.status(200).json({
      success: true,
      data: experts,
    })
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

exports.getExpertById = async (req, res, next) => {
  try {
    const { expertId } = req.body

    const expert = await Expert.findById(expertId)

    return res.status(200).json({
      success: true,
      expert: expert,
    })
  } catch (err) {
    // console.log(err)
    next(err)
  }
}

exports.getExpertByUsername = async (req, res, next) => {
  try {
    const { username } = req.body

    const expert = await Expert.findOne({ username: username })

    return res.status(200).json({
      success: true,
      data: expert.podcastRss,
    })
  } catch (err) {
    next(err)
  }
}

/*Three status  */
exports.changeStatusOfExpert = async (req, res, next) => {
  try {
    const { expertId } = req.body
    const expert = await Expert.findById(expertId)

    expert.verified = !expert.verified

    // There was some error in sending mail do check

    if (expert.verified) {
      // send Mail that you have been verfied and can use our services
      try {
        const blogData = {
          name: expert.firstName + ' ' + expert.lastName,
          email: expert.email,
          password: expert.password,
          username: expert.username,
        }

        // creating expert blog account
        const blogResponse = await axios.post(
          `https://releaf-blogging-platform.herokuapp.com/api/v1/users/signup`,
          blogData
        )

        await sendEmail({
          to: expert.email,
          templateName: 'expertApproval',
          expertDisplayName: expert.displayName,
        })

        res.status(200).json({
          success: true,
          data: 'email sent!',
        })
      } catch (error) {
        return next(new ErrorResponse('Approval Email Could not be sent!', 500))
      }
    } else {
      try {
        await sendEmail({
          to: expert.email,
          templateName: 'expertRejection',
        })

        res.status(200).json({
          success: true,
          data: 'email sent!',
        })
      } catch (error) {
        return next(
          new ErrorResponse('Rekection Email Could not be sent!', 500)
        )
      }
    }

    await expert.save()

    return res.status(200).json({
      success: true,
      data: expert,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

exports.expertLogin = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password.', 400))
  }
  try {
    const expert = await Expert.findOne({ email }).select('+password')
    if (!expert) {
      return next(new ErrorResponse('Invlaid Credentials.', 401))
    }
    if (expert.verified === true) {
      const isMatch = await expert.matchPasswords(password)
      if (!isMatch) {
        return next(new ErrorResponse('Invlaid Credentials.', 401))
      }

      sendToken(expert, 200, res)
    } else {
      return next(new ErrorResponse('Wait for approval!.', 401))
    }
  } catch (err) {
    next(err)
  }
}

exports.expertsForgotPassword = async (req, res, next) => {
  const { email } = req.body

  try {
    const expert = await Expert.findOne({ email })
    console.log(expert)

    if (!expert) {
      return next(new ErrorResponse('Email could not be sent', 404))
    }

    if (expert.verified === true) {
      const resetToken = expert.getResetPasswordToken()

      await expert.save()

      const resetUrl = `${process.env.FRONT_END_URI}/expert/reset-password/${resetToken}`

      try {
        console.log(email)
        await sendEmail({
          to: email,
          resetToken: resetUrl,
          templateName: 'passwordResetEmail',
        })

        res.status(200).json({
          success: true,
          data: 'email sent!',
        })
      } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()
        return next(new ErrorResponse('Email Could not be sent!', 500))
      }
    } else {
      return next(new ErrorResponse('Wait for approval!.', 401))
    }
  } catch (error) {
    next(error)
  }
}

exports.expertsResetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex')

  try {
    const expert = await Expert.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    })

    if (!expert) {
      return next(new ErrorResponse('Invalid Reset Token', 400))
    }

    expert.password = req.body.password
    expert.resetPasswordToken = undefined
    expert.resetPasswordExpire = undefined

    await expert.save()

    res.status(201).json({
      success: true,
      data: 'Password reset successfully!',
    })
  } catch (error) {
    next(error)
  }
}

const sendToken = (expert, statusCode, res) => {
  const token = expert.getSignedJwtToken()
  res.status(statusCode).json({
    success: true,
    token,
  })
}

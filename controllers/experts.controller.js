const Expert = require('../models/Expert')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')

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

    console.log(req.body)
  } catch (error) {
    console.log(error)
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

/*Three status  */
exports.changeStatusOfExpert = async (req, res, next) => {
  try {
    const { expertId } = req.body
    const expert = await Expert.findById(expertId)

    expert.verified = !expert.verified

    // There was some error in sending mail do check
    /*
    if (expert.verified) {
      // send Mail that you have been verfied and can use our services
      try {
        await sendEmail({
          to: email,
          templateName: "expertApproval",
          expertDisplayName: expert.displayName,
        });

        res.status(200).json({
          success: true,
          data: "email sent!",
        });
      } catch (error) {
        return next(new ErrorResponse("Email Could not be sent!", 500));
      }
    } else {
      try {
        await sendEmail({
          to: email,
          templateName: "expertRejection",
        });

        res.status(200).json({
          success: true,
          data: "email sent!",
        });
      } catch (error) {
        return next(new ErrorResponse("Email Could not be sent!", 500));
      }
    }
*/
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

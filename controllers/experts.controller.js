exports.createExpert = async (req, res, next) => {
  console.log('hello')

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
    displayName,
    password,
    calendyUsername,
    podcastRss,
  } = req.body

  // console.log(firstName, lastName, specialization, email)

  // console.log(profilePictureUrl, resumeUrl)

  // Just create the Expert Collection now with new Expert({..pass data})
  // My pc is doomed ;(

  try {
    res.status(200).json({
      success: true,
      data: {
        profilePictureUrl,
        resumeUrl,
      },
    })
  } catch (error) {
    console.log(error)
    return next(new ErrorResponse('some error...', 500))
  }
}

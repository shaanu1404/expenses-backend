const router = require('express').Router()
const UserProfile = require('../models/userprofile')
const { profileUpload } = require('../utils/upload')

// Update profile picture
router.post('/update-profile-image', profileUpload.single('profile'), async (req, res) => {
    try {
        if (!req.file) throw new Error('File upload failed');
        const profile = await req.user.getProfile()
        profile.profileImage = req.file.path
        await profile.save()
        return res.status(200).json({
            message: "Upload successful"
        })
    } catch (e) {
        return res.status(500).json({
            error: e.message
        })
    }
})

// Update cover image
router.post('/update-cover-image', async (req, res) => { })

// Update profile data
router.post('/update-profile', async (req, res) => { })

module.exports = router
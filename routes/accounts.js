const router = require('express').Router()
const Account = require('../models/account')

router.get('/', async (req, res) => {
    try {
        const accounts = await Account.findAll({ where: { UserId: req.user.id } })
        return res.status(200).json(accounts);
    } catch (e) {
        console.log(e)
        res.status(400).json({ error: e.errors.map(err => err.message) })
    }
})

router.post('/add', async (req, res) => {
    try {
        const { name, accountNumber } = req.body
        const account = Account.build({ name, accountNumber })
        account.UserId = req.user.id
        await account.save()
        return res.status(201).json(account);
    } catch (e) {
        console.log(e)
        res.status(400).json({ error: e.errors.map(err => err.message) })
    }
})

module.exports = router
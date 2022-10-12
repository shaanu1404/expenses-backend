const router = require('express').Router()
const Expense = require('../models/expense')
const { ExpenseType } = require('../utils/constants')

router.get('/', async (req, res) => {
    const expenses = await Expense.findAll({
        where: { UserId: req.user.id },
        include: ['account'],
        order: [['createdAt', 'DESC']]
    })
    return res.status(200).json(expenses)
})

router.post('/add', async (req, res) => {
    try {
        const { type, amount, accountId } = req.body
        await Expense.create({
            type, amount, AccountId: accountId, UserId: req.user.id
        })
        return res.status(201).json({ message: 'Expense addedd' })
    } catch (e) {
        return res.status(400).json(e)
    }
})

module.exports = router
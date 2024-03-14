const {Op} = require('sequelize')
const date = require('date-and-time')
const {sequelize} = require('../services/BDService')
const Controller = require('../controllers/Controller')
const {validationResult} = require('express-validator')
const Day = require("../models/Day")
const {paramToDate} = require("../functions/days")
const fs = require('fs')
const { paths } = require('../config')

class dayController extends Controller {
    getDays = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return this.unsuccess(res,{ message: 'Days getting error', errors: errors })
            }

            const authUser = req.authUser
            const {month, year} = req.body

            const days = await Day.findAll({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), month),
                        sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year),
                        {
                            user_id: authUser.id,
                        }
                    ]
                },
                attributes: ['id', 'date', 'work_from', 'work_to', 'siesta_from', 'siesta_to']
            })

            return this.success(res, { days: days })

        } catch (e) {
            this.error(res, e)
        }
    }

    addDay = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return this.unsuccess(res,{ message: 'Days adding error', errors: errors })
            }

            const { day } = req.body

            const dayDate = paramToDate(day.date)
            const authUser = req.authUser

            if (+day.id !== 0) {
                const candidateDay = await Day.findOne({ where: { id: day.id }, attributes: ['id'] })
                if (candidateDay) {
                    await Day.destroy({ where: { id: day.id } })
                }
            }

            await Day.create({ date: dayDate, user_id: authUser.id, work_from: day.work_from, work_to: day.work_to, siesta_from: day.siesta_from, siesta_to: day.siesta_to })
            const days = await Day.findAll({ attributes: ['id', 'date', 'work_from', 'work_to', 'siesta_from', 'siesta_to'], where: { user_id: authUser.id } })

            return this.success(res,{ days: days })

        } catch (e) {
            this.error(res, e)
        }
    }

    removeDay = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return this.unsuccess(res,{ message: 'Days removing error', errors: errors })
            }

            const authUser = req.authUser
            const { id } = req.body

            const candidateDay = await Day.findOne({ where: { id, user_id: authUser.id }, attributes: ['id'] })
            if (!candidateDay) {
                return this.unsuccess(res,{ message: "Day not exist", candidateDay })
            }

            await Day.destroy({ where: { id } })
            const days = await Day.findAll({ attributes: ['id', 'date', 'work_from', 'work_to', 'siesta_from', 'siesta_to'], where: { user_id: authUser.id } })

            return this.success(res,{ days })

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new dayController()
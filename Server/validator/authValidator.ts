import { body } from "express-validator";
import {UserModal} from '../Modal/UserModal';
import { ValidationMessage } from '../Constant/ValidationConstant';
import bcrypt from 'bcrypt'

exports.AdminSignInValidator = [
    body('email')
        .not()
        .isEmpty()
        .withMessage(`Email ID ${ValidationMessage?.IS_REQUIRED}`)
        .trim()
        .withMessage(`Email ID ${ValidationMessage.IS_REQUIRED}`)
        .isLength({ min: 1 })
        .withMessage(`Email ID ${ValidationMessage.IS_REQUIRED}`)
        .isEmail()
        .withMessage(`${ValidationMessage.IS_VALID} Email ID`)
        .custom((value, { req }) => {
            const { email } = req.body;
            return UserModal.findOne({ where: { email } }).then(async (user: any) => {
                if (!user) {
                    return Promise.reject(`Email ID ${ValidationMessage.DOES_NOT_EXIST}`)
                }
            })
        }),
    body('password')
        .not()
        .isEmpty()
        .withMessage(`Password ${ValidationMessage?.IS_REQUIRED}`)
        .trim()
        .withMessage(`Password ${ValidationMessage?.IS_REQUIRED}`)
        // .isLength({ min: ValidationLimit.PASSWORD_MIN, max: ValidationLimit.PASSWORD_MAX })
        // .withMessage(`Password ${ValidationLimit.PASSWORD_MIN_MAX_MESSAGE}`)
        .custom((value, { req }) => {
            const { email, password } = req.body;
            return UserModal.findOne({ where: { email } }).then(async (user: any) => {
                if (user) {
                    return bcrypt.compare(password, user.password).then(pwd_mtch => {
                        if (!pwd_mtch) {
                            return Promise.reject(`Password ${ValidationMessage.IS_NOT_CORRECT}`)
                        }
                    })
                }
            })
        }),
    body('custom_error')
        .custom((value, { req }) => {
            const { email, password } = req.body;
            return UserModal.findOne({ where: { email } }).then((user: any) => {
                if (user) {
                }
            })
        })
]

exports.ContactPageMessageValidator = [
    body("email")
        .not()
        .isEmpty()
        .withMessage(`email ${ValidationMessage?.IS_REQUIRED}`)
        .isEmail()
        .withMessage(`${ValidationMessage?.IS_VALID} email`)
        .isLength({min:1})
        .withMessage(`email ${ValidationMessage?.IS_REQUIRED}`)
        ,

    body("message")
        .not()
        .isEmpty()
        .withMessage(`message ${ValidationMessage?.IS_REQUIRED}`)
        .isLength({min:1, max:5000})
        .withMessage(`message ${ValidationMessage?.IS_REQUIRED}`)
]
import {body} from 'express-validator'

export const registerValidation = [
    body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({min:3,max:100})
    .withMessage("Full name must be between 3 to 100 characters"),


    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail(),
    body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min:6}),
    body("role")
    .optional()
    .isIn(['patient','doctor'])

]
export const loginValidation=[
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail(),
    body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min:6})
]
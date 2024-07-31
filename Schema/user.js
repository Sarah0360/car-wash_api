import joi from "joi";

export const userSchema = joi.object({
    firstName: joi.string().required(),
    otherNames: joi.string(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.ref('password'),
    termsAndConditions: joi.boolean(),
}) .with('password', 'confirmPassword');
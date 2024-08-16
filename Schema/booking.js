import joi from "joi";

export const bookSchema = joi.object ({
    fullName: joi.string(),
    email: joi.string().email(),
    phoneNumber: joi.string(),
    washPackages: joi.string(),
    date:joi.date(),
    time: joi.string(),
    user: joi.string()
});
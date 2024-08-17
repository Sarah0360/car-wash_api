import joi from "joi";

export const bookSchema = joi.object ({
    fullName: joi.string(),
    email: joi.string().email(),
    phoneNumber: joi.string(),
    washPackages: joi.string(),
    typeOfService: joi.string().valid('Service Center', 'Home Services'),
    date:joi.date(),
    time: joi.string(),
    user: joi.string()
});
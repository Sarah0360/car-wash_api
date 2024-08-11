import joi from "joi";

export const serviceSchema = joi.object({
    companyName:joi.string().required(),
    location:joi.string(),
    email: joi.string().email(),
    phoneNumber: joi.string(),
    image: joi.string(),
    serviceType: joi.string().valid('Car-Wash', 'Car-Services')
});
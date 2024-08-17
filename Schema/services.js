import joi from "joi";

  const servSchema = joi.object({
    companyName:joi.string().required(),
    location:joi.string(),
    email: joi.string().email(),
    phoneNumber: joi.string(),
    image: joi.string(),
    serviceType: joi.string().valid('Car-Wash', 'Car-Services'),
    booking: joi.string(),
    time: joi.string()
});
export default servSchema;

import { model, Schema,  } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const servSchema = new Schema({
    companyName:{type: String, required: true},
    location:{type: String },
    email: {type: String},
    phoneNumber: {type: string, default: false},
    image: {type: String},
    serviceType: { type: String, enum:['Car-Wash', 'Car-Services']}
}, {
   timestamps: true 
})

servSchema.plugin(toJSON);

 export const CarModel = model('Car Services', servSchema);
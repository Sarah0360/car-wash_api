import { model, Schema,  } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const car = new Schema({
    companyName:{type: String, required: true},
    location:{type: String },
    phoneNumber: {type: string, default: false},
    picture: {type: String},
    serviceType: { type: String, enum:['Car-Wash', 'Car-Services']}
}, {
   timestamps: true 
})

 carWash.plugin(toJSON);

 export const CarModel = model('Car Wash', car);
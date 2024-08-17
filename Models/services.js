import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const servSchema = new Schema({
    companyName:{type: String, required: true},
    location:{type: String },
    email: {type: String},
    phoneNumber: {type: String, default: false},
    image: {type: String},
    serviceType: { type: String, enum:['Car-Wash', 'Car-Services']},
    time: {type: String},
    booking: [{type: Types.ObjectId, ref: "Booking"}]
}, {
   timestamps: true 
})

servSchema.plugin(toJSON);

 export const CompanyModel = model('Car Services', servSchema);
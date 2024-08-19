import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const bookingSchema = new Schema ({
    fullName: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    washPackages:{type: String},
    typeOfService: { type: String, enum:['Service Center', 'Home Services']},
    date: {type: Date},
    time: {type: String},
    servSchema: [{type: Types.ObjectId, ref: "Car Services"}],  
     user: [{type: Types.ObjectId, ref: "User"}]
},{
    timestamps:true
});

bookingSchema.plugin(toJSON);

export const BookingModel = model('Booking', bookingSchema);
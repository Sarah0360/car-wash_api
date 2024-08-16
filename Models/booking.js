import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const bookingSchema = new Schema ({
    fullName: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    washPackages:{type: String},
    date: {type: Date},
    time: {type: String},
    servSchema: [{type: Types.ObjectId, ref: "User"}],
},{
    timestamps:true
});

bookingSchema.plugin(toJSON);

export const BookingModel = model('Booking', bookingSchema);
import { model, Schema, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({
    firstName: {type: String, required: true},
    otherName: {type: String},
    lastName: {type: String, required: true},
    email: {type: String, unique: true},
    password:{ type: String},
    termsAndConditions: {type: Boolean },
    
},{
    timestamps: true
});

userSchema.plugin(toJSON);

export const UserModel = model('User', userSchema)
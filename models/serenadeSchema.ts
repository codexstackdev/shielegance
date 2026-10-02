import mongoose from "mongoose";



const serenadeSchema = new mongoose.Schema({
    recipient: {type:String, required: true, trim: true},
    sender: {type:String, trim:true},
    message: {type:String, required: true, trim: true},
    songId: {type:String, required: true, trim: true}
}, {timestamps: true});

const serenadeModel = mongoose.models.serenades || mongoose.model("serenades", serenadeSchema);


export default serenadeModel;
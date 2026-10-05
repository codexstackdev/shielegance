import mongoose from "mongoose";


const loveCapsuleSchema = new mongoose.Schema({
    recipient: {type:String, required: true, trim:true},
    sender: {type:String, required: true, trim: true},
    message: {type:String, required: true, trim: true},
    unlockDate: {type:String, required: true},
    unlockTime: {type:String, required: true}
}, {timestamps: true});


const loveCapsuleModel = mongoose.models.lovecapsules || mongoose.model("lovecapsules", loveCapsuleSchema);

export default loveCapsuleModel;
import mongoose from "mongoose";


const loveLetterSchema = new mongoose.Schema({
    recipient: {type:String, required: true, trim: true},
    sender: {type:String, trim: true, default: "A nameless soul"},
    selectedTemplate: {type:String, required: true, trim: true},
    selectedFont: {type:String, required: true, trim: true},
    message: {type:String, required: true, trim: true},
    closing: {type:String, required: true, trim: true},
}, {timestamps: true});

const loveLetterModel = mongoose.models.loveLetters || mongoose.model("loveLetters", loveLetterSchema);

export default loveLetterModel;
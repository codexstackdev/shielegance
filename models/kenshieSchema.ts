import mongoose from "mongoose";


const kenshieSchema = new mongoose.Schema({
    yourName: {type:String, required: true, trim: true},
    theirName: {type:String, required: true, trim: true},
    beginning: {type:String, trim: true},
    firstImpression: {type:String, trim: true},
    firstMemorableMoment: {type:String, trim: true},
    littleThings: {type:String, trim: true},
    importantDate: {type:String, trim: true},
    challenge: {type:String, trim: true},
    realization: {type:String, trim: true},
    favoriteMemory: {type:String, trim: true},
    loveTruth: {type:String, trim: true},
    future: {type:String, trim: true},
    image: {type: String, required: true}
}, {timestamps: true});


const kenshieModel = mongoose.models.kenshie || mongoose.model("kenshie", kenshieSchema);

export default kenshieModel;
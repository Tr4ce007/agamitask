import mongoose from "mongoose";


const agentSchema = mongoose.Schema({
    name: String,
    availableFrom : Number,
    availableTo : Number,
    availableDay:String,
    email : String
})

let Agent = mongoose.model('agents',agentSchema);

export default Agent;
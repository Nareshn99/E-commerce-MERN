import mongoose from 'mongoose';

const catagorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true
    },
    slug:{
        type:String,
        lowercase:true
    }
}, { timestamps: true })

export default mongoose.model("Catagory", catagorySchema);
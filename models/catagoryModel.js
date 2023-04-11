import mongoose from 'mongoose';

const catagorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
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
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        trim: true,
    },
    slug:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Catagory",
        required: true
    },
    quantity:{
        type: Number,
        required: true,
    },
    photo:{
        type: String,
        required: true,
        // data: Buffer,
        // contentType: String,
    },
    shiping:{
        type:Boolean
    },
}, { timestamps: true })

export default mongoose.model("Product", productSchema);
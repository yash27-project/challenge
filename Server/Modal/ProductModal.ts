import { timeStamp } from "console";
import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

}, {timestamps: true})

const productModal = mongoose.model('product', productSchema);
export default productModal;
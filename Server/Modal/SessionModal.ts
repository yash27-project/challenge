import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, {timestamps: true});
const SessionModal = mongoose.model("Session", UserSchema);
export default SessionModal;
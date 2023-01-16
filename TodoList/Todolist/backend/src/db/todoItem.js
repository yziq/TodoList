import mongoose from "mongoose";
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    description: String,
    completedStatus: Boolean,
    dueDate: Date
});

export default mongoose.model('TodoItem', itemSchema);
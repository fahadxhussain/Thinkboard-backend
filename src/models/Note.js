// Models are blueprints for how your data should look and behave
import mongoose from 'mongoose';

// 1- create a schema
// 2- create a model based on that schema

const noteSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },
},
    {timestamps: true} // Automatic createdAt and updatedAt fields
)


// Model
// This creates a Note collection based on the noteSchema
const Note = mongoose.model('Note', noteSchema)
// We can create multiple models using the same schema, both will have the same structure but they will read/write to different collections in the database
export default Note;
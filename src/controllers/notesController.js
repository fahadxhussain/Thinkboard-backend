import Note from "../models/Note.js"

// if not using a parameter we can skip it by adding _ instead
export async function getAllNotes (_, res) {
    try{
        const notes = await Note.find().sort({createdAt: -1}) // createdAt: -1 will reverse teh data so we see the latest first
        res.status(200).json(notes)

    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message: "Intenal Server Error"})
    }
}


export async function createNote (req, res) {
    try{
        const {title, content} = req.body
        console.log(title, content)
        const note = new Note({title: title, content: content}) // Created
        const savedNote = await note.save() // Saved

        res.status(201).json(savedNote)

    }
    catch(error){
        console.log("Error Creating Note")
        res.status(500).json({message: "Something went wrong"})
    }
}


export async function editNotes (req, res){
    try{
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true}) // Find a note by ID and then we write which fields are to be updated
        // new: true will return the updated object after changes are applied
        // const noteId = req.params.id;

        if(!updatedNote){
            return res.status(404).json({message: "Note does not exist"})
        }
        res.status(200).json(updatedNote)
    }

    catch(error){
        console.log("Error Updating Note")
        res.status(500).json({message: "Something went wrong"})
    }
}


export async function deleteNotes (req, res) {
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote){
            return res.status(404).json({message: "Note does not exist"})
        }
        res.status(200).json({message: "Note deleted successfully"})
    }
    catch(error){
        console.log("Error Deleting Note")
        res.status(500).json({message: "Something went wrong"})
    }
}

export async function getNoteById (req, res) {
    try{
        const note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({message: "Note not Found"})
        }

        res.status(200).json(note)
    }
    catch(error){
        console.log("Error in Deleting note")
        res.status(500).json({message: "Error in deleting Note"})
    }
}


/*
export async function getNoteByTitle (req, res) {
    try{
        const {title} = req.body
        await Note.find({title: title})
    }
    catch(error){

    }
}
*/


// To make the app more organized, We can write these functions in their own seperate files too.
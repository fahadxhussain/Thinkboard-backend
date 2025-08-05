import express from 'express';

import { getAllNotes, createNote, editNotes, deleteNotes, getNoteById } from '../controllers/notesController.js';

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", editNotes);
router.delete("/:id", deleteNotes);

export default router;

/* Now we have to move routes to seperate files for production purpose


// This is called an EndPoint
// An endpoint is the combination of the URL and the HTTP method (like GET, POST, etc.) that lets the client interact with the server.
// This line sets up a route — a specific URL and method (in this case, GET).
// It says: "If someone sends a GET request to `/api/notes`, do this..."
// GET does not mean it needs something, it means if we receive a get request on this route, we will send a corresponding response
app.get("/api/notes", (req, res) => {

    // `req` = request object → contains details about what the client (browser or app) is asking.
    console.log(req.body);

    // `res` = response object → used to send back a reply.

    // This sends a response with:
    // HTTP status `200` (which means success)
    // Message: "Here are the notes"
    res.status(200).send("Here are the notes");
    // Lets talk about Status Codes 
    // 1xx are informational, 2xx are success, 3xx are redirection, 4xx are client errors, 5xx are server errors
});




// Now suppose user wants to create a new note
// Post is used to create something new. Here post means that if the client sends a POST request to `/api/notes`, the function will run.
app.post('/api/notes', (req, res) => {
    // We will extract the data sent by user from the request body
    // const { title, content } = req.body;

    // res.status(200).send("New Note created successfully"); // It will send an HTML response with the message "New Note created successfully"
    res.status(201).json({ message: "New Note created successfully" }); // It will send a JSON response with the message "New Note created successfully"
})



// Now the user want to update an existing note
// But most importantly you should know which post the user wants to update
// So we will use the note id to identify which note to update
app.put('/api/notes/:id', (req, res) => {
    // Extract the note id from the request parameters
    const noteId = req.params.id;
    // .params is used to access data in the url, while .body is used to access data in the request body

    // Here we would typically update the note in the database using the noteId
    // For now, we will just send a response back to the client
    res.status(200).json({ message: `Note with ID ${noteId} updated successfully` });
})




app.delete('/api/notes/:id', (req, res) => {
    // Extract the id as above
    const noteId = req.params.id;

    res.status(201).json({message: `Note with Id ${noteId} deleted successfully`})
})

*/
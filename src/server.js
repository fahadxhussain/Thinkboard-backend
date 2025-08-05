// Import the Express library, which helps us build a backend (web server)
// I have also installed npm install nodemon -D, so that I dont nor have to restart the server every time I make a change
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';

// const express = require('express'); //When the "type" is default which is "commonjs"
import notesRouter from './routes/notesRouters.js'; // Importing the notes router we created
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

// This creates an Express application.
// `app` now holds the actual server — we’ll use it to define how it should respond to requests.
const app = express();
const PORT = process.env.PORT || 5001; // Use the PORT from environment variables or default to 5001

//MIDDLEWARE
// Ths is a sample middleware function
// One of the most useful/popular middleware is the authentication middleware

/*
app.use((req, res, next) => {
    console.log(`Request Method is ${req.method} and the response will be sent to ${req.url}`)
    next(); 
    })
    */
   if(process.env.NODE_ENV !== 'production') {
       app.use(cors({
           origin: 'http://localhost:5173'
        }))
    } else {
        // More permissive CORS for debugging
        app.use(cors({
            origin: true, // Allow all origins temporarily
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
            optionsSuccessStatus: 200
        }))
    }
    
app.use(express.json())
app.use(rateLimiter)

// Add request logging for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

// Set proper headers to avoid CSP issues
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    try {
        res.status(200).json({ 
            message: 'Backend is working!', 
            timestamp: new Date().toISOString(),
            env: process.env.NODE_ENV,
            mongoUri: process.env.MONGO_URI ? 'Connected' : 'Missing'
        });
    } catch (error) {
        console.error('Health check error:', error);
        res.status(500).json({ 
            message: 'Health check failed', 
            error: error.message 
        });
    }
});

// Root endpoint - for when someone visits the backend URL directly
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'ThinkBoard Backend API',
        status: 'Running',
        endpoints: {
            health: '/api/health',
            notes: '/api/notes',
            favicon: '/favicon.ico'
        },
        note: 'This is an API server. Use the endpoints above or access via your frontend app.'
    });
});

// Handle favicon requests to prevent CSP errors
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // No content response
});

// Written after moving the routes
// Whenever someone sends a request starting with /api/notes, use notesRouter to handle it.
app.use('/api/notes', notesRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
});

// Handle 404 for unmatched routes - but NOT for catch-all
app.use('/api/*', (req, res) => {
    res.status(404).json({ message: 'API route not found' });
});

// Remove the static file serving and catch-all route for serverless
// This conflicts with API routes in serverless environment

// Remove the static file serving and catch-all route for serverless
// This conflicts with API routes in serverless environment

// Its a bit confusing as there is no method named as notesRouter in the notesRouters file


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


// Connect to database but don't start server in serverless environment
if (process.env.NODE_ENV !== 'production') {
    // Only start server locally
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening at Port: ${PORT}`)
        });
    }).catch(err => {
        console.error('Failed to connect to database:', err);
    });
} else {
    // In production (Vercel), just connect to DB
    connectDB().catch(err => {
        console.error('Failed to connect to database in production:', err);
    });
}

// Export for Vercel serverless deployment
export default app;
// This starts the server and tells it to listen for requests on port 5001.
// The function inside runs when the server starts
/*
app.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
});
*/

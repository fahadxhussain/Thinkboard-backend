# Flow and Commands of the App

## File Structure and Starting
To start the app first create the backend and front folders in a main folder.
Then write this command **npm init -y** in the backend directory on terminal to initialize a node application.
Then write **npm install express@4.18.2**.
Then I added a script for **'dev' : 'node server.js'** to run **'server.js'** file directly by writing npm run dev.
But to skip restarting the server everytime with every change I installed nodemon through **'npm install nodemon -D'** as dev dependency.
And then I changed the **'dev' : 'node server.js'** to **'dev' : 'nodemon server.js'**, so it will restart the server on its own.

## The Express
First the app have only express imported in server.js. I defined methods like get, post etc in the same server.js file to check whether the express is working or not.
Its not a good practice, so I moved the methods to another file called notesRouters.js.

## All about Routes
So, at first I created Routes/ Endpoints in the same server.js folder, and explained each and every thing there.
But with the expansion of the routes the best practice is to move routes to seperate file which is notesRouter.js.
In server.js I added another line which is **app.use('/api/notes', notesRouter)** and imported **notesRouter** from its location. Now when a request comes at **'/api/notes'**, the notesRouter will handle it. For this we must write **const notesRouter = express.Router()** in the notesRouters.js file.
But to make things more managable I created a notes controller, defined the functions of all the routes there, exported the functions, and called the functions as parameters from the **notesRouters.js**.
This way the app becomes more scalable.

## DataBase Connectivity
Then I created a project in mongoDB and Installed mongoose before connecting the Database **npm install mongoose@7.0.3**.
I created a **db.js** file and configured the db connection through **connectDB()** function where this is the line which configures the connection **await mongoose.connect(process.env.MONGO_URI)**
Then connect to the database by executing **connectDB()** function in the **server.js**


## Create A Schema
First create a schema for the app, and then a Model named as Note.
Then we would update the controller functions, as they were dummy functions before.
To extract data from **req.body** we must first write **app.use(express.json())** in the server.js but before **app.use('/api/notes', notesRouter);** line.
After completing All the controller functions we will move to the middleware

## Middleware
A middleware is a function that sits in the middle of your request and response. It runs before your actual route handler, and it can:
*Modify the request or response*
*Run some logic (e.g., authentication, logging, validation)*
*Allow the request to continue, or stop it if something is wrong*
It is like a security or processing checkpoint for requests.

## Rate Limiting
For rate llimiting, first I created a database in upstash redis.
Then installed upstash/redis through **npm i @upstash/redis@2.0.5 @upstash/redis@1.34.9**
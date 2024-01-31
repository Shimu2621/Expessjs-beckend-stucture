// import http
const http = require("http");

// import app.js file from app folder 
const app = require("./app/app");

// create a local server to receive data from
//create server with createServer method and pass whole application(app.js)
const server = http.createServer(app);

//create PORT for run whole application
const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`)
})

/// Nodemon is a replacement wrapper for node and its intall for run the terminal with any server like 8000 or 4000 PORT 
// import http
const http = require("http");

// import app from app.js
const app = require("./app/app");

// create a local server to receive data from
const server = http.createServer(app);

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`)
})
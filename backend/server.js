const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);
const dotenv = require("dotenv").config();
const cors = require("cors");
const db = require("./models");
const PORT = process.env.PORT || 3000;

const UserRoute = require("./routes/userRoutes");
const TaskRoute = require("./routes/taskRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// API PATHS
app.use("/", UserRoute);
app.use("/", TaskRoute);

db.sequelize.sync().then(() => {
  httpServer.listen(PORT, () => {
    console.log("Server Running");
  });
});

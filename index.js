const express = require("express");
const { mongoConnect } = require("./mongodb/mongodbConnection");

const moviesRouter = require("./routes/movie.routes");
const cinemasRouter = require("./routes/cinema.routes");

mongoConnect;

const PORT = 3000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/movies", moviesRouter);
server.use("/cinemas", cinemasRouter);

server.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

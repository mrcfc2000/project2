const express = require("express");

const Movie = require("../mongodb/models/movieModel");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});

router.get("/id/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("Sorry rhis movie was not found :(");
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/title/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const movieByTitle = await Movie.find({ title });

    if (movieByTitle) {
      return res.status(200).json(movieByTitle);
    } else {
      return res.status(404).json("Sorry this movie was not found :(");
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/genre/:genre", async (req, res) => {
  const { genre } = req.params;

  try {
    const movieByGenre = await Movie.find({ genre });

    if (movieByGenre) {
      return res.status(200).json(movieByGenre);
    } else {
      return res.status(404).json("Sorry this movie was not found :(");
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/year/:year", async (req, res) => {
  const { year } = req.params;

  try {
    const movieByYear = await Movie.find({ year: { $gt: year } });

    if (movieByYear) {
      return res.status(200).json(movieByYear);
    } else {
      return res
        .status(404)
        .json(`Sorry there is no movie with a year greater than ${year}`);
    }
  } catch (error) {
    return next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const newMovie = new Movie({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
    });

    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (error) {
    next(error);
  }
});

router.put("/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const movieModify = new Movie(req.body);
  movieUpdate._id = id;
  const movieUpdate = await Movie.findByIdAndUpdate(id, movieModify);
});

router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  const movieDeleteById = Movie.findByIdAndDelete(id);
  return res.status(200).json(movieDeleteById);
});

module.exports = router;

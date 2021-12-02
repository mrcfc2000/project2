const express = require("express");

const router = express.Router();

const Cinema = require("../mongodb/models/cinemaModel");

router.get("/", async (req, res, next) => {
  try {
    const cinemas = await Cinema.find().populate("movies");
    return res.status(200).json(cinemas);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const newCinema = new Cinema({
      name: req.body.name,
      location: req.body.location,
      movies: [],
    });

    const createdCinema = await newCinema.save();
    return res.status(201).json(createdCinema);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cinemaDeleted = await Cinema.findByIdAndDelete(id);
    return res.status(200).json(cinemaDeleted);
  } catch (error) {
    return next(error);
  }
});

router.put("/add-movie", async (req, res, next) => {
  try {
    const { cinemaId } = req.body;
    const { movieId } = req.body;
    const updatedCinema = await Cinema.findByIdAndUpdate(
      cinemaId,
      { $push: { movies: movieId } },
      { new: true }
    );
    return res.status(200).json(updatedCinema);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

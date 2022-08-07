const express = require("express");
const songs = express.Router();
const { 
    getAllSongs,
    getSong,
    createSong,
 } = require("../queries/songs.js");
 const {checkName, checkBoolean} = require("../validations/checkSongs")

// INDEX
songs.get("/", async (req, res) => {
    const allSongs = await getAllSongs();
    if (allSongs[0]) {
      res.status(200).json(allSongs);
    } else {
      res.status(500).json({ error: "server error" });
    }
  });

  songs.get("/:id", async (req, res) => {
    const {id} = req.params;
    const song = await getSong(id);
    if (song) {
        res.json(song);
    } else {
        res.status(404).json({ error: "not found"});
    }
  });

  songs.post("/", checkName, checkBoolean, async (req, res) => {
    try {
      const song = await createSong(req.body);
      res.json(song)
    } catch (error) {
      return error;
    }
  });
  
  module.exports = songs;
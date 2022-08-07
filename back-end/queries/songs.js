const db = require("../db/dbConfig.js");

const getAllSongs = async () => {
    try {
      const allSongs = await db.any("SELECT * FROM songs");
      return allSongs;
    } catch (error) {
      return error;
    }
  };

  const getSong = async (id) => {
    try {
      // db one takes a string of SQL command;
      // id=$1 allows us to interpolate our second parameter safely
      // we CAN pass multiple values to one query in this manner
      const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
      return oneSong;
    } catch (error) {
      return error;
    }
  };
  
  const createSong = async ({name, artist, album, time, is_favorite}) => {
  
    try {
      const newSong = await db.one(
        "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, artist, album, time, is_favorite]
      );
      return newSong;
    } catch (error) {
      return error;
    }
  };

module.exports = { getAllSongs, getSong, createSong };
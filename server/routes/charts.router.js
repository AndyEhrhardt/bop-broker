const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `WITH old_movers AS (
        SELECT song_charts.song_name AS title, concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id) AS id, song_charts.rank AS rank
        FROM song_charts
        WHERE song_charts.date = '2021-10-11'
        GROUP BY song_charts.song_name, concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id), song_charts.rank)
        SELECT concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id), song_charts.spotify_playlist_id, song_charts.spotify_song_id, song_charts.song_name, song_charts.artist, song_charts.id, song_charts.rank - old_movers.rank AS movement, song_charts.rank, song_charts.price
        FROM song_charts
        LEFT JOIN old_movers
        ON  concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id) = old_movers.id
        WHERE song_charts.date = '2021-10-12'
        GROUP BY concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id), song_charts.spotify_playlist_id, song_charts.spotify_song_id, song_charts.song_name, song_charts.artist, song_charts.id, movement, song_charts.rank, song_charts.price
        ORDER BY song_charts.id;`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log("error getting database date", error);
        });
  });




module.exports = router;
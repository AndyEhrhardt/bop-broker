const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
  
router.get('/', rejectUnauthenticated, (req, res) => {
    const dateQuery = `SELECT song_charts.date
    FROM song_charts
    ORDER BY song_charts.date DESC
    LIMIT 1`
    pool.query(dateQuery)
        .then((result) => {            
            let recentDate = new Date(result.rows[0].date.toISOString())
            let previousDate = new Date(recentDate)
            previousDate.setDate(previousDate.getDate() - 1)
            recentDate = recentDate.toISOString().split('T')[0]
            previousDate = previousDate.toISOString().split('T')[0]
        const allChartsQuery = `WITH old_movers AS (
            SELECT song_charts.song_name AS title, concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id) AS id, song_charts.rank AS rank
            FROM song_charts
            WHERE song_charts.date = $1
            GROUP BY song_charts.song_name, concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id), song_charts.rank)
            SELECT concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id), song_charts.spotify_playlist_id, song_charts.spotify_song_id, song_charts.song_name, song_charts.artist, song_charts.id, old_movers.rank - song_charts.rank AS movement, song_charts.rank, song_charts.price
            FROM song_charts
            LEFT JOIN old_movers
            ON  concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id) = old_movers.id
            WHERE song_charts.date = $2
            GROUP BY concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id), song_charts.spotify_playlist_id, song_charts.spotify_song_id, song_charts.song_name, song_charts.artist, song_charts.id, movement, song_charts.rank, song_charts.price
            ORDER BY song_charts.id;`
        pool.query(allChartsQuery, [previousDate, recentDate])
            .then((result) => {
                //console.log(result.rows)
                res.send(result.rows);
            })
        }).catch((error) => {
            console.log("error getting database date", error);
        });
  });

  router.get('/:id', rejectUnauthenticated, (req, res) => {
    let userId = req.user.id;
    let playlistAndSongId = req.params.id;
    let songId = playlistAndSongId.slice(0,22);
    let songDetails = {};
    const chartRanksQuery = `SELECT song_charts.rank, song_charts.date
    FROM song_charts
    WHERE concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id) = $1
    ORDER BY date DESC
    LIMIT 30;`
    pool.query(chartRanksQuery, [playlistAndSongId])
        .then((result) => {
            songDetails.allRanks = result.rows; 
            const songInfoQuery = `
            SELECT *
            FROM song_current
            WHERE concat(song_current.spotify_song_id, song_current.spotify_playlist_id) =  $1;`
            pool.query(songInfoQuery, [playlistAndSongId])
                .then((result) => {
                    songDetails.basicInfo = result.rows;
                    console.log(songDetails.basicInfo)
                    const chartOverlapQuery = `SELECT song_current.spotify_playlist_id, song_current.current_rank, song_current.current_price
                    FROM song_current 
                    WHERE song_current.spotify_song_id = $1;`
                    pool.query(chartOverlapQuery, [songId])
                    .then((result) => {
                        songDetails.chartOverlap = result.rows;
                        const currentHoldingsQuery = `SELECT song_current.*, song_holdings.quantity, song_holdings.id as holding_id
                        FROM song_current, song_holdings, "user"
                        WHERE song_current.id = song_holdings.song_id
                        AND song_holdings.user_id = "user".id
                        AND song_holdings.user_id = $1
                        ORDER BY holding_id DESC;`
                        pool.query(currentHoldingsQuery, [userId])
                        .then((result) => {
                            let holdings = result.rows
                            songDetails.owned = false;
                            console.log(songDetails.basicInfo[0].id)
                            for (let i of holdings){
                                if (songDetails.basicInfo[0].id === i.id){
                                    songDetails.owned = true;
                                    songDetails.quantity = i.quantity;
                                }
                            }
                            res.send(songDetails)
                        })
                    }).catch((error) => {
                        console.log("error getting chart overlap", error);
                    });
                }).catch((error) => {
                    console.log("error getting song info", error);
                });
        }).catch((error) => {
            console.log("error getting previous song ranks", error);
        });
});

module.exports = router;
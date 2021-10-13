const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {


})

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req.user.id, "then:", req.body.data.id, req.body.quantity)
  const userId = req.user.id;
  const songId = req.body.data.id;
  const quantity = req.body.quantity;
  let dateQuery = `SELECT song_charts.date
  FROM song_charts
  ORDER BY song_charts.date DESC
  LIMIT 1;`
  pool.query(dateQuery)
    .then((result) => {
      const currentDate = result.rows[0].date.toISOString().split('T')[0];
      console.log(currentDate)
      const holdingInsertQuery = `INSERT INTO "song_holdings"("user_id","quantity","date_purchased","song_id")
          VALUES 	($1, $2, $3, $4)
          RETURNING id;`
      pool.query(holdingInsertQuery, [userId, quantity, currentDate, songId])
        .then((result) => {
          const songHoldingId = result.rows[0].id;
          const historicalHoldingInsertQuery = `INSERT INTO "historical_song_holdings"("holding_id", "date", "value", "rank")
            SELECT $1, $2, song_current.current_price * song_holdings.quantity, song_current.current_rank
            FROM song_holdings, song_current
            WHERE song_holdings.song_id = song_current.id
            AND song_holdings.song_id = $3
            AND song_holdings.user_id = $4
            AND song_holdings.id = $1
            RETURNING "value";`
          pool.query(historicalHoldingInsertQuery, [songHoldingId, currentDate, songId, userId])
            .then((result) => {
              const cost = result.rows[0].value;
              const updateBuyingPowerQuery = `UPDATE "user"
              SET buying_power = buying_power - $1
              WHERE "user".id = $2;`
              pool.query(updateBuyingPowerQuery, [cost, userId])
                .then((result) => {
                  res.sendStatus(200);
                }).catch((error) => {
                  console.log("error updating buying power", error)
                })
            }).catch((error) => {
              console.log("error posting to historical song holdings", error)
            })
        }).catch((error) => {
          console.log("error posting to song holdings", error)
        })
    }).catch((error) => {
      console.log("error getting date", error)
    })
})

module.exports = router;
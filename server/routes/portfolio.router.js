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
  console.log(req.user.id, "then:",req.body.data.id, req.body.quantity)
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
            
          })
        }).catch((error) => {
          console.log("error posting buy", error)
        })
    console.log(req.body.data)
    console.log(req.body.quantity)
})


module.exports = router;
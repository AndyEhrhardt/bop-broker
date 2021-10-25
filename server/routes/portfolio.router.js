const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');



/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log("in get portfolio router")
    const userId = req.user.id;
    let portfolio = {};
    const currentHoldingsQuery = `SELECT song_current.*, song_holdings.quantity, song_holdings.id as holding_id
    FROM song_current, song_holdings, "user"
    WHERE song_current.id = song_holdings.song_id
    AND song_holdings.user_id = "user".id
    AND song_holdings.user_id = $1
    ORDER BY holding_id DESC;`
    pool.query(currentHoldingsQuery, [userId])
      .then((result) => {
        portfolio.currentHoldings = result.rows;
        const buyingpowerTotalQuery = `SELECT "user".buying_power, "user".total_cash, "user".daily_dividend
        FROM "user"
        WHERE "user".id = $1;`
        pool.query(buyingpowerTotalQuery, [userId])
        .then((result) =>{
          portfolio.currentMoney = result.rows[0];
          const historicalPortfolioQuery = `SELECT historical_portfolio.*
          FROM historical_portfolio, "user" 
          WHERE historical_portfolio.user_id = "user".id
          AND historical_portfolio.user_id = $1
          ORDER BY date DESC;`
          pool.query(historicalPortfolioQuery, [userId])
          .then((result) => {
            portfolio.historicalTotal = result.rows
            if (result.rows.length > 1) {
              if (portfolio.historicalTotal[0].value - portfolio.historicalTotal[1].value > 0){ //picks css color depending on loss/gain/break even
                portfolio.gains = "#2bd600"
              } else if (portfolio.historicalTotal[0].value - portfolio.historicalTotal[1].value < 0){
                portfolio.gains = "#f71500"
              } else {
                portfolio.gains = "#e6bb00"
              }
            } else {
              portfolio.gains = "#e6bb00"
              portfolio.historicalTotal.push({value: 10000, date: "new"})
            }
            const historicalSongValueQuery = `SELECT historical_song_holdings.*
            FROM historical_song_holdings, song_holdings, "user"
            WHERE historical_song_holdings.holding_id = song_holdings.id
            AND song_holdings.user_id = "user".id
            AND song_holdings.user_id = $1
            ORDER BY date DESC;`
            pool.query(historicalSongValueQuery, [userId])
            .then((result) => {
              let songValHist = result.rows;
              portfolio.historicalSongValue = {}
              for (let i = 0; i< portfolio.currentHoldings.length ; i++){
                portfolio.historicalSongValue[portfolio.currentHoldings[i].holding_id] = []
              }
              for (let i = 0; i < songValHist.length ; i++){
                portfolio.historicalSongValue[songValHist[i].holding_id].push({value: songValHist[i].value, 
                  rank: songValHist[i].rank, date: songValHist[i].date, idFromHoldingTable: songValHist[i].holding_id})
              }
              console.log("portfolio assembled")
              res.send(portfolio)
            }).catch((error) => {
              console.log("error getting historical song holdings",error)
          })
        }).catch((error) => {
            console.log("error getting historical total portfolio value",error)
        })
      }).catch((error) => {
          console.log("error getting current total cash, buying power and dividend",error)
      })
    }).catch((error) => {
        console.log("error getting current holdings",error)
  })
})

router.post('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const songId = req.body.data;
  const quantity = req.body.quantity;
  console.log(userId, songId, quantity)
  const dateQuery = `SELECT song_charts.date
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

router.delete('/', rejectUnauthenticated, (req, res) => {
  const songId = req.body.holding_id;
  const userId = req.user.id;
  const totalAssetValue = req.body.quantity * req.body.current_price
  console.log(userId)
  const sellQuery = `DELETE FROM song_holdings 
  WHERE id = $1
  AND user_id = $2;`
  pool.query(sellQuery, [songId, userId])
    .then((result) => {
      const buyingPowerUpdateQuery = `UPDATE "user"
      SET buying_power = buying_power + $1
      WHERE "user".id = $2;`
      pool.query(buyingPowerUpdateQuery, [totalAssetValue, userId])
        .then((result) => {
          const deleteHistoricalHolding = `DELETE FROM historical_song_holdings
          WHERE holding_id= $1;`
          pool.query(deleteHistoricalHolding, [songId])
          }).then((result) => {
            res.sendStatus(200)
          }).catch((error) => {
            console.log("error deleting Historical", error)
          })

    }).catch((error) => {
      console.log("error updating buying power", error)
    })
})

router.put('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body)
  const userId = req.user.id;
  const holding_id = req.body.data.holding_id;
  const dollarAmount = req.body.data.sharePrice * req.body.data.numberOfShares;
  const numberOfShares = parseInt(req.body.data.numberOfShares);
  const sellState = req.body.data.sellState;
  let quantityOperator = '';
  let buyingPowerOperator=  '';
  console.log(holding_id, dollarAmount, numberOfShares, sellState);
  if (sellState){
    quantityOperator = '-';
  } else {
    quantityOperator = '+';
  }
  if (sellState){
    buyingPowerOperator = '+';
  } else {
    buyingPowerOperator = '-';
  }
  const adjustQuantityQuery = `UPDATE song_holdings
  SET quantity = quantity ${quantityOperator} $1
  WHERE id = $2
  AND user_id = $3;`
  pool.query(adjustQuantityQuery, [numberOfShares, holding_id, userId])
    .then((result) => {
      const adjustBuyingPowerQuery = `UPDATE "user"
      SET buying_power = buying_power ${buyingPowerOperator} $1
      WHERE "user".id = $2;`
      pool.query(adjustBuyingPowerQuery, [dollarAmount, userId])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
          console.log("error updating buying power", error)
        })
    }).catch((error) => {
      console.log("error updating share quantity", error)
    })

})




module.exports = router;
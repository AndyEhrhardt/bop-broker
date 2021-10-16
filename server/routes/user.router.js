const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool.query(queryText, [username, password])
    .then((result) => {
      const userId = result.rows[0].id;
      const dateQuery = `SELECT song_charts.date
      FROM song_charts
      ORDER BY song_charts.date DESC
      LIMIT 1`
      pool.query(dateQuery)
        .then((result) => {
          console.log(result.rows)
          console.log(result.rows[0].date.toISOString().split('T')[0])
          const date = result.rows[0].date.toISOString().split('T')[0];
          const firstHistoricalEntry = `INSERT INTO "historical_portfolio"("user_id", "value", "date")
          VALUES ($1, 10000, $2);`
          pool.query(firstHistoricalEntry, [userId, date])
          .then((result) => {
            console.log(result)
            res.sendStatus(201)
          }).catch((error) => {
            console.log('historical insert failed ', error);
            res.sendStatus(500);
          });
        }).catch((error) => {
          console.log('get date failed ', error)
        })
    }).catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;

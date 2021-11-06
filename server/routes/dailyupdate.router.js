const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const cron = require('node-cron');


//*VARIABLES
//used to stop the node chron once new playlist has been received
let = false;
//data that will be added to database after all checks are passed
let playlistsToPost = [];
//counter for looping through allPlaylistIds
let counter = 0;
//date incoming songs were added to playlist according to spotify, in utc
let incomingDate = '';
//date of most recent database entry 
let databaseDate = '';
//date to use in queries
let dateForQueries = ''
//variable to hold the each playlist incoming from spotify
let incomingPlaylist = [];
//spotify ids for 20 different top 50 daily playlists
const allPlaylistIds = [
    "37i9dQZEVXbMDoHDwVN2tF",
    "37i9dQZEVXbLRQDuF5jeBp",
    "37i9dQZEVXbMXbN3EUUhlg",
    "37i9dQZEVXbKXQ4mDTEBXq",
    "37i9dQZEVXbNFJfN1Vw8d9",
    "37i9dQZEVXbObFQZ3JLcXt",
    "37i9dQZEVXbMMy2roB9myp",
    "37i9dQZEVXbO3qyFxbkOE1",
    "37i9dQZEVXbKCF6dqVpDkS",
    "37i9dQZEVXbJiZcmkrIHGU",
    "37i9dQZEVXbIQnj7RRhdSX",
    "37i9dQZEVXbNOUPGj7tW6T",
    "37i9dQZEVXbL0GavIqMTeb",
    "37i9dQZEVXbNBz9cRCSFkY",
    "37i9dQZEVXbIVYVBNw9D5K",
    "37i9dQZEVXbLoATJ81JYXz",
    "37i9dQZEVXbOa2lmxNORXQ",
    "37i9dQZEVXbJvfa0Yxg7E7",
    "37i9dQZEVXbIPWwFssbupI",
    "37i9dQZEVXbJPcfkRz0wJ0",
]
//variable used to determine the price of a song based on rank
let priceObject = {
    '1': 2500,
    '2': 1250,
    '3': 833,
    '4': 625,
    '5': 500,
    '6': 416,
    '7': 357,
    '8': 312,
    '9': 277,
    '10': 250,
    '11': 227,
    '12': 208,
    '13': 192,
    '14': 178,
    '15': 166,
    '16': 156,
    '17': 147,
    '18': 138,
    '19': 131,
    '20': 125,
    '21': 119,
    '22': 113,
    '23': 108,
    '24': 104,
    '25': 100,
    '26': 96,
    '27': 92,
    '28': 89,
    '29': 86,
    '30': 83,
    '31': 80,
    '32': 77,
    '33': 75,
    '34': 73,
    '35': 71,
    '36': 69,
    '37': 67,
    '38': 65,
    '39': 63,
    '40': 61,
    '41': 59,
    '42': 58,
    '43': 57,
    '44': 56,
    '45': 55,
    '46': 54,
    '47': 53,
    '48': 52,
    '49': 51,
    '50': 50
}
//auth token provided by spotify 
let authToken = ''
//post configuration for obtaining auth token from spotify api 
const postConfig = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token?grant_type=client_credentials',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': process.env.SPOTIFY_AUTH,
        'Cookie': '__Host-device_id=AQAKvHmZonqQLbF2Y31dkHdWtJdyazjTz9m_ESxh_X95IJzqMilSX5ISqE6udpstqDwsFTxVbMO-hBpjl_6A9BjgKY7ZZoH_FGc; sp_tr=false'
    }
};

//*FUNCTIONS
//all functions appear in the order they are called 
//Gets the date the most recent playlist was added to the database
const getDatabaseDate = () => {
    const queryText = `SELECT song_charts.date
    FROM song_charts
    ORDER BY song_charts.date DESC
    LIMIT 1`
    pool.query(queryText)
        .then((result) => {
            databaseDate = Date.parse(result.rows[0].date); //sets the database date 
            obtainAuth(); //calls function to get authorization token from spotify
        }).catch((error) => {
            console.log("error getting database date", error);
        });
}
//calls first function to start the loop of functions 
//!FIRST FUNCTION
//*FIRST FUNCTION
//getDatabaseDate();

//checks for new data from spotify every hour
cron.schedule('0 * * * *', () => {
    console.log("starting functions");
    getDatabaseDate();
});



//starts the process of getting the new data from spotify every day at 10:30AM UTC
// cron.schedule('00 02 * * *', () => {
//     console.log("starting functions");
//     getDatabaseDate();
// });
//gets the auth token from spotify 
const obtainAuth = () => {
    axios(postConfig)
        .then(response => {
            authToken = response.data.access_token
            getPlaylists();
        })
        .catch(error => {
            console.log(error);
        });
}
//calling obtain auth to obtain the auth and start the loop of functions 
//obtainAuth();
//called once auth token is obtained, and then 20 more times after after each playlist is posted
const getPlaylists = () => {
    if (counter < 20) {
        const getConfig = {
            method: 'get',
            url: `https://api.spotify.com/v1/playlists/${allPlaylistIds[counter]}/tracks`,
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };
        axios(getConfig)
            .then(response => {
                incomingDate = Date.parse(response.data.items[0].added_at.split('T')[0]);
                incomingPlaylist = response.data.items;
                checkDate();
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        counter = 0; //after all 20 playlists are obtained, counter is reset
        return postPlaylistToDatabase(playlistsToPost);
    }
}
//checks that the incoming playlist is newer than the playlist in the database
const checkDate = () => {
    if (databaseDate < incomingDate) { //if database date is older than incoming date, trim the data and continue
        trimData();
    } else {
        counter = 0;
        console.log("spotify playlist not yet updated");
        playlistsToPost.length = 0;
        setTimeout(() => {
            getDatabaseDate(); //if the database date is not older than the incoming date, keep checking every five minutes
        }, 300000);
    }
}
const trimData = () => {
    console.log("in trim data");
    dateForQueries = incomingPlaylist[0].added_at.split('T')[0]
    incomingPlaylist.map((track, index) => { //takes out the values needed for the song_charts table from the raw spotify playlist data
        let newTrack = {};
        newTrack.name = track.track.name;
        newTrack.artist = track.track.artists[0].name;
        newTrack.rank = index + 1;
        newTrack.price = priceObject[index + 1];
        newTrack.spotify_song_id = track.track.id;
        newTrack.spotify_playlist_id = allPlaylistIds[counter];
        newTrack.date = track.added_at.split('T')[0]; //gets just the date from the datetime provided by spotify
        playlistsToPost.push(newTrack);
    });
    counter++; //global counter variable is iterated
    return getPlaylists(); //get playlists is called to get the next index in the playlist array 
}
//called once all playlist data has been checked and is ready to be posted
const postPlaylistToDatabase = (playlist) => {
    console.log(`incoming playlist`);
    let queryText = `INSERT INTO "song_charts" ("rank", "song_name", "artist", "spotify_song_id", "spotify_playlist_id", "date", "price")
        VALUES`
    let valueArray = [];
    for (let track of playlist) { //assembles the array of values out the playlist that was just cleaned
        valueArray.push(track.rank, track.name, track.artist, track.spotify_song_id, track.spotify_playlist_id, track.date, track.price)
    }
    console.log(valueArray);
    for (let i = 0; i < playlist.length * 7; i += 7) { //there are 7 values in each row, hence length*7 and i+=7
        queryText += `($${i+1}, $${i+2}, $${i+3}, $${i+4}, $${i+5}, $${i+6}, $${i+7}),` //this string is looped over and is used to sanitize the data, 
        } //the i+x is the index plus whatever amount the variable is needing to be past that index. Since 7 columns are receiving entries this goes up to 7
    queryText = queryText.slice(0, queryText.length - 1) //removes the last comma from the end of the string
    console.log("query text generated")
    pool.query(queryText, valueArray)
        .then(result => {
            console.log("new playlists added to song_charts")
            updateOtherTables();
        })
        .catch(error => {
            console.log(`Error adding new playlist info to song_charts`, error);
        });
}
//Runs a series of sql queries to update relevant collumns/rows in tables: user, song_current, historical_portfolio, hostorical_song_hodlings
const updateOtherTables = () => {
    console.log(dateForQueries)
    let newRankPriceQuery = `UPDATE song_current
    SET current_rank = song_charts.rank, current_price = song_charts.price
    FROM song_charts
    WHERE song_current.spotify_song_id = song_charts.spotify_song_id
    AND song_current.spotify_playlist_id = song_charts.spotify_playlist_id
    AND song_charts.date = $1;`
    pool.query(newRankPriceQuery, [dateForQueries])
        .then(result => {
            let fellOffChartQuery = `UPDATE song_current
            SET current_rank = 51, current_price = 49
            WHERE concat(song_current.spotify_song_id, song_current.spotify_playlist_id) NOT IN 
            (SELECT concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id)
            FROM song_charts
            WHERE song_charts.date = $1);`
            pool.query(fellOffChartQuery, [dateForQueries])
                .then(result => {
                    let addNewToChartQuery = `INSERT INTO "song_current"("current_rank","song_name","artist","spotify_playlist_id","spotify_song_id", "current_price")
                    SELECT song_charts.rank, song_charts.song_name, song_charts.artist, song_charts.spotify_playlist_id, song_charts.spotify_song_id, song_charts.price
                    FROM song_charts
                    WHERE song_charts.date = $1
                    AND concat(song_charts.spotify_song_id, song_charts.spotify_playlist_id) NOT IN 
                    (SELECT concat(song_current.spotify_song_id, song_current.spotify_playlist_id)
                    FROM song_current);`
                    pool.query(addNewToChartQuery, [dateForQueries])
                        .then(result => {
                            let updateUserCashQuery = `WITH new_total AS (
                            SELECT "user".id AS id, sum(song_current.current_price*song_holdings.quantity) + "user".buying_power AS incoming
                            FROM song_holdings, song_current, "user"
                            WHERE song_holdings.user_id = "user".id
                            AND song_current.id = song_holdings.song_id
                            GROUP BY "user".id )
                            UPDATE "user"
                            SET total_cash = new_total.incoming
                            FROM new_total
                            WHERE "user".id = new_total.id;`
                            pool.query(updateUserCashQuery)
                                .then(result => {
                                    let updateDividendToZero = `UPDATE "user" 
                                    SET daily_dividend = 0;`
                                    pool.query(updateDividendToZero)
                                        .then(result => {
                                            let updateDividendIfNumberOne = `WITH new_dividend AS (
                                            SELECT "user".id AS id, sum(150*song_holdings.quantity) AS new_dividend_return, 
                                            sum(150*song_holdings.quantity) + "user".buying_power AS new_buying_power, 
                                            sum(150*song_holdings.quantity)+"user".total_cash AS new_total_cash
                                            FROM song_holdings, song_current, "user"
                                            WHERE song_holdings.user_id = "user".id
                                            AND song_current.id = song_holdings.song_id
                                            AND song_current.current_rank = 1
                                            GROUP BY "user".id )
                                            UPDATE "user"
                                            SET total_cash = new_dividend.new_total_cash, buying_power = new_dividend.new_buying_power, daily_dividend = new_dividend.new_dividend_return
                                            FROM new_dividend
                                            WHERE "user".id = new_dividend.id;`
                                            pool.query(updateDividendIfNumberOne)
                                                .then(result => {
                                                    let addHistoricalSongHoldingQuery = `INSERT INTO "historical_song_holdings"("holding_id","date","value","rank")
                                                    SELECT song_holdings.id, $1, song_current.current_price * song_holdings.quantity, song_current.current_rank
                                                    FROM song_holdings, song_current
                                                    WHERE song_holdings.song_id = song_current.id;`
                                                    pool.query(addHistoricalSongHoldingQuery, [dateForQueries])
                                                        .then(result => {
                                                            let addHistoricalPortfolioQuery = `INSERT INTO "historical_portfolio"("user_id", "value", "date")
                                                            SELECT "user".id, "user".total_cash, $1
                                                            FROM "user";`
                                                            pool.query(addHistoricalPortfolioQuery, [dateForQueries])
                                                                .then(result => {
                                                                    console.log("it is done");
                                                                }).catch(error => console.log("error with eighth query", error))
                                                        }).catch(error => console.log("error with seventh query", error))
                                                }).catch(error => console.log("error with sixth query", error))
                                        }).catch(error => console.log("error with fifth query", error))
                                }).catch(error => console.log("error with fourth query", error))
                        }).catch(error => console.log("error with third query", error))
                }).catch(error => console.log("error with second query", error))
        }).catch(error => console.log("error with first query", error))
}

module.exports = router;

// How the priceObject was calculated
// const priceCalculator = () => {
//     for (let i = 1; i < 51; i++){
//         console.log((51/i)*50)
//     }
// }
// priceCalculator()
## DESCRIPTION
BopBroker is a web app that allows users to buy and sell "shares" of songs using fake money. Share price is determined by the songs position on a daily top 50 chart and chart information is obtained once a day from Spotify API.

## SETUP
clone this repository
npm install
set up a databse in postico called 'song-trader'
paste in the the data in the database.sql file (2 days of sample data included)
npm run server 
npm run client

## TODO
- [x] create server route for daily update
- [x] paste in relevant code 
- [x] get it working
- [x] set up charts router 
- [x] set up basic get router
- [x] set up saga for getting charts
- [x] set up redux for storing charts
- [x] view charts in browser console log 
- [x] set up component for viewing a chart 
- [x] diplay chart on dom 
- [x] Some sort of on hover effect for table rows
- [x] clicking a row leads to song details page
- [x] get request to get songs historical info and which playlists its on
- [x] redux store to store the song details
- [x] display that information on the dom 
- [x] Buy button 
- [x] post saga to post buy in user's portfolio
- [x] start fresh
- [x] get route for users historical portfolio, historical song holdings and current monies 
- [x] route to portfolio page
- [x] basic portfolio quick display, just get stuff on the dom
- [x] sell all shares saga and sell router (delete)
- [x] write sql, fill out router
- [x] sell router
- [x] buy/sell popup 
- [x] partial sell/buy more saga and router (put)
- [x] write sql, fill out router
- [x] conditional buying/selling limited by number of shares and buying power
- [x] create new page to view all regional charts 
- [x] .map over quick chart to display charts on dom
- [x] create portfolio page
- [x] open portfolio page by clicking quick portfolio 
- [x] chart.js for historical portfolio value
- [x] table for portfolio 
- [x] finish overview information
- [x] get paper shadow (15 min)
- [x] no border(15 min)
- [x] song details modal 
- [x] chart.js for historical song value 
- [x] incorporate buy/sell modal component into song deatils page 
- [x] create header
- [x] styled sign out 
- [x] conditional buy based on user's buying power 
- [x] fix bug where user's can change to buy mode after entering in sell amount and buy button still renders 
- [x] horizontal portfolio in top right 
- [x] create logo


- [] table containing all other charts the song appears on, on song details
- [] listen button on song details


- [] two options for views in the porfolio page (split current view into two views to make the page more horizontal)
- [] allow user to view song details from either quick portfolio or the portfolio page 
- [] ^clicking trade button will not trigger song details 




- [] set up async await in server code 
- [] clean up table, create functions to use for the conditionals relating to color and +/-








- [] datagrid in portfolio page
- [] better buttons 



- [] clicking a chart leads to chart details modal
- [] get saga for chart details
- [] set up get router for chart details 
- [] reducer for chart details 

- [] specialty chart folder/ file(s)
- [] build out a specialty chart table 
- [] get saga for chart 
- [] server side code for chart 
- [] create specialty chart redux store
- [] clicking on song leads to song details
- [] clicking on buy/sell button will open modal 





- [] custom buttons 
- [] apply fade in fade out on all quick components


- [] change log in page styling 





- [] write and create an about page 
- [] complete readme

- [] change login page 
- [] change register page







## TODO
[x] - create server route for daily update
[x] - paste in relevant code 
[x] - get it working
[x] - set up charts router 
[x] - set up basic get router
[x] - set up saga for getting charts
[x] - set up redux for storing charts
[x] - view charts in browser console log 
[x] - set up component for viewing a chart 
[x] - diplay chart on dom 
[x] - Some sort of on hover effect for table rows
[x] - clicking a row leads to song details page
[x] - get request to get songs historical info and which playlists its on
[x] - redux store to store the song details
[x] - display that information on the dom 
[x] - Buy button 
[x] - post saga to post buy in user's portfolio
[x] - start fresh
[x] - get route for users historical portfolio, historical song holdings and current monies 
[x] - route to portfolio page
[x] - basic portfolio quick display, just get stuff on the dom
[x] - sell all shares saga and sell router (delete)
[x] - write sql, fill out router
[x] - sell router
[x] - buy/sell popup 
[x] - partial sell/buy more saga and router (put)
[x] - write sql, fill out router
[x] - conditional buying/selling limited by number of shares and buying power
[x] - create new page to view all regional charts 
[x] - .map over quick chart to display charts on dom
[x] - create portfolio page
[x] - open portfolio page by clicking quick portfolio 
[x] - chart.js for historical portfolio value
[x] - table for portfolio 
[x] - finish overview information
[x] - get paper shadow (15 min)
[x] - no border(15 min)



[] - two options for views in the porfolio page (split current view into two views to make the page more horizontal)
[] - allow user to view song details from either quick portfolio or the portfolio page 
[] - ^clicking trade button will not trigger song details 



[] - horizontal portfolio in top right 
[] - create logo
[] - create header
[] - styled sign out 




[x] - song details modal 
[x] - chart.js for historical song value 
[x] - incorporate buy/sell modal component into song deatils page 
[] - conditional buy based on user's buying power 
[] - table containing all other charts the song appears on 





[] - datagrid in portfolio page
[] - better buttons 



[] - clicking a chart leads to chart details modal
[] - get saga for chart details
[] - set up get router for chart details 
[] - reducer for chart details 

[] - specialty chart folder/ file(s)
[] - build out a specialty chart table 
[] - get saga for chart 
[] - server side code for chart 
[] - create specialty chart redux store
[] - clicking on song leads to song details
[] - clicking on buy/sell button will open modal 





[] - custom buttons 
[] - apply fade in fade out on all quick components


[] - change log in page styling 





[] - write and create an about page 
[] - complete readme

[] - change login page 
[] - change register page

## Setup Instructions

- Run `npm install`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2

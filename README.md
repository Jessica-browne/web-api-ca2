# Assignment 2 - Web API.

Name: Jessica Browne
student number : 20101992

youtube video link : https://youtu.be/WLwDb-zr2lU
## Features.

 + added favourites to the user schema so each user has a list of favouries (dosnt show in favourites page just the db) 
 + added watchlist to the user schema so each user has a watchlist (dosnt show in watchlist page just the db) 
 + added password requirements to the sign up page
 

## Setup requirements.

npm run dev in movies api and npm start in  react movies

## API Configuration

make an env file for both folders and put the below into it 
______________________
FOR movies api env
NODE_ENV=development
PORT=8080
HOST= localhost
MONGO_DB= YourMongoURL
TMDB_KEY= YourTMDBKEY
SECRET=YourJWTSecret

FOR react movies env
REACT_APP_TMDB_KEY=YourTMDBKEY
FAST_REFRESH=false

## API Design 

- /api/users | GET | Gets a list of users 
- /api/movies/favurites | PUT | body : username, movieid, add movie to users favourites
- /api/movies/watchlist | PUT | body : username, movieid, add movie to users watchlist
- /api/users | post | body: "username, password" register a users
- /api/users?action=register | post | register a users
- /api/users/${username} get a users favoures (dosnt work)


## Security and Authentication

all routes are protected except the login and sign up page

## Integrating with React App
the entire app is held behind needing an account which can be logged into or created on the landing pahe and can be signed out of at anytime from the menu bar
when the add to favourites or add to watchlists button is pressed it adds it to the data base but dosnt show up in the favourets page cause i couldent figure it out. i believe it has to do with all the misspeelings of favourites i have. so far ive found 8/9 total 

## Independent learning (if relevant)

had to find out how to add to an array in the db without overwriting all the info so with "$push" instead of addtoset. 
had to find how to force a data type to be an int, found "parseInt" and used it when adding movie ids to the array cause everything wanted to be a string 


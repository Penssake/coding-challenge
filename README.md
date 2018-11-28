# coding-challenge
An application that displays the avatars of public GitHub repository owners.

## Frontend - to run
- npm install -g parcel-bundler
- npm i
- npm start

## Backend .env
- PORT=3000
- CORS_ORIGIN='http://localhost:1234' (unless parcel assigns another port number)
- URL='https://api.github.com/users?since=999&per_page=32'

## Backend - to run
- npm start

### Works Cited 

- https://developer.github.com/
- https://github.com/parcel-bundler/parcel
- https://getbootstrap.com/
- https://momentjs.com/docs/#/manipulating/

### Used for testing locally
- https://httpie.org/doc
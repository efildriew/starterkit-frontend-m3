# README Modulo3

# Share Journey (provisional name)

## Description

App that allows you to share a cab/uber/cabify to a destination with people around you. I will also allow to know shared interests between people inside, so you can have small talk on your journey.

## User Stories

**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup

**Sign up** - As a user I want to sign up on the webpage so that I can share my journey with others

**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Journey list** - As a user I want to see all the journeys available so that I can choose which one I want to join

**Journey create** - As a user I want to create a journey so that I can invite others to join

**Journey detail** - As a user I want to see the journey details and attendee list of one journey so that I can decide if I want to join

**Attend event** - As a user I want to be able to join a journey to share the bill with others going the same way

**User profile** - As a user I want to be able to edit my profile with picture and interests

**Map** - As a user I want to be able to see a map wich will able me to click on the destination I want to go

## Backlog

List of other features outside of the MVPs scop:

Payment options: be able to set up Paypal/credit card account for my part of the journey to be charged

Homepage: Besides basic information, Home Page will be completed with marketing/commercial information about the App

PROBABLY NOT POSSIBLE: Connect to Free/Cabify/Uber: Once the journey is set, the app will connect to Free/Cabify/Uber to request the cab. The app should know the users and how much to charge to each of them

## Routes

Frontend:

'/' : Home page where info, Login, and Password lives

'/login': login page

'/signup': signup page

'/logout': logout page, where user will be asked if he's sure to leave

'/main': map page where user can choose destination

'/journeys': journeys list, where user will be able to see journeys around him

'/journey/:id': edit a journey

Backend:

POST '/login': login

POST '/signup': signup

GET '/logout': deletes auth

GET/POST '/:id/profile': profile page when user can see/edit their profile

GET/POST '/api/journeys': journeys list, where user will be able to see journeys around him on the map

GET '/journey/:id': a single journey detail, whic could be updated

## Models

User model

    {
    	username: String
    	password: String
        name: String
        avatar: Picture/url
        interests: Array
        favourite places: Array
    }

Journey model

    {
    	owner: ObjectId<User>
    	startLocation: Point
            Coordinates: Array
    	endLocation: Point
            Coordinates: Array
    	name: String
    	time: String
    	users: Array
    }

## Links

### Git

https://github.com/efildriew/starterkit-frontend-m3

https://github.com/efildriew/starterkit-backend-m3

### Deploy

https://trusting-swirles-8b5b7f.netlify.com/

https://share-cab.herokuapp.com/

### Slides

https://slides.com/marcvalles/sharecab

## Instructions of use

Once pressed the start button, you will be redirect to Login. You can Login with:

user: ironhack
password: Ironhack2019 (notice the I uppercase)

You can create a user pressing on the sign button. Password must contain a minimum of six letters, wich should be minimum an uppercase, a lowercase and a number.

On the main page, you will see the map. The app will geolocate automatically, so you need to allow geoloc on the browser (there are default coordinates setted up in case geoloc doesn't work).

There's a search bar wich allow you to set a location to start a Journey. After setting one up, you will be required to select a destination, using the same search bar. After destination is setted, a timer will appear so you can set the time at which the journey will depart. Once it's complete, 

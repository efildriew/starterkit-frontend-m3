# README Modulo3

# Share Journey (provisional name)

## Description

App that allows you to share a cab/uber/cabify to a destination with people around you. I will also allow to know shared interests between people inside, so you can have small talk on your journey.

## User Stories

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

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

List of other features outside of the MVPs scope

Payment options: be able to set up Paypal/credit card account for my part of the journey to be charged

Homepage: Besides basic information, Home Page will be completed with marketing/commercial information about the App

PROBABLY NOT POSSIBLE: Connect to Free/Cabify/Uber: Once the journey is set, the app will connect to Free/Cabify/Uber to request the cab. The app should know the users and how much to charge to each of them

## Routes

Frontend:

'/' : Home page where info, Login, and Password lives

'/login': login page

'/signup': signup page

'/logout': logout page, where user will be asked if he's sure to leave

'/:id/profile': profile page when user can see/edit their profile

'/main': map page where user can choose destination

'/journeys': journeys list, where user will be able to see journeys around him

'/journey/detail': a single journey detail

Backend:

POST '/api/login': login

POST '/api/signup': signup

GET '/api/logout': deletes auth

GET/POST '/api/:id/profile': profile page when user can see/edit their profile

GET '/api/main': show journeys available on map

GET/POST '/api/journeys': journeys list, where user will be able to see journeys around him

GET '/api/journey/detail': a single journey detail

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
    	name: String
    	destination: Coordinates
    	date: Date
    	location: Coordinates
    	users: ObjectId<User>
    }

## Links

### Git

The url to your repository and to your deployed project

[Repository Frontend Link](http://github.com/)

[Repository Backend Link](http://github.com/)

[Deploy Link](http://heroku.com/)

### Slides

[Slides Link](http://slides.com/)

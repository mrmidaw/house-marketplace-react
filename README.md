# House Marketplace

Find and list houses for sale or for rent. 

## Used Technologies:

- JavaScript
- React, React-router-dom
- React Router v6 (useLocation, useNavigate)
- Firebase
- React Toastify
- React Spinners
- React Icons

## Requirements

First, you should install dependencies using 
### npm install

## Geolocation

The listings use Google geocoding to get the coords from the address field. You need to either rename .env.example to .env and add your Google Geocode API key OR in the CreateListing.jsx file you can set geolocationEnabled to "false" and it will add a lat/lng field to the form.

## Firebase

You should create firebase.config.js file in src folder with recommended parameters (rules.txt)

## Firestore rules

You need replace firestore and storage rules in firebase settings (rules.txt)

## Collection rules

You need initialize firestore database collection with certain fields (rules.txt) 

## Indexes

In firestore database - indexes - composite you need initialize three collections:

id - listings(example)
type - Ascending
timestamp - Descending
query scopes - Collection 

id - listings(example)
userRef - Ascending
timestamp - Descending
query scopes - Collection 

id - listings(example)
offer - Ascending
timestamp - Descending
query scopes - Collection 
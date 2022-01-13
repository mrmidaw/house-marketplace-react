# House Marketplace

Find and list houses for sale or for rent. 

## Used Technologies:

- JavaScript
- React, React-router-dom
- React Hooks
- React Router v6 (useLocation, useNavigate)
- Firebase
- React Toastify
- React Spinners
- React Icons

## Requirements

First, you should install dependencies using 
### npm install

## Geolocation

The project use google geolocation. By default, it is off and manual input of latitude and longitude is used. To enable address auto detection, you need to:
- insert Google Geocode API key in the ENV file
- in the CreateListing.jsx file.line 9 => change 'false' to 'true'
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
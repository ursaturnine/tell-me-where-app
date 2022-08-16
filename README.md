# tell-me-where-app

This app was created as a Capstone project for Ada Developers Academy by Tyrah Gullette and Liliana Parra (@lili4x4 on GitHub). 
Tell Me Where is a mobile app for creating and finding restaurant recommendations to/from friends.

## Feature Set

### Add and Remove Friends
Follow and unfollow friends by searching for their username

### Search for Recommendations
Search by city name to get a list of all of your friends' restaurant recommendations in that city. Tell Me Where uses the Yelp Fusion API to
display the restaurant name, a header image, the pricing, one to three description categories, and a link to the full restaurant page on Yelp.

### Add Recommendations
Submit the city and name of a restaurant to add it to your recommendations. It will become instantly visible to your friends.

## Dependencies
Tell Me Where uses React Native and Expo. It also relies on the Yelp Fusion API and a backend server and API, viewable on [GitHub here](https://github.com/lili4x4/tell-me-where-backend).

## Set-Up

1. Clone this repository
2. Install the Expo CLI by running `npm install -g expo-cli`
3. Run `npm install` to install dependencies
4. Download the Expo Client mobile app to test on your phone
5. Start server by running `expo start` in terminal and scan QR code to test on mobile phone

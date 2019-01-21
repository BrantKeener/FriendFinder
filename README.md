
# FRND-FNDR

*10 questions until you find your next friend!*

**FRND-FNDR** allows users to answer 10 simple personality/interest related questions, and then searches the server to find a compatible friend.
The friend is displayed in a modal with the following information:
1. Name
2. Picture
3. Top 3 interests based on the compatible friend's answers to the quiz.

## Motivation

**FRND-FNDR** utlizied Node.js, and express as it's server-side technologies. Using express to create routing schemes allowed this developer to increase familiarity with the concepts and technology.

## Build Status

Complete

## Code Style

Standard

## Tech/framework Used

Built utilizing Node.js, and express.

## Features

FRND-FNDR is an app that utilizes a simple algorithm to find a friend. User's responses are uploaded, and then broken down and compared to the responses of all previous user questions, and returns a simple card that shows the user which person they are most compatible with. It handles errors such as missing data inputs from user. It will also prevent the user from getting themselves if they enter their personal information again (accidentally creating a duplicate).

## Installation

Perform either a clone or a fork by visiting [FriendFinder](https://github.com/BrantKeener/FriendFinder).

The user then needs to install the appropriate npm files, which are included in the package.json as dependencies. Perform an npm install, and you are ready! You may also perform the following installs manually if you choose:
1. express

## How to Use

The simplest way to use this app is just to visit the heroku-hosted [FriendFinder](https://intense-inlet-81081.herokuapp.com/), and enjoy. The Begin Survey button will start the app, while the API Friends List will pull the JSON data if the user wishes to look through that. The Github Repo link will, of course, take the user over to the repo so they may see additional information.

Once the user has clicked "Begin Survey," they will notice that there are two required pieces of information at the top. The user must enter their name, and a link to a picture the user wishes to use. From there, the user simply needs to answer the 10 quesitons, and click "Find My Friend!"

## Credits

Written and maintained by Brant Keener.

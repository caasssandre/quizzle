# Welcome

This project was the final project completed by me and my colleagues at the dev-academy bootcamp. I pitched the idea of the game as a multiplayer quiz game to be played on mobile devices. I acted as product owner for our team of 4. It was great to see the project come to life in a week and I learned a lot by having to manage other people as well as do the tasks I set myself.
Have a look at the code, visit the website at get-quizzical.herokuapp.com and have fun!

# Quizzle

## The Tech
* [React](https://reactjs.org/docs/getting-started.html)
* [Redux](https://redux.js.org/)
* [Express](https://expressjs.com/en/api.html)
* [Knex.js (SQL)](https://knexjs.org/)
* Sockets
* SASS
---

## User Stories

### MVP1
* [x] I want to be able to play the game on my phone 
* [x] I want to be able to play the game in a group
* [x] I want to be able to read the instructions of the game
* [x] I want to be able to create a group
* [x] I want to be able to join a group
* [x] I want to be able to see the names of everyone who has joined before we start the game
* [x] I want to see a matching question and answer on my screen
* [x] I want to be able to see if my answer was right or wrong
* [x] I want to be able to end/leave the game
* [x] I want the captain of the team to be able to start a new game when everyone is ready

### MVP2
* [x] I want the game to be a fun and hectic quiz game
* [x] I want to see a random question and a random answer on my screen
* [x] I want to make the users wait for everyone to amswer to go to the result screen
* [x] I want there to be protection against duplicate team and user names
* [x] When the game is completed, I want to see the overall results for the team

### MVP3
* [x] I want there to be a timer that limits how long I have to answer the question
* [x] Wait for timer or all player answers to be in before displaying results
* [x] Splash screens: Question and Result
* [x] I want to be able to play multiple rounds
* [x] I want to see what round we are on during each round of the game
* [x] I want the captain of the team to be able to start a new round when everyone is ready
* [x] I want time to depend on the number of players

### Stretch
* [x] Results shown in pie chart
* [x] Randomly generate team names
* [x] Timer is represented by colour/shape change
* [x] I want to see a leaderboard
* [x] I want to choose how many rounds I can play
* [x] Delete users after a certain time
* [x] Handle user disconnects
---

## Views (Client Side)
  | number | name | purpose |
  | --- | --- | --- |
  | -1 | Instructions | Paragraph showing instructions. "Start Game" button |
  | 0 | Welcome | App loads at this page. Displays app name. "How to Play" and "Start Game" buttons |
  | 1 | SetupGame | 2 inputs: teamname, username. 2 buttons: "Create Team", "Join Team" |
  | 2 | Lobby | Displays names of everyone who has joined the game. Captain has "Start Game" button |
  | ' | QuestionSplash | Displays "First Question" etc, times out after 1 second |
  | 3 | Game | Random question at top of screen. Random answers at bottom of screen. Timer displaying count down. Number displaying the round count |
  | ' | ResultSplash | Displays "Results are in!", times out after 1 second |
  | 4 | Results | Question at top of screen, answer (correct/incorrect) at bottom of screen. Captain has "Next Question" button |
  | 5 | GameEnd | Displays percentage and proportion of questions that were answered correctly. Captain has "Start New Game" button |
  ---

## Reducers (Client Side)
  | name | purpose |
  | --- | --- |
  | pageNumber | Stores info about which view/page to display |
  | questions | Stores an array of available questions |
  | teamPlayers | Stores the list of team members in the game |
  | player | Stores info about the current player |
  | teamName | Stores the name of the current team |
  | score | Stores info about current score (e.g. 5/10) |
  | playerResponses | Stores players answers |
  | (roundCount) | Stores which round the team is on |
  ---

 ## API (Client - Server)
| Method | Endpoint | Usage | Response |
| --- | --- | --- | --- | 
| Get | /api/v1/users/:team | Get users by team name (ensure no double up of name display users in lobby) | An array of users |
| Post | /api/v1/users/:team  | Create user and team | --- |
| Get | /api/v1/questions/:number | Get a specified number of questions | An Array of questions |
---

## DB (Server Side)
### Users
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | name | String |
  | team | String |
  | captain | Bool |
  | date_created | Date |

### Questions
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | question | String |
  | correct_answer | String |
  | incorrect_answer_1 | String |
  | incorrect_answer_2 | String |
  | incorrect_answer_3 | String |
 ---

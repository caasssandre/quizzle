// SAVE PLAYER DETAILS
export function savePlayerDetails(name, captain, index){
    return {
        type: 'SAVE_PLAYER_DETAILS',
        playerInfo: {
          name,
          captain,
          index
        }
    }
}

export function saveSocketId(id){
    return{
        type: 'ADD_SOCKET_ID',
        socketId: id
    }
}

// SAVE TEAM DEATAILS
export function saveTeamName(team) {
    return{
        type: 'SAVE_TEAM_NAME',
        teamName: team
    }
}

export function clearPlayers(){
    return{
        type: 'CLEAR_PLAYERS'
    }
}

// CHANGE PAGE NUMBERS
export function goToGame() {
    return {
        type: 'START_GAME'
    }
}

export function goToMainMenu() {
    return {
        type: 'MAIN_MENU'
    }
}

export function incrementPage() {
    return {
        type: 'INCREMENT_PAGE'
    }
}

export function goToStopGame() {
    return {
        type: 'STOP_GAME'
    }
}

// QUESTIONS
export function addQuestions(questions) {
    return {
        type: 'ADD_QUESTIONS',
        questions
    }
}

export function resetQuestions() {
    return {
        type: 'RESET_QUESTIONS'
    }
}

// PLAYER RESPONSES
export function resetPlayerResponses() {
    return {
        type: 'CLEAR_PR_STATE'
    }
}

// NUMBER OF ANSWERS
export function incrementAnswerCount() {
    return {
        type: 'INCREMENT_ANSWER_COUNT'
    }
}

export function resetAnswerCount() {
    return {
        type: 'RESET_ANSWER_COUNT'
    }
}

// CLOCK

export function resetClock(playerCount) {
    return {
        type: 'RESET_CLOCK',
        playerCount
    }
}

export function decrementClock() {
    return {
        type: 'DECREMENT_CLOCK'
    }
}

// SCORE
export function incrementScore(score) {
    return {
        type: 'INCREMENT_SCORE',
        score
    }
}

export function resetScore() {
    return {
        type: 'RESET_SCORE'
    }
}

export function saveStrike(strike) {
    return {
        type: 'SAVE_STRIKE',
        strike
    }
}

// ROUNDS
export function incrementRound() {
    return {
        type: 'INCREMENT_ROUND'
    }
}

export function resetRound() {
    return {
        type: 'RESET_ROUND'
    }
}

// Leaderboard
export function addLeaderboard(leaderboard) {
    return {
        type: 'ADD_LEADERBOARD',
        leaderboard
    }
}

export function resetLeaderboard() {
    return {
        type: 'RESET_LEADERBOARD',
    }
}
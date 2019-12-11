import {combineReducers} from 'redux'

import pageNumber from './pageNumber'
import playerResponses from './playerResponses'
import teamName from './teamName'
import player from './player'
import players from './players'
import questions from './questions'
import answerCount from './answerCount'
import score from './score'
import clock from './clock'
import roundCount from './roundCount'
import totalRounds from './totalRounds'
import leaderboard from './leaderboard'
import strikeCount from './strikeCount'
import missingPlayers from './missingPlayers'

export default combineReducers({
    pageNumber,
    playerResponses,
    teamName,
    player, 
    players,
    questions,
    answerCount,
    score,
    clock, 
    roundCount,
    totalRounds,
    leaderboard,
    strikeCount,
    missingPlayers
})
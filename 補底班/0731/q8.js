let readlineSync = require("readline-sync")

let players = []
let nameAndScore = []

function askForPlayerName(count) {
    let name = readlineSync.question(`Enter player ${count} name (enter nothing to stop): `)
    return name
}

let isAllPlayerReady = false

function setUp() {
    while (!isAllPlayerReady) {
        let x = askForPlayerName(players.length + 1)
        if (x == "") {
            isAllPlayerReady = true
        } else {
            players.push({ name: x, score: 0 })
        }
    }
}

function announce() {
    players.map(function (player) {
        nameAndScore.push(`${player.name} (${player.score})`)
    })
    console.log(`Here are the player names and their scores: ${nameAndScore.join(", ")}`)
}

function bigOrSmall (randomNum) {
    if (randomNum < 4) {
        return "Small"
    } else {
        return "Big"
    }
}


function newGame(round) {
    let randomNumber = Math.floor(Math.random() * 6 + 1)
    console.log(`== Round ${round} ==`)
    for (let i = 0; i < players.length; i++) {
        let guessBigOrSmall = readlineSync.question(`${players[i].name}'s guess the number (Big or Small): `)
        if (guessBigOrSmall == bigOrSmall(randomNumber)) {
            players[i].score += 1
        }
    }
    console.log(`The result is: ${randomNumber}`)
    nameAndScore = []
    players.map(function (player) {
        nameAndScore.push(`${player.name} (${player.score})`)
    })
    console.log(`The scores: ${nameAndScore.join(", ")}`)
}

setUp()
announce()
for (i = 1; i < 4; i++) {
    newGame(i)
}
let readlineSync = require("readline-sync")

let players = []
let nameAndScore = []
let isAllPlayerReady = false

function askForPlayerName (count) {
    let name = readlineSync.question(`Enter player ${count} name (enter nothing to stop): `)
    return name
}

function setUp () {
    while (!isAllPlayerReady) {
        let x = askForPlayerName(players.length + 1)
        if (x == "") {
            isAllPlayerReady = true
        } else {
            players.push({name: x, score: 0})
        }
    }
}

function announce () {
    players.map(function(player) {
        nameAndScore.push(`${player.name} (${player.score})`)
    })
    console.log(`Here are the player names: ${nameAndScore.join(", ")}`)
}



setUp()
announce()
let readlineSync = require("readline-sync")

let players = []
let isAllPlayerReady = false

function askForPlayerName (count) {
    let name = readlineSync.question(`Enter player ${count} name (enter nothing to stop): `)
    return name
}

function setUp () {
    while (!isAllPlayerReady) {
        let answer = askForPlayerName(players.length + 1)
        if (answer == "") {
            isAllPlayerReady = true
        } else {
            players.push(answer)
        }
    }
}

function announce () {
    console.log(`Here are the player names: ${players.join(", ")}`)
}

setUp()
announce()
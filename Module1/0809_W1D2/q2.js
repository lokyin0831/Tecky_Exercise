const cards = [
    ['Spade', 'A'],
    ['Diamond', 'J'],
    ['Club', '3'],
    ['Heart', '6'],
    ['Spade', 'K'],
    ['Club', '2'],
    ['Heart', 'Q'],
    ['Spade', '6'],
    ['Heart', 'J'],
    ['Spade', '10'],
    ['Club', '4'],
    ['Diamond', 'Q'],
    ['Diamond', '3'],
    ['Heart', '4'],
    ['Club', '7']
];

// 1

function numOfCardWithSpade() {
    let numOfSpade = cards.reduce(function (acc, item) {
        if (item[0] === "Spade") {
            return acc + 1
        }
        return acc
    }, 0)
    console.log(numOfSpade)
}

numOfCardWithSpade()


// 2

function removeCardsSmallerThanClub3() {
    let newCardArray = []
    newCardArray = cards.filter(card => card[0] != "Heart" && card[0] != "Spade").filter(card => card[0] != "Club" | card[1] != "2")
    console.log(newCardArray)
}

removeCardsSmallerThanClub3()


// 3

function q3() {
    let diamondAndHeart = []
    diamondAndHeart = cards.filter(card => card[0] === "Diamond" | card[0] === "Heart").filter(card => card[1] === "J" | card[1] === "Q" | card[1] === "K" | card[1] === "A")
    console.log(diamondAndHeart.length)
}

q3()


// 4

function q4() {
    let newArrayq4 = []
    for (let card of cards) {
        if (card[0] === "Club") {
            newArrayq4.push(["Diamond", card[1]])
        } else {
            newArrayq4.push(card)
        }

    }
    console.log(newArrayq4)
}


// // 5

function q5() {
    let newArrayq5 = []
    for (let card of cards) {
        if (card[1] === "A") {
            newArrayq5.push([card[0], "2"])
        } else {
            newArrayq5.push(card)
        }

    }
    console.log(newArrayq5)
}

q5()
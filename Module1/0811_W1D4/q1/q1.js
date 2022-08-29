let boxElems = document.querySelectorAll(".container .box")
const cross = `<i class="bi bi-x big-cross"></i>`
const circle = `<i class="bi bi-circle big-circle"></i>`
const empty = `<i></i>`
const leftBox = document.querySelector(".left-normal-box")
const rightBox = document.querySelector(".right-normal-box")
const turnSign = document.querySelector(".turn")
const turnElem = document.querySelector(".turn-color")
const crossScoreAcc = document.querySelector(".cross-score")
const circleScoreAcc = document.querySelector(".circle-score")
const restartButton = document.querySelector(".restart-text")
const tie = `<div class="tie"></div>`
let turn = 1
let crossScore = 0
let circleScore = 0
let winnerIsHere = false

for (let boxElem of boxElems) {
    boxElem.addEventListener('click', function () {
        if (boxElem.innerHTML != circle && boxElem.innerHTML != cross && !winnerIsHere) {
            if (turn % 2 != 0) {
                boxElem.innerHTML = cross
                turn++
                console.log(turn)
            } else {
                boxElem.innerHTML = circle
                turn++
                console.log(turn)
            }
        }
        if (turn == 10) {
            leftBox.classList.remove("your-turn")
            turnSign.classList.remove("bi-circle")
            turnSign.classList.remove("little-circle")
            turnSign.classList.remove("bi-x")
            turnSign.classList.remove("little-cross")
            turnElem.innerHTML = tie;

        } else if (turn % 2 != 0) {
            rightBox.classList.remove("your-turn")
            leftBox.classList.add("your-turn")
            turnSign.classList.remove("bi-circle")
            turnSign.classList.remove("little-circle")
            turnSign.classList.add("bi-x")
            turnSign.classList.add("little-cross")
        } else {
            leftBox.classList.remove("your-turn")
            rightBox.classList.add("your-turn")
            turnSign.classList.remove("bi-x")
            turnSign.classList.remove("little-cross")
            turnSign.classList.add("bi-circle")
            turnSign.classList.add("little-circle")
        }
        checkWin()
    });

}

restartButton.addEventListener('click', function () {
    turn = 1
    winnerIsHere = false
    for (let boxElem of boxElems) {
        boxElem.innerHTML = empty
    }
    rightBox.classList.remove("your-turn")
    leftBox.classList.add("your-turn")
    turnSign.classList.remove("bi-circle")
    turnSign.classList.remove("little-circle")
    turnSign.classList.add("bi-x")
    turnSign.classList.add("little-cross")
    turnElem.innerHTML = `<div class="turn-color">Turn</div>`
    
})




function checkWin() {
    const box1Elem = document.querySelector("#box1")
    const box2Elem = document.querySelector("#box2")
    const box3Elem = document.querySelector("#box3")
    const box4Elem = document.querySelector("#box4")
    const box5Elem = document.querySelector("#box5")
    const box6Elem = document.querySelector("#box6")
    const box7Elem = document.querySelector("#box7")
    const box8Elem = document.querySelector("#box8")
    const box9Elem = document.querySelector("#box9")
    const winPattern =
        (box1Elem.innerHTML == cross && box4Elem.innerHTML == cross && box7Elem.innerHTML == cross) ||
        (box2Elem.innerHTML == cross && box5Elem.innerHTML == cross && box8Elem.innerHTML == cross) ||
        (box3Elem.innerHTML == cross && box6Elem.innerHTML == cross && box9Elem.innerHTML == cross) ||
        (box1Elem.innerHTML == cross && box2Elem.innerHTML == cross && box3Elem.innerHTML == cross) ||
        (box4Elem.innerHTML == cross && box5Elem.innerHTML == cross && box6Elem.innerHTML == cross) ||
        (box7Elem.innerHTML == cross && box8Elem.innerHTML == cross && box9Elem.innerHTML == cross) ||
        (box1Elem.innerHTML == cross && box5Elem.innerHTML == cross && box9Elem.innerHTML == cross) ||
        (box3Elem.innerHTML == cross && box5Elem.innerHTML == cross && box7Elem.innerHTML == cross) ||
        (box1Elem.innerHTML == circle && box4Elem.innerHTML == circle && box7Elem.innerHTML == circle) ||
        (box2Elem.innerHTML == circle && box5Elem.innerHTML == circle && box8Elem.innerHTML == circle) ||
        (box3Elem.innerHTML == circle && box6Elem.innerHTML == circle && box9Elem.innerHTML == circle) ||
        (box1Elem.innerHTML == circle && box2Elem.innerHTML == circle && box3Elem.innerHTML == circle) ||
        (box4Elem.innerHTML == circle && box5Elem.innerHTML == circle && box6Elem.innerHTML == circle) ||
        (box7Elem.innerHTML == circle && box8Elem.innerHTML == circle && box9Elem.innerHTML == circle) ||
        (box1Elem.innerHTML == circle && box5Elem.innerHTML == circle && box9Elem.innerHTML == circle) ||
        (box3Elem.innerHTML == circle && box5Elem.innerHTML == circle && box7Elem.innerHTML == circle)


    if (winPattern && turn % 2 == 0 && !winnerIsHere) {
        winnerIsHere = true
        crossScore++
        crossScoreAcc.innerHTML = crossScore


    } else if (winPattern && turn % 2 != 0 && !winnerIsHere) {
        winnerIsHere = true
        circleScore++
        circleScoreAcc.innerHTML = circleScore
    }
}
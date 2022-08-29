// JS-F2-Q1
false
true
true
true
true
false
false

// JS-F2-Q2
a1 = NaN
a2 = 5

// JS-F2-Q3
function calculateBMI(weight, height) {
    bmi = weight / height ** 2

    console.log("BMI: " + Math.round(bmi))
    if (bmi < 18.5) {
        console.log("Result: Underweight")
    } else if (bmi > 18.5 & bmi < 24.9) {
        console.log("Result: Normal")
    } else if (bmi > 25 & bmi < 29.9) {
        console.log("Result: Overweight")
    } else {
        console.log("Result: Obese")
    }
}

calculateBMI(88, 1.8)

// JS-F2-Q4
for (let i = 0; i < 11; i++) {

    // *NOTE: Reference to a classmate, ignore the value whenever it is divisible by 3

    if ((i + 1) % 3 === 0) {

    } else {

        console.log(i + 1);

    }

}
/////////////////
let acc = 0

for (let i = 0; i < 8; i++) {
    if ((i + 1 + acc) % 3 == 0) {
        acc++
    }
    console.log(i + 1 + acc)
}
inPut = process.argv[2]
numString = inPut.split(',')
sum = 0
for (num of numString){
    newNum = parseInt(num)
    sum = sum + newNum
}
console.log("The sum of the numbers is: " + sum)
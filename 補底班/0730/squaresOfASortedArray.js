

function squareOf(nums) {
    let newNums = []
    for (let num of nums) {
        newNums.push(num ** 2)
    }
    console.log(newNums.sort(function (a, b) { return a - b }))
}

squareOf([-7, -3, 2, 3, 11])
squareOf([-4,-1,0,3,10])

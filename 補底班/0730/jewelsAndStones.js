function jewelandstone(jewels, stones) {
    let jewelsarray = jewels.split("")
    let stonesArray = stones.split("")
    console.log(jewelsarray, stonesArray)

    let counter = 0

    for (let s of stonesArray) {
        if (jewelsarray.includes(s)) {
            counter += 1
        }
    }
    return counter
}


console.log(jewelandstone("aA", "aAAbbbb"))
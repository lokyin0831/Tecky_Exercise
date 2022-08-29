let output = ""

for (let i = 0; i < 7; i++) {
    if (i % 2 == 0) {
        output += "+"
    } else {
        output += "-"
    }
}

for (let i = 0; i < 4; i++) {
    let space = " ".repeat(i)
    console.log(space + output)
    // output = output.substring(1).substring(output.length - 1) ?????
}







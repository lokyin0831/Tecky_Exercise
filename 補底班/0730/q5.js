for (let i = 0; i < 3; i++) {
    let output = "*"

    function addStar(count) {
        output = "*".repeat(count) + output + "*".repeat(count)
    }

    function addSpace(count) {

    }

    addStar(i)
    console.log(" ".repeat(3 - i - 1) + output)
  }
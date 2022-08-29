

function emailFunction(emails) {
    let newEmails = []
    for (let email of emails) {
        let x = email.split("@")
        let y = x[0].split("+")[0]
        let z = y.replaceAll(".", "")
        newEmails.push(z + "@" + x[1])
    }
    console.log(newEmails)
    let uniqueEmail = [...new Set(newEmails)];
    console.log(uniqueEmail)
    console.log("Output: " + uniqueEmail.length)
}

emailFunction(["test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"])
emailFunction(["a@leetcode.com","b@leetcode.com","c@leetcode.com"])
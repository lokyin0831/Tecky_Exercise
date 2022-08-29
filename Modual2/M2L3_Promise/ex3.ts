import readline from 'readline';


const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const answers: any = {}
async function askQuestion(question: string) {
    return new Promise((resolve, reject) => {
        readLineInterface.question(question, (answer:string)=>{
            console.log(`Your answer is ${answer}`);
            resolve(answer)
        });

    })
}

async function main() {
    try {
        let name = await askQuestion("What is your name?")
        let age: any = await askQuestion("What is your age?")
        answers['name'] = name
        answers['age'] = age
    } catch (err) {

    }

    console.log(answers)
}
main()
// readLineInterface.question("What is your name?",(answer:string)=>{
//     console.log(`Your name is ${answer}`);
//     readLineInterface.question("What is your age?",(answer:string)=>{
//         console.log(`Your age is ${answer}`);
//         readLineInterface.question("What is your age?",(answer:string)=>{
//             console.log(`Your age is ${answer}`);
//             readLineInterface.question("What is your age?",(answer:string)=>{
//                 readLineInterface.close();
//             });
//         });
//     });
// });
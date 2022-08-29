// import { readlinePromise } from './ex1'; // from previous exercise


// const readCommand = async ()=>{
//     while(true){ // game-loop, eval-loop
//         // Exit by Ctrl+C
//         const answer = await readlinePromise("Please choose read the report(1) or run the benchmark(2):");
//         const option = parseInt(answer,10);
//         console.log(`Option ${answer} chosen.`);
//         if(option == 1){
//             await readTheReport();  
//         }else if(option == 2){
//             await runTheBenchmark(); 
//         }else{
//             console.log("Please input 1 or 2 only.");
//         }
//     }
// }

// readCommand();

// async function runTheBenchmark(){
//     // Detail Here
// }

// type Report = Trial[]

// interface Trial{
//      //Think of what fields are necessary

// }

// async function readTheReport(){
//     // Detail Here
//     //Read from JSON file
// }
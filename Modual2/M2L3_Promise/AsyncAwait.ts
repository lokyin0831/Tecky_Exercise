// let is_shop_open = true;

import { Console } from "console"

// function time(ms:number) {

//    return new Promise( (resolve, reject) => {

//       if(is_shop_open){
//          setTimeout(resolve,ms);
//       }
//       else{
//          reject(console.log("Shop is closed"))
//       }
//     });
// }

// async function kitchen(){
//     try{
// 	await time(2000)
// 	console.log(`Fruits was selected`)

// 	await time(0)
// 	console.log("Production has started")

// 	await time(2000)
// 	console.log("Fruit has been chopped")

// 	await time(1000)
// 	console.log(`Water and ice added`)

// 	await time(1000)
// 	console.log("Start the machine")

// 	await time(2000)
// 	console.log(`Ice cream placed on cone`)

// 	await time(3000)
// 	console.log(`Chocolate as toppings`)

// 	await time(2000)
// 	console.log("Serve Ice Cream")
//     }

//     catch(error){
// 	 console.log("customer left")
//     }

//     finally {
//         console.log("Shop closed")
//     }
// }

// kitchen()

/////
import fs from 'fs';

console.log("Step 1")
fs.readFileSync('quotes.txt')
	.then(function (buffer) {
		setTimeout(() => { console.log(`Fruits was selected`) }, 2000)
	})
	.then(() => {
		setTimeout(() => { console.log("Production has started") }, 0)

	})
	.then(() => {
		setTimeout(() => { console.log("Fruit has been chopped") }, 2000)

	})
	.then(() => {
		setTimeout(() => { console.log(`Water and ice added`) }, 1000)

	})
	.catch(function (err: any) {
		console.log(err)
	})
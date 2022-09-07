import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();
import XLSX from "xlsx";

// console.log(process.env);

export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

interface User {
    username: string;
    password: string;
}

interface Memo {
    content: string;
    image: string;
}
async function main() {
    await client.connect(); // "dial-in" to the postgres server

    let workbook = XLSX.readFile("usersAndMemos.xlsx");
    let users: User[] = XLSX.utils.sheet_to_json(workbook.Sheets["user"]);
    let memos: Memo[] = XLSX.utils.sheet_to_json(workbook.Sheets["memo"]);

    // const user = {
    //     username: "gordon",
    //     password: "tecky",
    // };

    for (let user of users) {
        // DANGER :  sql injection!!!
        // await client.query("INSERT INTO users (username,password) values ('" + "'','');DROP table memos; --" + "'  ,'tecky')");
        // await client.query(`INSERT INTO users (username,password) values ('${user.username}','${user.password}')`);

        await client.query("INSERT INTO users (username,password) values ($1,$2)", [user.username, user.password]);
    }

    for (let memo of memos) {
        await client.query("INSERT INTO memos (content,image) values ($1,$2)", [memo.content, memo.image]);
    }

    const result = await client.query("SELECT * from memos");

    console.log(result.rows);

    // console.log(result.rows[0].username); // gordon

    await client.end(); // close connection with the database
}
main();
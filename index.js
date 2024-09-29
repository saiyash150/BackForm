const express = require('express');
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "test.db");




let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.post("/register", async (request, response) => {
    
  const{id,name,address}=response.body

  const selectuserquery=`SELECT * FROM User WHERE id LIKE ${id};`
   const selected=await db.get(selectuserquery)

   if(selected===undefined){
    const UserQuery = `INSERT INTO User(id,name) VALUES(${id},${name})`;
     await db.run(UserQuery);
    const Addressquery = `INSERT INTO Address(user_id,address) VALUES(${id},${address}) `;
    await db.run(Addressquery);

   }
   else{
    const Addressquery = `INSERT INTO Address(user_id,address) VALUES(${id},${address}) `;
    await db.run(Addressquery);

   }
    
    
    
    
    response.send("Tables updated")
    
  });


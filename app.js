const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
let db = null;
const dbPath = path.join(__dirname, "covid19India.db");

const initializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Started at localhost:3000");
    });
  } catch (e) {
    console.log(`DbServer Error: ${e.message}`);
    process.exit(1);
  }
};

app.use(express.json());

//API 1
app.get("/states/", async (req, res) => {
  const getStatesQuery = `
        select state_id as stateId,state_name as stateName,population
        from state
    `;
  const statesArray = await db.all(getStatesQuery);
  res.send(statesArray);
});

//API 2

initializeDbServer();

module.exports = app;

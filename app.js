const express = require("express");
const app = express();
const axios = require("axios");

app.set("view engine", "ejs");
app.use(express.static("public"));

let data = [];

function getData() {}
async function makeRequest() {
  const config = {
    method: "get",
    url: "https://pokeapi.co/api/v2/pokemon",
  };

  let res = await axios(config);
  data = res.data.results.slice(6, 9);
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    const config2 = {
      method: "get",
      url: data[i].url,
    };
    let newRes = await axios(config2);
    data[i].ability = newRes.data.abilities[0].ability.name;
    data[i].img = newRes.data.sprites.front_default;
  }
  console.log(data);
}

makeRequest();

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home", { dataPokemon: data });
});

app.get("/*", (req, res) => {
  res.render("404");
});
app.listen(3000, () => console.log("Server is running on port 3000"));

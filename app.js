const exp = require("constants");
let express = require("express");
let path = require("path");
let app = express();
const overviewObj = require("./util/planetDetails.js");
let nameOfPlanet;

const pubDir = path.join(__dirname, "/public");
app.use(express.static(pubDir));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  nameOfPlanet = "Mercury";
  overviewObj.planetOverviewDetails(nameOfPlanet, (err,data)=>{
    res.render("planetOverview", ({data}));
  })
    
})

app.get("/planet", (req,res) => {
  nameOfPlanet = req.query.planetName;
  overviewObj.planetOverviewDetails(req.query.planetName, (err, data) => {
    res.render("planetOverview", ({data}));
    console.log(data);
  });
})

app.get("/overview", (req,res) => {
  overviewObj.planetOverviewDetails(nameOfPlanet, (err, data) => {
    res.render("planetOverview", ({data}));
    console.log(data);
  });
})

app.get("/internal", (req,res)=>{
    overviewObj.planetStructureDetails(nameOfPlanet,(err,data) =>{
      res.render("planetOverview", ({data}));
      console.log(data);
    })
})

app.get("/geology", (req,res)=>{
  overviewObj.planetGeologyDetails(nameOfPlanet,(err,data) =>{
    res.render("planetOverview", ({data}));
    console.log(data);
  })
})


app.get("*", (req,res) => {
    res.send("<h1>404 Not Found</h1>");
})

app.listen(4000, () => {
    console.log("Server created");
})



import express from "express";
import connectDB from "./connection.js";
import controller from "./functions.js";
const app = express()
const port = 3000
connectDB();

app.use(express.json());

app.use(express.static('public'));
// Set EJS as templating engine 
app.set('view engine', 'ejs');

//Routing done for home page
app.get('/',(req,res)=>{
  res.render('home');
})

//Routing done using post method for API call
//Controller function call to functions.js file
app.post('/primeAlgo',controller);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})
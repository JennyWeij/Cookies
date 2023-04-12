import cookieSession from 'cookie-session';
import express from 'express';
import { getAllUsers, getAuth, loginUser, registerUser } from './controller';
import { auth } from './middlewares';

//Server application
const app = express();

//Global middleware
//1. json
app.use(express.json());
//2. cookie-session
app.use(
  cookieSession({
  name: "login",
  secure: false,
  httpOnly: true,
  secret: "jigreu89gehjikdjdhfiu763dldmcole936djfn",
  maxAge: 1000 * 20,
})
);

app.get("/", (req, res) =>{
  res.status(200).json("Welcome to my API, please login!")
})

//Bara för demo, gör inte i verkligheten
app.get("/users", getAllUsers)
app.post("/users/register", registerUser)
app.post("/users/login", loginUser) 
app.get("/users/auth", auth, getAuth);

//Startar servern
app.listen(3000, () => 
console.log("Server is running on http://localhost:3000"))



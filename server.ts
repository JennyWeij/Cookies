import argon2 from 'argon2';
import cookieSession from 'cookie-session';
import express from 'express';

//Server application
const app = express();

//"Databas"
interface User {
  email: string;
  password: string;
}
const users: User[] = [];

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
app.get("/users", (req, res) => {
  res.status(200).json(users);
})

app.post("/users/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await argon2.hash(password)
  const user = { email, password: hashedPassword };
  users.push(user);
  res.status(201).json(user);
});

//Startar servern
app.listen(3000, () => 
console.log("Server is running on http://localhost:3000"))
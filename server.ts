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
const users: User[] = [{
  email: "jenny@test.com",
  password: "$argon2id$v=19$m=65536,t=3,p=4$jpvhETqjNrXOsmtQxUv37g$1JKP9KVHUh0pusKnwmzHnGwZxPSeQl1/0P7f7ctLWic"
}];

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

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  //Kolla användare
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json("Incorrect email or password")
  }
  
  //Kolla password
  const isAuth = await argon2.verify(user.password, password)
  if (!isAuth) {
    return res.status(400).json("Incorrect email or password")
  }

  //Skapa session/cookie
  req.session!.email = user.email;

  //Skicka svar(response)
  res.status(200).json("Login successful!");
})

//Startar servern
app.listen(3000, () => 
console.log("Server is running on http://localhost:3000"))
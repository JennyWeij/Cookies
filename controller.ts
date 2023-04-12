import argon2 from 'argon2';
//"Databas"
interface User {
  email: string;
  password: string;
}
const users: User[] = [{
  email: "jenny@test.com",
  password: "$argon2id$v=19$m=65536,t=3,p=4$jpvhETqjNrXOsmtQxUv37g$1JKP9KVHUh0pusKnwmzHnGwZxPSeQl1/0P7f7ctLWic"
}];

import { Request, Response } from "express";

export function getAuth (req: Request, res: Response) {
  if (!req.session?.email) {
    return res.status(401).json("You must login")
  }
  res.status(200).json(req.session)
};

export async function loginUser(req: Request, res: Response) {
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
};

export async function registerUser (req: Request, res: Response) {
  const { email, password } = req.body;
  const hashedPassword = await argon2.hash(password)
  const user = { email, password: hashedPassword };
  users.push(user);
  res.status(201).json(user);
};

export function getAllUsers (req: Request, res: Response) {
  res.status(200).json(users);
};
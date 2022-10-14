import React from "react";
import "./Signup.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../Firebase/Firebase";
import SignupFrom from "../SignupFrom/SignupFrom";

const auth = getAuth(app);

const handelRegister = (event) => {
  event.preventDefault();
  const email = event.target[0].value;
  const password = event.target[1].value;
  console.log(email, password);
  //   createUserWithEmailAndPassword(auth, email, password);
};

const hendelEmail = (event) => {
  const email = event.target.value;
  console.log(email);
};

const hendelPassword = (event) => {
  const password = event.target.value;
  console.log(password);
};

const Singup = () => {
  return (
    <>
      <SignupFrom></SignupFrom>
    </>
  );
};

export default Singup;

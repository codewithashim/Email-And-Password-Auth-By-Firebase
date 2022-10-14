import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../Firebase/Firebase";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const SignupFrom = () => {
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");

  const handelRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;
    // ------------------- start password validation--------------------------
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError("Password must contain at least two uppercase letters");
      return;
    }
    if (password.lenth < 6) {
      setPasswordError("Password must contain at least 6 characters");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setPasswordError("Password must contain at least one special character");
      return;
    }
    setPasswordError("");

    // ------------------- end password validation----------------------------
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        updateUserProfile(name);
        form.reset();
        veryfiEmail();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setPasswordError(errorMessage, errorCode);
        setSuccess(false);
      });
  };

  const updateUserProfile = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("updatte");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hendelEmail = (event) => {
    const email = event.target.value;
    console.log(email);
  };

  const hendelPassword = (event) => {
    const password = event.target.value;
    console.log(password);
  };

  const veryfiEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("Email verification sended!");
    });
  };

  return (
    <>
      <section className="container shadow rounded w-50 my-4 mx-auto p-4">
        <Form onSubmit={handelRegister}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter Your Full Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={hendelEmail}
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={hendelPassword}
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <p className="text-danger">{passwordError}</p>
          {success && <p className="text-success">Registration Successful</p>}
          <p className="text-center">
            Alrady Have An Account <Link to="/login">Signin Now</Link>{" "}
          </p>
          <Button variant="primary" type="submit">
            Signup
          </Button>
        </Form>
      </section>
    </>
  );
};

export default SignupFrom;

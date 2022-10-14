import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase/Firebase";

const auth = getAuth(app);

const SignupFrom = () => {
  const [passwordError, setPasswordError] = useState("");

  const handelRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

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

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
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

  return (
    <>
      <section className="container shadow rounded w-50 my-4 mx-auto p-4">
        <Form onSubmit={handelRegister}>
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
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </section>
    </>
  );
};

export default SignupFrom;

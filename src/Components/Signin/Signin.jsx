import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../Firebase/Firebase";

const auth = getAuth(app);

const Signin = () => {
  const [login, setLogin] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [sucess, setSucess] = React.useState(false);

  const hendedLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLogin(true);
        form.reset();
        setSucess(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setEmail(errorMessage, errorCode);
        setLogin(false);
        setSucess(false);
      });
  };

  const hendelBlurEmail = (event) => {
    const email = event.target.value;
    console.log(email);
    setEmail(email);
  };

  const hendelForgetPassword = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    sendPasswordResetEmail(auth, email).then(() => {
      // Password reset email sent!
      // ..
      alert("Password reset email sent!");
    });
  };

  return (
    <main className="my-4">
      <section className="w-50 m-auto container border p-4">
        <Form onSubmit={hendedLogin}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                onBlur={hendelBlurEmail}
                name="email"
                type="email"
                placeholder="Email"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
            </Col>
          </Form.Group>
          {sucess ? (
            <p className="text-success">Login Sucess</p>
          ) : (
            <p className="text-danger">{email}</p>
          )}
          <p className="text-center">
            New to this website ? Pless <Link to="/signup">Signup Now</Link>{" "}
          </p>
          <p>
            Forget Password{" "}
            <Link onClick={hendelForgetPassword}>Reset Now</Link>
          </p>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
        </Form>
      </section>
    </main>
  );
};

export default Signin;

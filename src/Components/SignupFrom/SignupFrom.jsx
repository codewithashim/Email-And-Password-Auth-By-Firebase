import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import google from "../../Assect/google.png";
import github from "../../Assect/github.png";
import facebook from "../../Assect/facebook.png";
import "./SignupFrom.css";
import useFirebase from "../../Firebase/Hokes";
import { Link } from "react-router-dom";

const SignupFrom = () => {
  const {
    hendelEamail,
    // hendelPassword,
    hendelFullName,
    error,
    success,
    hendelRegister,
    hendelSignInByGoogle,
    hendelSignInByFacebook,
    hendelSignInByGithub,
  } = useFirebase();

  return (
    <>
      <section className="container shadow rounded w-50 my-4 mx-auto p-4">
        <Form onSubmit={(event) => hendelRegister(event)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              onBlur={(event) => hendelFullName(event)}
              type="text"
              name="fullName"
              placeholder="Enter Your Full Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={(event) => hendelEamail(event)}
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              // onChange={(event) => hendelPassword(event)}
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <p className="text-danger">{error}</p>
          {success && <p className="text-success">Registration Successful</p>}
          <p className="text-center">
            Alrady Have An Account <Link to="/login">Signin Now</Link>{" "}
          </p>

          <Button variant="primary" type="submit">
            Signup
          </Button>

          <div className="socialLogin mt-2 text-center">
            <Button
              variant="success"
              className="socialLoginBtn"
              onClick={hendelSignInByGoogle}
            >
              <img src={google} alt="google" style={{ width: "2rem" }} />
              SignIn By Google
            </Button>{" "}
            <Button
              variant="success"
              className="socialLoginBtn"
              onClick={hendelSignInByGithub}
            >
              <img src={github} alt="github" style={{ width: "2rem" }} />
              SignIn By Github
            </Button>{" "}
            <Button
              variant="success"
              className="socialLoginBtn"
              onClick={hendelSignInByFacebook}
            >
              <img src={facebook} alt="facebook" style={{ width: "2rem" }} />
              SignIn By Facebook
            </Button>{" "}
          </div>
        </Form>
      </section>
    </>
  );
};

export default SignupFrom;

import React from "react";
import "./Signin.css";

const Signin = () => {
  return (
    <>
      <section className="loginSection">
        <form action="" className="loginFrom">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Signin</button>
        </form>
      </section>
    </>
  );
};

export default Signin;

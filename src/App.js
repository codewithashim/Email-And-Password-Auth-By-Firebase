import "./App.css";
import { getAuth } from "firebase/auth";
const auth = getAuth();

function App() {
  return (
    <>
      <section>
        <form action="">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
}

export default App;

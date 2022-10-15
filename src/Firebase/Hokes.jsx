import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import app from "./Firebase";
import Swal from "sweetalert2";

const auth = getAuth(app);

const useFirebase = () => {
  // -----------------------Declare state start------------------------------

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userInfo, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userCrandential, setUserCrandential] = useState({});

  // -----------------------Declare state end--------------------------------

  // -------------------------Hendel Email Sign up start-------------------------
  const hendelEamail = (event) => {
    const from = event.target;
    console.log(from.value);
    setEmail(from.value);
  };

  // const hendelPassword = (event) => {
  //   const form = event.target;
  //   // console.log(form.value);
  //   if (!/(?=.*[A-Z].*[A-Z])/.test(myPassword)) {
  //     setError("Password must contain at least two uppercase letters");
  //     return;
  //   }
  //   if (myPassword.length < 8) {
  //     setError("Password must contain at least 6 characters");
  //     return;
  //   }
  //   if (!/(?=.*[!@#$&*])/.test(myPassword)) {
  //     setError("Password must contain at least one special character");
  //     return;
  //   }
  //   if (!/(?=.*[0-9].*[0-9])/.test(myPassword)) {
  //     setError("Password must contain at least two digits");
  //     return;
  //   }
  //   setError("");

  //   setUsePassword(form.value);
  // };

  const hendelFullName = (event) => {
    const form = event.target;
    console.log(form.value);
    setName(form.value);
  };

  const hendelRegister = (event) => {
    event.preventDefault();

    const password = event.target.password.value;
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Password must contain at least two uppercase letters");
      return;
    }
    if (password.lenth < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setError("Password must contain at least one special character");
      return;
    }
    setError("");

    createUserWithEmailAndPassword(auth, email, event.target.password.value)
      .then((userCredential) => {
        // Signed in
        const userInfo = userCredential.user;
        setUser(userInfo);
        hendelUpdateName();
        veryfiEmail();
        setSuccess("Registration Successful");
        Swal.fire("Good job!", "You clicked the button!", "success");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const hendelUpdateName = () => {
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

  const veryfiEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      Swal.fire("Good job!", "You clicked the button!", "success");
    });
  };

  // -------------------------Hendel Email Sign up end---------------------------

  // -------------------------Hendel Email Sign in start-------------------------

  // -------------------------Hendel Email Sign in end---------------------------

  // -----------------------Hendel Google Sign in start-----------------------

  const googleProvider = new GoogleAuthProvider();

  const hendelSignInByGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        // The email of the user's account used.
        setError(errorMessage);
        const email = error.customData.email;
        // The AuthCredential type that was used.
        setError(email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        setError(credential);
        // ...
      });
  };
  // -------------------------Hendel Google Sign in end-------------------------

  // -------------------------Hendel Facebook Sign in start----------------------
  const facebookProvider = new FacebookAuthProvider();
  const hendelSignInByFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        setUserCrandential(accessToken);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        setError(errorCode);
        const errorMessage = error.message;
        setError(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        setError(email);
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        setError(credential);
        // ...
      });
  };
  // -------------------------Hendel Facebook Sign in end------------------------

  // -------------------------Hendel Github Sign in start------------------------
  const githubProvider = new GithubAuthProvider();

  const hendelSignInByGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setUserCrandential(token);
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        setError(errorCode);
        const errorMessage = error.message;
        setError(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        setError(email);
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        setError(credential);
        // ...
      });
  };
  // -------------------------Hendel Github Sign in end--------------------------

  // -------------------------Hendel Twitter Sign in start-----------------------

  // -------------------------Hendel Twitter Sign in end-------------------------

  //==========================Exporting All Function====================================
  return {
    hendelEamail,
    // hendelPassword,
    hendelFullName,
    hendelRegister,
    hendelSignInByGoogle,
    hendelSignInByFacebook,
    hendelSignInByGithub,
    error,
    success,
    userInfo,
    userCrandential,
  };
};

export default useFirebase;

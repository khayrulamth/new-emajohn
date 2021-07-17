import { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';


firebase.apps.length === 0 ? firebase.initializeApp(firebaseConfig) : firebase.app()


function Login() {
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
        error: "",
        success: false,
    })
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const handleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((res) => {
                const { displayName, email, photoURL } = res.user;
                const signedInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                console.log(displayName, email, photoURL);
                history.replace(from);
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(() => {
                const signedOutUser = {
                    isSignIn: false,
                    name: "",
                    email: "",
                    photo: "",
                }
                setUser(signedOutUser);
                setLoggedInUser(signedOutUser);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            isFieldValid = regexEmail.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 5;
            const passHasNum = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passHasNum;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);

        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    console.log(res);
                    // history.replace(from);
                })
                .catch(err => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = err.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                })
        }
        e.preventDefault();
    }

    if (!newUser && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                const newUserInfo = { ...user };
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
    }

    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbprovider)
            .then((result) => {
                const fbUser = result.user;
                setUser(fbUser);
                setLoggedInUser(fbUser);
                console.log(fbUser);
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode,errorMessage);
            });
    }


    return (
        <div className="App">
            <button onClick={handleFbSignIn}>Fb Sign in</button>
            <br />
            {
                user.isSignIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>

            }
            {
                user.isSignIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <br />
            <p>Email:{user.email}</p>
            <p>Password:{user.password}</p>
            <p style={{ color: "red" }}>{user.error}</p>
            <form action="">
                <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
                <label htmlFor="newUser">Register</label>

                <br />
                {newUser && <input onChange={handleBlur} type="text" name="name" id="" placeholder="Your Name" />}
                <br />
                <input onBlur={handleBlur} type="text" placeholder="Your Email" name="email" required />
                <br />
                <input onBlur={handleBlur} type="password" placeholder="Your Password" name="password" id="" required />
                <br />
                <input onClick={handleSubmit} type="submit" value={newUser ? "Sign up" : "sign in"} />
            </form>

            {
                user.success ? <p style={{ color: "green" }}>{newUser ? "Account Created" : "Logged in Successfully"}</p> : <p style={{ color: "red" }}>{user.error}</p>
            }
        </div>
    );
}


export default Login;

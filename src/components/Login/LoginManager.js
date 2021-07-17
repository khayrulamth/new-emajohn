import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";

//initilizing firebase config
export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
}

//Google signin with popup
export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then((res) => {
            const { displayName, email, photoURL } = res.user;
            const signedInUser = {
                isSignIn: true,
                name: displayName, email,
                userEmail: email,
                photo: photoURL, 
                success: true,
            }
            return signedInUser;
        })
        .catch(error => {
            console.log(error.message);
        })
}

//facebook login with popup window
export const handleFbSignIn = () => {
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbprovider)
        .then((res) => {
            const { displayName, email, photoURL } = res.user;
            const signedInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL, 
                success: true,
            }
            return signedInUser;
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}

// singout for all userEmail
export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(() => {
            const signedOutUser = {
                isSignIn: false,
                name: "",
                userEmail: "",
                photo: "",
            }
            return signedOutUser;
        })
        .catch(error => {
            console.log(error.message);
        })
}

export const createUserWithEmailAndPassword = (email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((res) => {
            
            const newUserInfo = res.user;
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(err => {
            const newUserInfo = {};
            newUserInfo.error = err.message;
            newUserInfo.success = false;
            return newUserInfo;
        })
}

export const signInUserWithEmailAndPassword = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {  };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}
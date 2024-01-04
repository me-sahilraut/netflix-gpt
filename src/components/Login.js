import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validation';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constant';

const Login = () => {


    const [isSignInForm, setIsSignInFrom] = useState(true);
    const [errMsg, setErrMsg] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handelButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value)
        setErrMsg(message);
        if (message) return;


        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: USER_AVATAR
                    }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                        navigate("/browse")
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });


                    console.log(user)
                    console.log("you are signed up")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    setErrMsg(errorCode + "-" + errorMessage)
                });

        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    navigate("/browse")

                    console.log(user)
                    console.log("you are sign IN")

                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrMsg(errorCode + "-" + errorMessage)
                });
        }
    }
    const toggleSignInForm = () => {
        setIsSignInFrom(!isSignInForm);
    }


    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    alt="bg"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/85eb5b91-25ed-4965-ace9-ba8e4a0ead8d/IN-en-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="absolute p-12  bg-black mx-auto left-0 right-0 my-36 w-3/12 text-white bg-opacity-80"
            >
                <h2 className="p-2 text-3xl font-bold my-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h2>

                {isSignInForm ? (
                    " "
                ) : (
                    <input
                        ref={name}

                        type="name"
                        placeholder="Full Name"
                        className="p-2 my-2 w-full rounded-md bg-gray-800"
                    />
                )}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email"
                    className="p-2 my-2 w-full rounded-md bg-gray-800"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-2 my-2 w-full rounded-md  bg-gray-800"
                />
                <span className='text-lg text-red-500 font-bold '>{errMsg}</span>

                {/* {showErrMessage} */}
                <button
                    className="p-2 my-10 w-full bg-red-600 rounded-md" onClick={handelButtonClick}

                >
                    Sign In
                </button>
                <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm
                        ? "New To netflix? Sign Up for Now...."
                        : "Already Registered? Sign In Now....."}
                </p>
            </form>
        </div>
    )
}

export default Login
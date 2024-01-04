import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from '../utils/constant';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);

    const handelSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            // An error happened.
        });
    };




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                navigate("/browse")
            } else {
                dispatch(removeUser());
                navigate("/")
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className='absolute px-5 py-5 bg-gradient-to-b from-black z-10 w-screen flex justify-between'>
            <img src={LOGO}
                alt='logo' className='w-[12rem]' />

            {user && (
                <div className='flex space-x-2'>
                    <img src={USER_AVATAR} alt='' className='w-[3rem] h-[2rem] my-auto' />
                    <button className='font-bold text-lg text-white' onClick={handelSignOut}>Sign Out</button>
                </div>

            )}
        </div>

    )
}

export default Header
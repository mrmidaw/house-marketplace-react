import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase.config.js';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { OAuth } from '../components/OAuth.jsx';



export const SingUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = formData;
    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            updateProfile(auth.currentUser, {
                displayName: name
            })

            const formDataCopy = { ...formData };
            delete formDataCopy.password;
            formDataCopy.timeStamp = serverTimestamp();

            await setDoc(doc(db, 'users', user.uid), formDataCopy);

            navigate('/');

        } catch (error) {
            toast.error('Something going wrong with registration', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    };


    return (
        <>
            <div className='pageContainer'>

                <header>
                    <p className='pageHeader'>
                        Welcome Back!
                    </p>
                </header>

                <form onSubmit={onSubmit}>

                    <input
                        className='nameInput'
                        type='text'
                        placeholder='Name'
                        id='name'
                        value={name}
                        onChange={onChange}
                    />

                    <input
                        className='emailInput'
                        type='email'
                        placeholder='Email'
                        id='email'
                        value={email}
                        onChange={onChange}
                    />

                    <div className='passwordInputDiv'>
                        <input
                            className='passwordInput'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            id='password'
                            value={password}
                            onChange={onChange}
                        />

                        <img
                            src={visibilityIcon}
                            alt='show password'
                            className='showPassword'
                            onClick={() => setShowPassword((prevState) => !prevState)}
                        />

                    </div>

                    <Link to="/forgot-password" className='forgotPasswordLink'  >
                        Forgot Password
                    </Link>

                    <div className='signUpBar'>
                        <p className='signUpText'>
                            Sing Up
                        </p>

                        <button className='signUpButton'>
                            <ArrowRightIcon fill='#fff' width='34px' height='34px' />
                        </button>

                    </div>

                </form>

                <Link to='/sing-in' className='registerLink'>
                    Sign In Instead
                </Link>

                <OAuth />

            </div>
        </>
    );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';


export const SingIn = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    let navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();

            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            toast.error('Bad user Credentials', {
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

                    <div className='signInBar'>
                        <p className='signInText'>
                            Sing In
                        </p>

                        <button className='signInButton'>
                            <ArrowRightIcon fill='#fff' width='34px' height='34px' />
                        </button>

                    </div>

                </form>

                {/* Google OAuth Component */}

                <Link to='/sing-up' className='registerLink'>
                    Sign Up Instead
                </Link>

            </div>
        </>
    );
};

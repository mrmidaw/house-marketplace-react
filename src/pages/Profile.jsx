import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from '@firebase/firestore';
import { db } from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ListingItem } from '../components/ListingItem';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';

export const Profile = () => {
    const auth = getAuth();
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const [changeDetails, setChangeDetails] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });

    const { name, email } = formData;

    const navigate = useNavigate();

    useEffect(() => {

        const fetchUserListings = async () => {
            const listingRef = collection(db, 'listings');

            const q = query(listingRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'));

            const querySnap = await getDocs(q);

            let listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            });

            setListings(listings);
            setLoading(false);
        };

        fetchUserListings();
    }, [auth.currentUser.uid]);

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                // Update display name in fb
                await updateProfile(auth.currentUser, {
                    displayName: name
                })

                // Update in firestore
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                    name: name
                });
            }
        } catch (error) {
            toast.error('Could not update profile details', {
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
            [e.target.id]: e.target.value,
        }))
    }

    const onDelete = async (listingId) => {
        if (window.confirm('Are you sure want to delete?')) {
            await deleteDoc(doc(db, 'listings', listingId));
            const updatedListings = listings.filter((listing) => listing.id !== listingId)
            setListings(updatedListings);
            toast.success('Successfully deleted listing!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        };
    };

    const onEdit = (listingId) => {
        navigate(`/edit-listing/${listingId}`)
    };

    const onLogout = () => {
        auth.signOut();
        navigate('/sing-in');
    };




    return (
        <div className='profile'>

            <header className='profileHeader'>
                <p className='pageHeader'>
                    My Profile
                </p>
                <button type="button" className='logOut' onClick={onLogout}>
                    Logout
                </button>
            </header>

            <main>
                <div className='profileDetailsHeader'>
                    <p className='profileDetailText'>
                        Personal Details
                    </p>
                    <p className='changePersonalDetails' onClick={() => {
                        changeDetails && onSubmit()
                        setChangeDetails((prevState) => !prevState)
                    }}>
                        {changeDetails ? 'done' : 'change'}
                    </p>
                </div>

                <div className='profileCard'>
                    <form>
                        <input
                            type='text'
                            id='name'
                            className={!changeDetails ? 'profileName' : 'profileNameActive'}
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChange}
                        />
                        <input
                            type='text'
                            id='email'
                            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                            disabled={!changeDetails}
                            value={email}
                            onChange={onChange}
                        />
                    </form>
                </div>

                <Link to='/create-listing' className='createListing' >
                    <img src={homeIcon} alt='home' />
                    <p>Sell or rent your home</p>
                    <img src={arrowRight} alt='arrow right' />
                </Link>

                {!loading && listings?.length > 0 && (
                    <>
                        <p className='listingText'>
                            Your Listings
                        </p>

                        <ul className='listingsList'>
                            {listings.map((listing) => (
                                <ListingItem
                                    key={listing.id}
                                    listing={listing.data}
                                    id={listing.id}
                                    onDelete={() => onDelete(listing.id)}
                                    onEdit={() => onEdit(listing.id)}
                                />
                            ))}
                        </ul>
                    </>
                )}
            </main>
        </div >
    );
};

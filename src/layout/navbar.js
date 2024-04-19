import React, { useEffect, useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {

    const navigate = useNavigate();
    const { userId, setUserId, jwToken, setJwToken, setUserName, userName } = useUserContext();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {

        if (userId !== "" && userId !== null) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [userId]);

    const handleProfileClick = () => {

        if (jwToken) {

            navigate(`/profile/${userId}`);
        }
    };

    const handleApartmantsClick = () => {

        if (jwToken) {

            navigate(`/apartmants/${userId}`);
        }
    };

    const handleReservationsClick = () => {

        if (jwToken) {

            navigate(`/reservations/${userId}`);
        } else {

        }
    };
    const handleReviewssClick = () => {

        if (jwToken) {

            navigate(`/reviews/${userId}`);
        } else {

        }
    };

    const handleHomeClick = () => {

        navigate(`/`);

    };
    const handleLogOutClick = () => {
        setLoggedIn(false);
        setUserId("");
        setJwToken("");
        setUserName("");
        navigate(`/`);

    };

    const handleLogInClick = () => {
        setLoggedIn(true);
        navigate(`/registration-login`);

    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav">
                            <button className="btn btn-outline-light " style={{ marginLeft: '1vw' }} onClick={handleHomeClick}>Balatoni Szállás</button>
                            {loggedIn && (
                                <>
                                    <button className="btn btn-outline-light " style={{ marginLeft: '1vw' }} onClick={handleProfileClick}>Profil</button>
                                    <button className="btn btn-outline-light " style={{ marginLeft: '1vw' }} onClick={handleReservationsClick}>Foglalások</button>
                                    <button className="btn btn-outline-light " style={{ marginLeft: '1vw' }} onClick={handleApartmantsClick}>Apartmanjaim</button>
                                    <button className="btn btn-outline-light " style={{ marginLeft: '1vw' }} onClick={handleReviewssClick}>Értékeléseim</button>
                                </>
                            )}
                        </div>
                        <div className="navbar-nav ms-auto">
                            {loggedIn ? (
                                <>
                                    <label className="text-white bg-transparent " style={{ display: 'flex', alignItems: 'center', marginLeft: '1vw' }}>Üdvözlünk: {userName}</label>
                                    <button className="btn btn-outline-light " style={{ marginLeft: '1vw' }} onClick={handleLogOutClick}>Kijelentkezés</button>
                                </>
                            ) : (
                                <button className="btn btn-outline-light " style={{ marginLeft: '1vw' }} onClick={handleLogInClick}>Bejelentkezés / Regisztráció</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );

}

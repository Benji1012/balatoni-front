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
            <nav className="navbar  navbar-dark bg-primary">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div>
                        <button className="btn btn-outline-light" style={{ marginRight: "10px" }} onClick={handleHomeClick}>Balatoni Szállás</button>
                        {loggedIn && (
                            <>
                                <button className="btn btn-outline-light " style={{ marginRight: "10px" }} onClick={handleProfileClick}>Profil</button>
                                <button className="btn btn-outline-light " style={{ marginRight: "10px" }} onClick={handleReservationsClick}>Foglalások</button>
                                <button className="btn btn-outline-light " style={{ marginRight: "10px" }} onClick={handleApartmantsClick}>Apartmanjaim</button>
                            </>
                        )}
                    </div>
                    <div>
                        {loggedIn ? (
                            <>
                                <label className="text-white bg-transparent" style={{ marginRight: "10px" }}>Üdvözlünk: {userName}</label>
                                <button className="btn btn-outline-light" onClick={handleLogOutClick}>Kijelentkezés</button>
                            </>
                        ) : (
                            <button className="btn btn-outline-light" onClick={handleLogInClick}>Bejelentkezés / Regisztráció</button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

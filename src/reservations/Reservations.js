import React, { useState, useEffect } from 'react';
import { Link, useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import '../customStyles/addApartman.css';

const Reservations = () => {
    const navigate = useNavigate();
    const { userId, jwToken } = useUserContext();
    const [reservations, setReservations] = useState([]);

    const [error, setError] = useState('');

    useEffect(() => {
        const token = jwToken;

        if (userId) {
            fetch(`http://192.168.1.65:8080/api/reservations/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {

                    setReservations(data);

                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                    setError('Önnek még nincs foglalása');

                });
        } else {
            setError('Önnek nincs joga az adott felhasználó apartmanjainak megtekintésére');

        }
    }, [userId, jwToken]);

    const handleNewButton = () => {
        navigate("/newapartmant");
    };

    const handleViewReservation = (reservationId, apartmentId, rentingFrom, rentingTo) => {
        navigate(`/adWiewApartman2/${reservationId}/${apartmentId}/${rentingFrom}/${rentingTo}`);
    };

    return (
        <div style={{ background: "#ADD8E6", padding: "20px" }}>
            {userId && (
                <div>
                    <h1>Foglalásaid</h1>
                    {error ? (
                        <div>
                            <div>Nem található foglalás</div>
                        </div>
                    ) : (
                        <div>
                            {reservations.length === 0 ? (
                                <p>Nem található foglalás</p>
                            ) : (
                                <div className="review-cards">
                                    {reservations.map(reservation => (
                                        <div className="review-card" key={reservation.reservationId}>
                                            <p >
                                                <div>{reservation.apartmanName}</div>
                                                <div>{reservation.resFrom} - {reservation.resTo}</div>
                                            </p>
                                            <button className="btn btn-primary" onClick={() => handleViewReservation(reservation.reservationId, reservation.apartman.apartmanId, reservation.resFrom, reservation.resTo)}>Szállás megtekintése</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Reservations;

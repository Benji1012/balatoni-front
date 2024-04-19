import React, { useState, useEffect } from 'react';
import { Link, useUserContext } from '../contexts/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

const ApartmanReservations = () => {
    const navigate = useNavigate();
    const { userId, jwToken } = useUserContext();
    const [reservations, setReservations] = useState([]);
    const { apartmentId } = useParams();

    const [error, setError] = useState('');

    useEffect(() => {
        const token = jwToken;

        if (userId) {
            fetch(`http://192.168.1.65:8080/api/reservations/apartman/${apartmentId}`, {
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

    const handleCancel = () => {
        navigate(`/viewApartman/${apartmentId}`);
    };


    return (
        <div style={{ background: "#ADD8E6", padding: "20px" }}>
            {userId && (
                <div>
                    <h1>Foglalások</h1>
                    {error ? (
                        <div>

                            <div>Nem található foglalás</div>
                        </div>
                    ) : (<div>
                        {reservations.length === 0 ? (
                            <div>
                                <p>Nem található foglalás</p>

                            </div>
                        ) : (
                            <div className="review-cards">
                                {reservations.map(reservations => (
                                    <div className="review-card" key={reservations.reservationId}>
                                        <div>{reservations.apartmanName}</div>
                                        <div>{reservations.resFrom} - {reservations.resTo}</div>
                                        <div>{reservations.numberofNights} éj</div>
                                        <div>{reservations.price} Ft</div>
                                    </div>
                                ))}
                            </div>

                        )}
                        <br></br>
                        <button className="btn btn-primary" onClick={handleCancel}>Vissza</button>

                    </div>)}
                </div>
            )}

        </div>
    );
};

export default ApartmanReservations;

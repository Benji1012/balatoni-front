import React, { useState, useEffect } from 'react';
import { Link, useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Apartmans = () => {
    const navigate = useNavigate();
    const { userId, jwToken } = useUserContext();
    const [apartments, setApartments] = useState([]);

    const [error, setError] = useState('');

    useEffect(() => {
        const token = jwToken;

        if (userId) {
            fetch(`http://192.168.1.65:8080/api/apartments/${userId}`, {
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
                    setApartments(data);

                })
                .catch(error => {
                    setError('Önnek még nincs felvéve apartmanja');

                });
        } else {
            setError('Önnek nincs joga az adott felhasználó apartmanjainak megtekintésére');

        }
    }, [userId, jwToken]);

    const handleNewButton = () => {
        navigate("/newapartmant");
    };

    const handleViewApartman = (apartmentId) => {
        navigate(`/viewApartman/${apartmentId}`);
    };

    return (
        <div style={{ background: "#ADD8E6", padding: "20px" }}>
            {userId && (
                <div>
                    <h1>Saját szállások</h1>
                    {error ? (
                        <div>

                            <div>Nem található felvett szállás</div>
                            <button className="btn btn-primary" onClick={handleNewButton}>Új szállás</button>
                        </div>
                    ) : (<div>
                        {apartments.length === 0 ? (
                            <p>Nem található saját szállás</p>
                        ) : (
                            <div className="review-cards">
                                {apartments.map(apartment => (
                                    <div className="review-card" key={apartment.apartmanId}>
                                        <p> {apartment.name}</p>
                                        <button className="btn btn-primary" onClick={() => handleViewApartman(apartment.apartmanId)}>Szállás megtekintése</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <br></br>
                        <button className="btn btn-primary" onClick={handleNewButton}>Új apartman</button>
                    </div>)}
                </div>
            )}

        </div>
    );
};

export default Apartmans;

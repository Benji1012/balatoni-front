import React, { useState, useEffect } from 'react';
import { Link, useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import '../customStyles/addApartman.css';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
    const navigate = useNavigate();
    const { userId, jwToken } = useUserContext();
    const [reviews, setReviews] = useState([]);

    const [error, setError] = useState('');

    useEffect(() => {
        const token = jwToken;

        if (userId) {
            fetch(`http://192.168.1.65:8080/api/reviews/user/${userId}`, {
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

                    setReviews(data);

                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                    setError('Önnek még nincs értékelése');

                });
        } else {


        }
    }, [userId, jwToken]);



    const handleViewReview = (reviewId) => {
        navigate(`/viewReview/${reviewId}`);
    };
    const handleViewApartman = (apartmentId) => {
        console.log("Mennyi??", apartmentId);
        navigate(`/adWiewApartman3/${apartmentId}`);

    };
    const handleDeleteReview = (reviewId) => {
        const token = jwToken;

        if (userId) {
            fetch(`http://192.168.1.65:8080/api/reviews/delete/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    navigate(`/reviews/${userId}`);
                })

                .catch(error => {
                    console.error('Error fetching user details:', error);

                });
        } else {


        }
    };


    return (
        <div style={{ background: "#ADD8E6", padding: "20px" }}>
            {userId && (
                <div>
                    <h1>Értékeléseim</h1>
                    {error ? (
                        <div>
                            <div>Nem található értékelés</div>
                        </div>
                    ) : (
                        <div>
                            {reviews.length === 0 ? (
                                <p>Nem található értékelés</p>
                            ) : (
                                <div className="review-cards">
                                    {reviews.map(review => (
                                        <div className="review-card" key={review.reviewId}>
                                            <p >
                                                {Array.from({ length: review.reviewPoint }, (_, index) => (
                                                    <FaStar key={index} />

                                                ))}
                                                <div>{review.reviewComment}</div>

                                            </p>
                                            <button className="btn btn-primary" style={{ marginBottom: '1vw' }} onClick={() => handleViewReview(review.reviewId)}>Értékelés módisítása</button>
                                            <br></br>
                                            <button className="btn btn-primary" style={{ marginBottom: '1vw' }} onClick={() => handleDeleteReview(review.reviewId)}>Értékelés tölrése</button>
                                            <br></br>
                                            <button className="btn btn-primary" style={{ marginBottom: '1vw' }} onClick={() => handleViewApartman(review.apartmanId)}>Szállás megtekintése</button>
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

export default Reviews;

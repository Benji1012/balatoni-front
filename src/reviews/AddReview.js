import React, { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

const AddReview = () => {
    const navigate = useNavigate();
    const { userId, jwToken } = useUserContext();
    const { apartmentId } = useParams();

    const [points, setPoints] = useState(1);
    const [comment, setComment] = useState("");

    const handleReview = () => {
        const requestBody = {
            "apartmanId": apartmentId,
            "userId": userId,
            "reviewComment": comment,
            "reviewPoint": points
        }

        fetch(`http://192.168.1.65:8080/api/reviews/new`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${jwToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then(data => {
                navigate(`/reservations/${userId}`);

            })
            .catch(error => {



            });
    };




    return (
        <div style={{ background: "#ADD8E6" }}>
            {userId && (
                <div style={{ marginLeft: "5px" }}>
                    <p>Pont (maximum 5):</p>
                    <input type='number' min={1} max={5} value={points}
                        onChange={(e) => setPoints(e.target.value)}></input>
                    <br></br>
                    <p>Szöveges értékelés:</p>

                    <textarea rows="6" cols="50" value={comment}
                        onChange={(e) => setComment(e.target.value)}></textarea>
                    <br></br>
                    <button className="btn btn-primary" onClick={() => handleReview()}>Küldés</button>
                </div>
            )}

        </div>
    );
};

export default AddReview;

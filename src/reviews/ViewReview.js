import React, { useState, useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

const ViewReview = () => {
    const navigate = useNavigate();
    const { userId, jwToken } = useUserContext();
    const { reviewId } = useParams();
    const [points, setPoints] = useState(1);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const token = jwToken;

        if (reviewId) {
            fetch(`http://localhost:8080/api/reviews/view/one/${reviewId}`, {
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


                    setPoints(data.reviewPoint);
                    setComment(data.reviewComment)

                })
                .catch(error => {



                });
        } else {


        }
    }, [userId, jwToken]);



    const handleReview = () => {
        const requestBody = {

            "reviewComment": comment,
            "reviewPoint": points
        }

        fetch(`http://localhost:8080/api/reviews/edit/${reviewId}`, {
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
                navigate(`/reviews/${userId}`);

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

export default ViewReview;

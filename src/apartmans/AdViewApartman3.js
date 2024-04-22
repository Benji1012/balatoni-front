import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import '../customStyles/addApartman.css';

import { FaStar } from 'react-icons/fa';

const AdViewApartman3 = () => {
    const { apartmentId } = useParams();
    const { userId, jwToken } = useUserContext();
    const navigate = useNavigate();
    const [apartmanData, setApartmanData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [reviewData, setReviewData] = useState(null);

    useState(() => {
        console.log("Mennyi itt is? ", apartmentId);
        fetch(`http://localhost:8080/api/apartments/adview/${apartmentId}`, {
            method: 'GET',
            headers: {
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
                setApartmanData(data);
                setLoading(false);


            })
            .catch(error => {


            });

        fetch(`http://localhost:8080/api/reviews/view/${apartmentId}`, {
            method: 'GET',
            headers: {
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

                setReviewData(data);

            })
            .catch(error => {
                console.error('Error fetching user details:', error);


            });

    });


    useState(() => {

        fetch(`http://localhost:8080/api/apartments/adview/${apartmentId}`, {
            method: 'GET',
            headers: {
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

                setApartmanData(data);
                setLoading(false);


            })
            .catch(error => {
                console.error('Error fetching user details:', error);


            });

    });


    if (loading) {
        return <div>Betöltés...</div>;
    }

    return (
        <div >

            <div className="apartment-container">
                <div className="apartment-details">
                    <b>Alap adatok</b>
                    <br></br>
                    Név: {apartmanData.name}
                    <br></br>
                    Város: {apartmanData.city}
                    <br></br>
                    Ár éjszakánként: {apartmanData.price} Ft
                    <br></br>
                    Cím: {apartmanData.address}
                    <br></br>
                    Szállás típusa {(apartmanData.type == 0 ? "Apartman" : (apartmanData.type == 1 ? "Hotel" : (apartmanData.type == 2 ? "Vendégház" : "Panzió")))}
                    <br></br>
                    Csillag: {apartmanData.stars}
                    <br></br>
                    Parkolóhelyek száma: {apartmanData.parkingSlots} db
                    <br></br>
                    Maximális emberek száma: {apartmanData.numberOfPeople} fő
                    <br></br>
                    Szobák száma: {apartmanData.numberOfRooms} db
                    <br></br>
                    Ágyak száma: {apartmanData.numberOfBeds} db
                    <br></br>
                    {apartmanData.isPartside && (
                        <span>
                            Part menti
                            <br />
                        </span>
                    )}
                    {apartmanData.isFood && (
                        <span>
                            Teljes étkeztetés
                            <br />
                        </span>
                    )}
                    {apartmanData.isAnimalFriendly && (
                        <span>
                            Állatbarát
                            <br />
                        </span>
                    )}
                    {apartmanData.isKidFriendly && (
                        <span>
                            Gyerekbarát
                            <br />
                        </span>
                    )}
                    {apartmanData.isUniversallyAccessable && (
                        <span>
                            Akadálymentesített
                            <br />
                        </span>
                    )}
                    {apartmanData.isSeperate && (
                        <span>
                            Különálló szállás
                            <br />
                        </span>
                    )}
                    {apartmanData.isOwnerLivesThere && (
                        <span>
                            Tulaj ott él
                            <br />
                        </span>
                    )}
                    {apartmanData.isNorth ? (
                        <span>
                            Északi part
                            <br />
                        </span>
                    ) : (
                        <span>
                            Déli part
                            <br />
                        </span>
                    )}

                    {apartmanData.description && (
                        <span>
                            Leírás: {apartmanData.description}
                            <br />
                        </span>
                    )}

                </div>
                <div className="column">
                    <b>Elérhetőségek</b>
                    <br />
                    {apartmanData.mobile && (
                        <span>
                            Telefonszám: {apartmanData.mobile}
                            <br />
                        </span>
                    )}
                    {apartmanData.email && (
                        <span>
                            Email cím: {apartmanData.email}
                            <br />
                        </span>
                    )}
                    {apartmanData.website && (
                        <span>
                            Weboldal: {apartmanData.website}
                            <br />
                        </span>
                    )}
                    <b>Beszélt nyelvek:</b>
                    <br></br>
                    {apartmanData.isHungarian && (
                        <span>
                            Magyar
                            <br />
                        </span>
                    )}
                    {apartmanData.isEnglisch && (
                        <span>
                            Angol
                            <br />
                        </span>
                    )}
                    {apartmanData.usGerman && (
                        <span>
                            Német
                            <br />
                        </span>
                    )}
                    <b>Felszereltség / programok</b>
                    <br></br>
                    {apartmanData.isFreeWifi && (
                        <span>
                            Ingyenes WIFI
                            <br />
                        </span>
                    )}
                    {apartmanData.isAirCondition && (
                        <span>
                            Légkondicionálóval rendelkező
                            <br />
                        </span>
                    )}
                    {apartmanData.isSauna && (
                        <span>
                            Szaunával rendelkező
                            <br />
                        </span>
                    )}
                    {apartmanData.isPool && (
                        <span>
                            Medencével rendelkező
                            <br />
                        </span>
                    )}
                    {apartmanData.isTrambulin && (
                        <span>
                            Trambulinnal rendelkező
                            <br />
                        </span>
                    )}
                    {apartmanData.isPier && (
                        <span>
                            Mólóval rendelkező
                            <br />
                        </span>
                    )}
                    {apartmanData.isTabbleTennis && (
                        <span>
                            Ping pong lehetőség
                            <br />
                        </span>
                    )}
                    {apartmanData.isBilliard && (
                        <span>
                            Billiárd lehetőség
                            <br />
                        </span>
                    )}
                    {apartmanData.isTennis && (
                        <span>
                            Tenisz lehetőség
                            <br />
                        </span>
                    )}
                    {apartmanData.isJacuzzi && (
                        <span>
                            Jacuzzival rendelkező
                            <br />
                        </span>
                    )}
                    {apartmanData.isMassage && (
                        <span>
                            Masszás lehetőség
                            <br />
                        </span>
                    )}
                    {apartmanData.isPlayground && (
                        <span>
                            Játszótérrel rendelkező
                            <br />
                        </span>
                    )}
                    {apartmanData.isSmoking && (
                        <span>
                            Dohányzóbarát
                            <br />
                        </span>
                    )}
                    {apartmanData.isHorseRiding && (
                        <span>
                            Lovaglási lehetőség
                            <br />
                        </span>
                    )}
                    {apartmanData.isSurf && (
                        <span>
                            Szörfölési lehetőség
                            <br />
                        </span>
                    )}

                    {apartmanData.isFishing && (
                        <span>
                            Horgászati lehetőség
                            <br />
                        </span>
                    )}
                    {apartmanData.isBar && (
                        <span>
                            Bárral rendelkező
                            <br />
                        </span>
                    )}
                </div>
                <div className="column">
                    <b>Távolságok</b>
                    <br />
                    {apartmanData.nameSightseeingProgram1 > 0 && (
                        <span>
                            {apartmanData.nameSightseeingProgram1 + ": " + apartmanData.distSightseeingProgram1} km
                            <br />
                        </span>
                    )}
                    {apartmanData.nameSightseeingProgram2 > 0 && (
                        <span>
                            {apartmanData.nameSightseeingProgram2 + ": " + apartmanData.distSightseeingProgram2} km
                            <br />
                        </span>
                    )}
                    {apartmanData.nameSightseeingProgram3 > 0 && (
                        <span>
                            {apartmanData.nameSightseeingProgram3 + ": " + apartmanData.distSightseeingProgram3} km
                            <br />
                        </span>
                    )}
                    {apartmanData.distBalaton > 0 && (
                        <span>
                            Balaton: {apartmanData.distBalaton} km
                            <br></br>
                        </span>
                    )}
                    {apartmanData.distBudapest > 0 && (
                        <span>
                            Budapest: {apartmanData.distBudapest} km
                            <br />
                        </span>
                    )}
                    {apartmanData.distBus > 0 && (
                        <span>
                            Legközelebbi buszmegálló: {apartmanData.distBus} km
                            <br />
                        </span>
                    )}
                    {apartmanData.distCitycenter > 0 && (
                        <span>
                            Városközpont: {apartmanData.distCitycenter} km
                            <br />
                        </span>
                    )}
                    {apartmanData.distGym > 0 && (
                        <span>
                            Legközelebbi edzőterem: {apartmanData.distGym} km
                            <br />
                        </span>
                    )}
                    {apartmanData.distHypermarker > 0 && (
                        <span>
                            Legközelebbi bolt: {apartmanData.distHypermarker} km
                            <br />
                        </span>
                    )}
                    {apartmanData.distPub > 0 && (
                        <span>
                            Legközelebbi bár: {apartmanData.distPub} km
                            <br />
                        </span>
                    )}
                    {apartmanData.distRail > 0 && (
                        <span>
                            Vasútállomás: {apartmanData.distRail} km
                            <br />
                        </span>
                    )}
                    {apartmanData.distRestaurant > 0 && (
                        <span>
                            Legközelebbi étterem: {apartmanData.distRestaurant} km
                            <br />
                        </span>
                    )}
                    {apartmanData.reviewPoints > 0 && (
                        <span>
                            Értékelés: {apartmanData.reviewPoints}
                            <br />
                        </span>
                    )}

                </div>

            </div>

            <div className="image-gallery">
                {[...Array(10)].map((_, index) => (
                    apartmanData[`image${index + 1}`] && (
                        <div key={index} style={{ margin: '5px' }}>
                            <img
                                key={index}
                                src={apartmanData[`image${index + 1}`]}
                                alt={`Image ${index + 1}`}
                                style={{ maxWidth: '500px', maxHeight: '500px' }}
                            />
                        </div>
                    )
                ))}
            </div>
            <div className="reviews-section">
                {reviewData ? (
                    <>
                        <div className="review-cards">
                            {reviewData.map(review => (
                                <div className="review-card" key={review.reviewId}>
                                    <p>{review.reviewComment}</p>
                                    <div>
                                        {Array.from({ length: review.reviewPoint }, (_, index) => (
                                            <FaStar key={index} />

                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Még nem érkezett értékelés a szálláshoz</p>
                )}
            </div>
        </div>
    );
};

export default AdViewApartman3;
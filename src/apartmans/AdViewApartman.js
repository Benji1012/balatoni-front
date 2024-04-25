import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import '../customStyles/addApartman.css';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';
import '../customStyles/viewUser.css';



const AdViewApartman = () => {
    const { apartmentId, rentingFrom, rentingTo } = useParams();
    const { userId, jwToken } = useUserContext();
    const navigate = useNavigate();
    const [apartmanData, setApartmanData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [loading, setLoading] = useState(true);
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const rentingFromDate = new Date(rentingFrom);
    const rentingToDate = new Date(rentingTo);
    const diffInMilliseconds = Math.abs(rentingToDate - rentingFromDate);

    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {

        subtitle.style.color = '#000';
    }

    function closeModal() {
        setIsOpen(false);
    }



    useEffect(() => {

        fetch(`http://192.168.1.65:8080/api/apartments/adview/${apartmentId}`, {
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

                setApartmanData(data)
                setLoading(false);


            })
            .catch(error => {
                console.error('Error fetching user details:', error);


            });

        fetch(`http://192.168.1.65:8080/api/reviews/view/${apartmentId}`, {
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

    }, [apartmentId]);


    const handleReservation = () => {
        if (userId) {


            const requestBody = {
                "userId": userId,
                "apartmanName": apartmanData.name,
                "apartman": {
                    "apartmanId": apartmanData.apartmanId,
                },
                "numberofNights": diffInDays,
                "price": diffInDays * apartmanData.price,
                "resFrom": rentingFrom,
                "resTo": rentingTo

            };

            fetch(`http://192.168.1.65:8080/api/reservations/new`, {
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
                    navigate('/');

                })
                .catch(error => {

                });
        } else {

        }
    };

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
                    {apartmanData.reviewPoints > 0 && (
                        <span>
                            Értékelés: {apartmanData.reviewPoints}
                            <br />
                        </span>
                    )}
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
                    <p><b>Kiválasztott időpont</b></p>
                    {rentingFrom} -  {rentingTo}
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
                    {apartmanData.nameSightseeingProgram1 != "" && (
                        <span>
                            {apartmanData.nameSightseeingProgram1 + ": " + apartmanData.distSightseeingProgram1} km
                            <br />
                        </span>
                    )}
                    {apartmanData.nameSightseeingProgram2 != "" && (
                        <span>
                            {apartmanData.nameSightseeingProgram2 + ": " + apartmanData.distSightseeingProgram2} km
                            <br />
                        </span>
                    )}
                    {apartmanData.nameSightseeingProgram3 != "" && (
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
                </div>
                <div></div>
                {userId ? (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>



                            <div>
                                <button onClick={openModal} className="btn btn-primary" >Foglalás részletei</button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={{
                                        content: {
                                            width: '50%',
                                            margin: 'auto',
                                            height: '60%',
                                            padding: '25px',
                                            backgroundColor: '#ADD8E6',
                                            borderRadius: '10px'
                                        },
                                    }}


                                ><div className="user-details" >
                                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Foglalás részletei</h2>

                                        <div><b>Kiválasztott időpont</b><br />
                                            {rentingFrom} -  {rentingTo}<br />
                                            <b>Éjszakák száma</b><br />
                                            {diffInDays}<br />
                                            <b>Teljes ár</b><br />
                                            {diffInDays * apartmanData.price} Ft<br />

                                        </div>



                                        <div style={{ marginTop: '20px' }}>
                                            <button onClick={handleReservation} className="btn btn-primary" style={{ marginRight: '2vw' }}>Foglalás</button>
                                            <button onClick={closeModal} className="btn btn-primary">Bezárás</button>
                                        </div>
                                    </div>

                                </Modal>
                            </div>

                        </div>

                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <span>
                            Szállás foglalásáshoz kérem jelentkezzen be
                        </span>
                    </div>
                )}

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
                        <h1>Értékelések:</h1>
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


        </div >
    );

};

export default AdViewApartman;


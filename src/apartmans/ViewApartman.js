import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import '../customStyles/addApartman.css';




const ViewApartman = () => {
    const { apartmentId } = useParams();
    const { userId, jwToken } = useUserContext();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');


    const [stars, setStars] = useState(0);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [numberOfBeds, setNumberOfBeds] = useState(0);
    const [parkingSlots, setParkingSlots] = useState(0);
    const [description, setDescription] = useState('');
    const [isPartside, setIsPartside] = useState(false);
    const [isFood, setIsFood] = useState(false);
    const [isAnimalFriendly, setIsAnimalFriendly] = useState(false);
    const [isSauna, setIsSauna] = useState(false);
    const [isPool, setIsPool] = useState(false);

    const [isTrambulin, setIsTrambulin] = useState(false);
    const [isPier, setIsPier] = useState(false);
    const [isTabbleTennis, setIsTabbleTennis] = useState(false);
    const [isBilliard, setIsBilliard] = useState(false);
    const [isTennis, setIsTennis] = useState(false);
    const [isFreeWifi, setIsFreeWifi] = useState(false);
    const [isAirCondition, setIsAirCondition] = useState(false);
    const [isJacuzzi, setIsJacuzzi] = useState(false);
    const [isMassage, setIsMassage] = useState(false);
    const [isKidFriendly, setIsKidFriendly] = useState(false);
    const [isPlayGround, setIsPlayGround] = useState(false);
    const [isUniversallyAccessable, setIsUniversallyAccessable] = useState(false);
    const [isSmoking, setIsSmoking] = useState(false);
    const [isHungarian, setIsHungarian] = useState(false);
    const [isEnglisch, setIsEnglisch] = useState(false);
    const [isGerman, setIsGerman] = useState(false);

    const [isHorseRiding, setIsHorseRiding] = useState(false);
    const [isSurf, setIsSurf] = useState(false);
    const [isBar, setIsBar] = useState(false);
    const [isSeperate, setIsSeperate] = useState(false);
    const [isOwnerLivesThere, setIsOwnerLivesThere] = useState(false);
    const [isNoKid, setIsNoKid] = useState(false);
    const [isNorth, setIsNorth] = useState(false);
    const [isFishing, setIsFishing] = useState(false);
    const [distBalaton, setDistBalaton] = useState(0);
    const [distRail, setDistRail] = useState(0);
    const [distBus, setDistBus] = useState(0);
    const [distRestaurant, setDistRestaurant] = useState(0);
    const [distCityCenter, setDistCityCenter] = useState(0);
    const [distBudapest, setDistBudapest] = useState(0);
    const [distSportOpportunity, setDistSportOpportunity] = useState(0);
    const [distPub, setDistPub] = useState(0);
    const [distGym, setDistGym] = useState(0);
    const [distHypermarket, setDistHypermarket] = useState(0);
    const [distSightseeingProgram1, setDistSightseeingProgram1] = useState(0);
    const [distSightseeingProgram2, setDistSightseeingProgram2] = useState(0);
    const [distSightseeingProgram3, setDistSightseeingProgram3] = useState(0);
    const [nameSightseeingProgram1, setNameSightseeingProgram1] = useState('');
    const [nameSightseeingProgram2, setNameSightseeingProgram2] = useState('');
    const [nameSightseeingProgram3, setNameSightseeingProgram3] = useState('');
    const today = new Date();
    const defaultDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const [rentingFrom, setRentingFrom] = useState(defaultDate);
    const [rentingTo, setRentingTo] = useState(defaultDate);
    const [editable, setEditable] = useState(false);
    const [apartmanData, setApartmanData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageFiles, setImageFiles] = useState([]);
    const [imgUrl1, setImgUrl1] = useState("");
    const [imgUrl2, setImgUrl2] = useState("");
    const [imgUrl3, setImgUrl3] = useState("");
    const [imgUrl4, setImgUrl4] = useState("");
    const [imgUrl5, setImgUrl5] = useState("");
    const [imgUrl6, setImgUrl6] = useState("");
    const [imgUrl7, setImgUrl7] = useState("");
    const [imgUrl8, setImgUrl8] = useState("");
    const [imgUrl9, setImgUrl9] = useState("");
    const [imgUrl10, setImgUrl10] = useState("");
    const [imgUrlsBack, setImgUrlsback] = useState(false);
    const [newImages, setNewImages] = useState([]);
    const [oldImages] = useState([]);
    const [price, setPrice] = useState(0);



    useEffect(() => {
        const token = jwToken;

        if (userId) {
            fetch(`http://192.168.1.65:8080/api/apartments/view/${apartmentId}`, {
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

                    setApartmanData(data);
                    setLoading(false);


                })
                .catch(error => {
                    console.error('Error fetching user details:', error);


                });
        }
    }, [userId, jwToken]);


    const [images, setImages] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
        image6: null,
        image7: null,
        image8: null,
        image9: null,
        image10: null,
    });

    const handleSubmit = () => {


        const formData = new FormData();

        imageFiles.forEach((image, index) => {

            if (image != null && image instanceof Blob) {
                formData.append(`image${index + 1}`, image);
            }
        });

        fetch('http://192.168.1.65:8080/api/apartments/upload-images', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwToken}`,

            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {

                for (let i = 0; i < 10; i++) {

                    if (data[i] != null) {
                        switch (i) {
                            case 0:
                                setImgUrl1(data[0]);

                                break;
                            case 1:
                                setImgUrl2(data[i]);
                                break;
                            case 2:
                                setImgUrl3(data[i]);
                                break;
                            case 3:
                                setImgUrl4(data[i]);
                                break;
                            case 4:
                                setImgUrl5(data[i]);
                                break;
                            case 5:
                                setImgUrl6(data[i]);
                                break;
                            case 6:
                                setImgUrl7(data[i]);
                                break;
                            case 7:
                                setImgUrl8(data[i]);
                                break;
                            case 8:
                                setImgUrl9(data[i]);
                                break;
                            case 9:
                                setImgUrl10(data[i]);
                                break;
                            default:
                                break;
                        }
                    }
                }
                setImgUrlsback(true);
            })
            .catch(error => {
                console.error('Error uploading images:', error);
            });
    };


    useEffect(() => {
        if (imgUrlsBack) {
            {
                if (userId) {

                    for (let index = 0; index < 10; index++) {
                        if (/^http/i.test(newImages[index])) {
                            oldImages[index] = newImages[index];
                        }

                    }

                    const requestBody = {
                        "name": name,
                        "ownerId": userId,
                        "city": city,
                        "address": address,
                        "mobile": mobile,
                        "email": email,
                        "website": website,
                        "type": selectedType,

                        "stars": stars,
                        "parkingSlots": parkingSlots,
                        "numberOfPeople": numberOfPeople,
                        "numberOfRooms": numberOfRooms,
                        "numberOfBeds": numberOfBeds,
                        "isPartside": isPartside,
                        "isFood": isFood,
                        "isAnimalFriendly": isAnimalFriendly,
                        "isSauna": isSauna,
                        "isPool": isPool,

                        "isTrambulin": isTrambulin,
                        "isPier": isPier,
                        "isTabbleTennis": isTabbleTennis,
                        "isBilliard": isBilliard,
                        "isTennis": isTennis,
                        "isFreeWifi": isFreeWifi,
                        "isAirCondition": isAirCondition,
                        "isJacuzzi": isJacuzzi,
                        "isMassage": isMassage,
                        "isKidFriendly": isKidFriendly,
                        "isPlayGround": isPlayGround,
                        "isUniversallyAccessable": isUniversallyAccessable,
                        "isSmoking": isSmoking,
                        "isHungarian": isHungarian,
                        "isEnglisch": isEnglisch,
                        "isGerman": isGerman,

                        "isHorseRiding": isHorseRiding,
                        "isSurf": isSurf,
                        "isFishing": isFishing,
                        "isBar": isBar,
                        "isSeperate": isSeperate,
                        "isOwnerLivesThere": isOwnerLivesThere,
                        "isNoKid": isNoKid,
                        "description": description,
                        "distBalaton": distBalaton,
                        "distRail": distRail,
                        "distBus": distBus,
                        "distRestaurant": distRestaurant,
                        "distCitycenter": distCityCenter,
                        "distBudapest": distBudapest,
                        "distSportOpportunity": distSportOpportunity,
                        "distPub": distPub,
                        "distGym": distGym,
                        "distHypermarker": distHypermarket,
                        "distSightseeingProgram1": distSightseeingProgram1,
                        "distSightseeingProgram2": distSightseeingProgram2,
                        "distSightseeingProgram3": distSightseeingProgram3,
                        "nameSightseeingProgram1": nameSightseeingProgram1,
                        "nameSightseeingProgram2": nameSightseeingProgram2,
                        "nameSightseeingProgram3": nameSightseeingProgram3,
                        "rentingFrom": rentingFrom,
                        "rentingTo": rentingTo,
                        "isNorth": isNorth,
                        "image1": imgUrl1,
                        "image2": imgUrl2,
                        "image3": imgUrl3,
                        "image4": imgUrl4,
                        "image5": imgUrl5,
                        "image6": imgUrl6,
                        "image7": imgUrl7,
                        "image8": imgUrl8,
                        "image9": imgUrl9,
                        "image10": imgUrl10,
                        "price": price

                    };

                    for (let i = 1; i <= 10; i++) {
                        const currentImageUrl = requestBody[`image${i}`];
                        if (currentImageUrl === "") {

                            const oldImageIndex = oldImages.findIndex(imgUrl => imgUrl !== "");
                            if (oldImageIndex !== -1) {

                                requestBody[`image${i}`] = oldImages[oldImageIndex];

                                oldImages[oldImageIndex] = "";
                            }
                        }
                    }

                    fetch(`http://192.168.1.65:8080/api/apartments/edit/${apartmentId}`, {
                        method: 'POST',
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

                            navigate(`/apartmants/${userId}`);

                        })
                        .catch(error => {

                        });
                } else {

                }
            };
        }
    }, [imgUrlsBack]);

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const imageUrl = reader.result;
            setNewImages(prevImages => {
                const updatedImages = [...prevImages];
                updatedImages[index] = imageUrl;
                return updatedImages;
            });
        };

        reader.readAsDataURL(file);

        setImageFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index] = file;
            return updatedFiles;
        });

    };

    const [selectedType, setselectedType] = useState(0);

    const handleOptionChange = (event) => {
        setselectedType(event.target.value);
    };

    const handleCancel = () => {
        navigate(`/apartmants/${userId}`);
    };
    const handleDelete = () => {
        const token = jwToken;

        if (userId) {
            fetch(`http://192.168.1.65:8080/api/apartments/delete/${apartmentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,

                },

            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    navigate(`/apartmants/${userId}`);
                })

                .catch(error => {
                    console.error('Error deleting', error);


                });
        }
    };

    const handleReservationsView = () => {
        navigate(`/aprtmanReservations/${apartmentId}`);
    };


    const handleEdit = () => {
        setEditable(true);
        setName(apartmanData.name);
        setCity(apartmanData.city);
        setAddress(apartmanData.address);
        setMobile(apartmanData.mobile);
        setEmail(apartmanData.email);
        setWebsite(apartmanData.website);
        setselectedType(apartmanData.type);

        setStars(apartmanData.stars);
        setParkingSlots(apartmanData.parkingSlots);
        setNumberOfBeds(apartmanData.numberOfBeds);
        setNumberOfPeople(apartmanData.numberOfPeople);
        setNumberOfRooms(apartmanData.numberOfRooms);
        setIsPartside(apartmanData.isPartside);
        setIsFood(apartmanData.isFood);
        setIsAnimalFriendly(apartmanData.isAnimalFriendly);
        setIsSauna(apartmanData.isSauna);
        setIsPool(apartmanData.isPool);

        setIsTrambulin(apartmanData.isTrambulin);
        setIsPier(apartmanData.isPier);
        setIsTabbleTennis(apartmanData.isTabbleTennis);
        setIsBilliard(apartmanData.isBilliard);
        setIsTennis(apartmanData.isTennis);
        setIsFreeWifi(apartmanData.isFreeWifi);
        setIsAirCondition(apartmanData.isAirCondition);
        setIsJacuzzi(apartmanData.isJacuzzi);
        setIsMassage(apartmanData.isMassage);
        setIsKidFriendly(apartmanData.isKidFriendly);
        setIsPlayGround(apartmanData.isPlayGround);
        setIsUniversallyAccessable(apartmanData.isUniversallyAccessable);
        setIsSmoking(apartmanData.isSmoking);
        setIsHungarian(apartmanData.isHungarian);
        setIsEnglisch(apartmanData.isEnglisch);
        setIsGerman(apartmanData.isGerman);
        setIsHorseRiding(apartmanData.isHorseRiding);
        setIsSurf(apartmanData.isSurf);
        setIsFishing(apartmanData.isFishing);
        setIsBar(apartmanData.isBar);
        setIsSeperate(apartmanData.isSeperate);
        setIsOwnerLivesThere(apartmanData.isOwnerLivesThere);
        setIsNoKid(apartmanData.isNoKid);
        setDescription(apartmanData.description);
        setDistBalaton(apartmanData.distBalaton);
        setDistRail(apartmanData.distRail);
        setDistBus(apartmanData.distBus);
        setDistRestaurant(apartmanData.distRestaurant);
        setDistCityCenter(apartmanData.distCitycenter);
        setDistBudapest(apartmanData.distBudapest);

        setDistPub(apartmanData.distPub);
        setDistGym(apartmanData.distGym);
        setDistHypermarket(apartmanData.distHypermarker);
        setDistSightseeingProgram1(apartmanData.distSightseeingProgram1);
        setDistSightseeingProgram2(apartmanData.distSightseeingProgram2);
        setDistSightseeingProgram3(apartmanData.distSightseeingProgram3);
        setNameSightseeingProgram1(apartmanData.nameSightseeingProgram1);
        setNameSightseeingProgram2(apartmanData.nameSightseeingProgram2);
        setNameSightseeingProgram3(apartmanData.nameSightseeingProgram3);
        setRentingFrom(apartmanData.rentingFrom);
        setRentingTo(apartmanData.rentingTo);
        setIsNorth(apartmanData.isNorth);
        setPrice(apartmanData.price)

        for (let index = 0; index < 10; index++) {
            newImages[index] = apartmanData[`image${index + 1}`];

        }

    };

    if (loading) {
        return <div>Betöltés...</div>;
    }

    return (
        <div >
            {userId && (

                <div className="apartment-container">

                    <div className="apartment-details ">

                        <b>Alap adatok</b>
                        <br></br>
                        <input
                            type="text"
                            value={editable ? name : apartmanData.name} readOnly={!editable}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Név'
                        />



                        <input
                            type="text"
                            value={editable ? city : apartmanData.city} readOnly={!editable}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='Város'
                        />






                        <input
                            type="text"
                            value={editable ? address : apartmanData.address} readOnly={!editable}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Cím'
                        />

                        <input
                            type="number" min={0}
                            value={editable ? price : apartmanData.price} readOnly={!editable}
                            onChange={(e) => setPrice(e.target.value)} placeholder='Ár éjszakánként'
                        />

                        <label>
                            Szállás típusa
                            <br />
                            <select value={editable ? selectedType : apartmanData.type} readOnly={!editable} onChange={handleOptionChange}>

                                <option value="0">Apartman</option>
                                <option value="1">Hotel</option>
                                <option value="2">Vendégház</option>
                                <option value="3">Panzió</option>


                            </select>
                        </label>
                        <br></br>

                        Csillag


                        <br />
                        <label>
                            Parkolóhelyek száma:
                            <input
                                type="number" min={"0"}
                                value={editable ? parkingSlots : apartmanData.parkingSlots} readOnly={!editable}
                                onChange={(e) => setParkingSlots(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Maximális emberek száma:
                            <input
                                type="number" min={"1"}
                                value={editable ? numberOfPeople : apartmanData.numberOfPeople} readOnly={!editable}
                                onChange={(e) => setNumberOfPeople(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Szobák száma:
                            <input
                                type="number" min={"1"}
                                value={editable ? numberOfRooms : apartmanData.numberOfRooms} readOnly={!editable}
                                onChange={(e) => setNumberOfRooms(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Ágyak száma:
                            <input
                                type="number" min={"1"}
                                value={editable ? numberOfBeds : apartmanData.numberOfBeds} readOnly={!editable}
                                onChange={(e) => setNumberOfBeds(e.target.value)}
                            />
                        </label>
                        <br></br>

                        <p><b>Elérhetőségek</b></p>


                        <input
                            type="number"
                            value={editable ? mobile : apartmanData.mobile} readOnly={!editable}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder='Telefonszám'
                        />



                        <input
                            type="email"
                            value={editable ? email : apartmanData.email} readOnly={!editable}
                            onChange={(e) => setEmail(e.target.value)} placeholder='E-mail cím'
                        />



                        <input
                            type="text"
                            value={editable ? website : apartmanData.website} readOnly={!editable}
                            onChange={(e) => setWebsite(e.target.value)} placeholder='Weboldal'
                        />



                        <label>
                            Látványosság 1 név:

                            <input
                                type="text"
                                value={editable ? nameSightseeingProgram1 : apartmanData.nameSightseeingProgram1} readOnly={!editable}
                                onChange={(e) => setNameSightseeingProgram1(e.target.value)}
                            />
                        </label>
                        <br></br>

                        <label>
                            Látványosság 2 név:
                            <input
                                type="text"
                                value={editable ? nameSightseeingProgram2 : apartmanData.nameSightseeingProgram2} readOnly={!editable}
                                onChange={(e) => setNameSightseeingProgram2(e.target.value)}
                            />
                        </label>
                        <br></br>

                        <label>
                            Látványosság 3 név:
                            <input
                                type="text"
                                value={editable ? nameSightseeingProgram3 : apartmanData.nameSightseeingProgram3} readOnly={!editable}
                                onChange={(e) => setNameSightseeingProgram3(e.target.value)}
                            />
                        </label>



                    </div>

                    <div >


                        <b>Beszélt nyelvek</b>
                        <br></br>
                        <label>
                            Magyar
                            <input
                                type="checkbox"
                                checked={editable ? isHungarian : apartmanData.isHungarian} readOnly={!editable}
                                onChange={(e) => setIsHungarian(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Angol
                            <input
                                type="checkbox"
                                checked={editable ? isEnglisch : apartmanData.isEnglisch} readOnly={!editable}
                                onChange={(e) => setIsEnglisch(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Német
                            <input
                                type="checkbox"
                                checked={editable ? isGerman : apartmanData.isGerman} readOnly={!editable}
                                onChange={(e) => setIsGerman(e.target.checked)}
                            />
                        </label>
                        <br></br>


                        <b>Felszereltség / programok</b>
                        <br></br>
                        <label>
                            Wifi
                            <input
                                type="checkbox"
                                checked={editable ? isFreeWifi : apartmanData.isFreeWifi} readOnly={!editable}
                                onChange={(e) => setIsFreeWifi(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Légkondi
                            <input
                                type="checkbox"
                                checked={editable ? isAirCondition : apartmanData.isAirCondition} readOnly={!editable}
                                onChange={(e) => setIsAirCondition(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Szauna
                            <input
                                type="checkbox"
                                checked={editable ? isSauna : apartmanData.isSauna} readOnly={!editable}
                                onChange={(e) => setIsSauna(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Medence
                            <input
                                type="checkbox"
                                checked={editable ? isPool : apartmanData.isPool} readOnly={!editable}
                                onChange={(e) => setIsPool(e.target.checked)}
                            />
                        </label>

                        <br></br>
                        <label>
                            Trambulin
                            <input
                                type="checkbox"
                                checked={editable ? isTrambulin : apartmanData.isTrambulin} readOnly={!editable}
                                onChange={(e) => setIsTrambulin(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Móló
                            <input
                                type="checkbox"
                                checked={editable ? isPier : apartmanData.isPier} readOnly={!editable}
                                onChange={(e) => setIsPier(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Ping pong
                            <input
                                type="checkbox"
                                checked={editable ? isTabbleTennis : apartmanData.isTabbleTennis} readOnly={!editable}
                                onChange={(e) => setIsTabbleTennis(e.target.checked)}
                            />
                        </label>

                        <br></br>

                        <label>
                            Billiárd
                            <input
                                type="checkbox"
                                checked={editable ? isBilliard : apartmanData.isBilliard} readOnly={!editable}
                                onChange={(e) => setIsBilliard(e.target.checked)}
                            />
                        </label>

                        <br></br>

                        <label>
                            Tenisz
                            <input
                                type="checkbox"
                                checked={editable ? isTennis : apartmanData.isTennis} readOnly={!editable}
                                onChange={(e) => setIsTennis(e.target.checked)}
                            />
                        </label>

                        <br></br>

                        <label>
                            Jacuzzi
                            <input
                                type="checkbox"
                                checked={editable ? isJacuzzi : apartmanData.isJacuzzi} readOnly={!editable}
                                onChange={(e) => setIsJacuzzi(e.target.checked)}
                            />
                        </label>

                        <br></br>

                        <label>
                            Masszás
                            <input
                                type="checkbox"
                                checked={editable ? isMassage : apartmanData.isMassage} readOnly={!editable}
                                onChange={(e) => setIsMassage(e.target.checked)}
                            />
                        </label>

                        <br></br>



                        <label>
                            Játszótér
                            <input
                                type="checkbox"
                                checked={editable ? isPlayGround : apartmanData.isPlayground} readOnly={!editable}
                                onChange={(e) => setIsPlayGround(e.target.checked)}
                            />
                        </label>

                        <br></br>



                        <label>
                            Cigizésre kijelölt hely
                            <input
                                type="checkbox"
                                checked={editable ? isSmoking : apartmanData.isSmoking} readOnly={!editable}
                                onChange={(e) => setIsSmoking(e.target.checked)}
                            />
                        </label>

                        <br></br>

                        <label>
                            Lovaglás
                            <input
                                type="checkbox"
                                checked={editable ? isHorseRiding : apartmanData.isHorseRiding} readOnly={!editable}
                                onChange={(e) => setIsHorseRiding(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Szörf
                            <input
                                type="checkbox"
                                checked={editable ? isSurf : apartmanData.isSurf} readOnly={!editable}
                                onChange={(e) => setIsSurf(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Horgászás
                            <input
                                type="checkbox"
                                checked={editable ? isFishing : apartmanData.isFishing} readOnly={!editable}
                                onChange={(e) => setIsFishing(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Bár
                            <input
                                type="checkbox"
                                checked={editable ? isBar : apartmanData.isBar} readOnly={!editable}
                                onChange={(e) => setIsBar(e.target.checked)}
                            />
                        </label>
                        <br></br>

                        <label>
                            Part menti
                            <input
                                type="checkbox"
                                checked={editable ? isPartside : apartmanData.isPartside} readOnly={!editable}
                                onChange={(e) => setIsPartside(e.target.checked)}
                            />
                        </label>
                        <br></br>

                        <label>
                            Teljes étkeztetés
                            <input
                                type="checkbox"
                                checked={editable ? isFood : apartmanData.isFood} readOnly={!editable}
                                onChange={(e) => setIsFood(e.target.checked)}
                            />
                        </label>
                        <br></br>

                        <label>
                            Állatbarát
                            <input
                                type="checkbox"
                                checked={editable ? isAnimalFriendly : apartmanData.isAnimalFriendly} readOnly={!editable}
                                onChange={(e) => setIsAnimalFriendly(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Gyerekbarát
                            <input
                                type="checkbox"
                                checked={editable ? isKidFriendly : apartmanData.isKidFriendly} readOnly={!editable}
                                onChange={(e) => setIsKidFriendly(e.target.checked)}
                            />
                        </label>

                        <br></br>

                        <label>
                            Akadálymentesített
                            <input
                                type="checkbox"
                                checked={editable ? isUniversallyAccessable : apartmanData.isUniversallyAccessable} readOnly={!editable}
                                onChange={(e) => setIsUniversallyAccessable(e.target.checked)}
                            />
                        </label>

                        <br></br>

                        <label>
                            Különálló szállás
                            <br />
                            <input
                                type="checkbox"
                                checked={editable ? isSeperate : apartmanData.isSeperate} readOnly={!editable}
                                onChange={(e) => setIsSeperate(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Tulaj ott él
                            <input
                                type="checkbox"
                                checked={editable ? isOwnerLivesThere : apartmanData.isOwnerLivesThere} readOnly={!editable}
                                onChange={(e) => setIsOwnerLivesThere(e.target.checked)}
                            />
                        </label>
                        <br></br>

                        <label>
                            Északi part
                            <input
                                type="checkbox"
                                checked={editable ? isNorth : apartmanData.isNorth} readOnly={!editable}
                                onChange={(e) => setIsNorth(e.target.checked)}
                            />
                        </label>
                        <br></br>



                    </div>

                    <div >


                        <p><b>Távolságok (km)</b></p>

                        <label>
                            Látványosság 1:
                            <br></br>
                            <input
                                type="number" min={"0"}
                                value={editable ? distSightseeingProgram1 : apartmanData.distSightseeingProgram1} readOnly={!editable}
                                onChange={(e) => setDistSightseeingProgram1
                                    (e.target.value)}
                            />
                        </label>

                        <label>
                            Látványosság 2:
                            <br></br>
                            <input
                                type="number" min={"0"}
                                value={editable ? distSightseeingProgram2 : apartmanData.distSightseeingProgram2} readOnly={!editable}
                                onChange={(e) => setDistSightseeingProgram2(e.target.value)}
                            />
                        </label>

                        <label>
                            Látványosság 3:
                            <br></br>
                            <input
                                type="number" min={"0"}
                                value={editable ? distSightseeingProgram3 : apartmanData.distSightseeingProgram3} readOnly={!editable}
                                onChange={(e) => setDistSightseeingProgram3(e.target.value)}
                            />
                        </label>


                        <label>
                            Balaton:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={editable ? distBalaton : apartmanData.distBalaton} readOnly={!editable}
                                onChange={(e) => setDistBalaton(e.target.value)}
                            />
                        </label>

                        <label>
                            Budapest:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={editable ? distBudapest : apartmanData.distBudapest} readOnly={!editable}
                                onChange={(e) => setDistBudapest(e.target.value)}
                            />
                        </label>

                        <label>
                            Buszmegálló:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={editable ? distBus : apartmanData.distBus} readOnly={!editable}
                                onChange={(e) => setDistBus(e.target.value)}
                            />
                        </label>

                        <label>
                            Központ:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={editable ? distCityCenter : apartmanData.distCitycenter} readOnly={!editable}
                                onChange={(e) => setDistCityCenter(e.target.value)}
                            />
                        </label>

                        <label>
                            Edzőterem:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={editable ? distGym : apartmanData.distGym} readOnly={!editable}
                                onChange={(e) => setDistGym(e.target.value)}
                            />
                        </label>

                        <label>
                            Bolt:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={editable ? distHypermarket : apartmanData.distHypermarker} readOnly={!editable}
                                onChange={(e) => setDistHypermarket(e.target.value)}
                            />
                        </label>

                        <br></br>
                        <label>
                            Bár:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={editable ? distPub : apartmanData.distPub} readOnly={!editable}
                                onChange={(e) => setDistPub(e.target.value)}
                            />
                        </label>

                        <label>
                            Vonat:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={editable ? distRail : apartmanData.distRail} readOnly={!editable}
                                onChange={(e) => setDistRail(e.target.value)}
                            />
                        </label>

                        <label>
                            Étterem:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={editable ? distRestaurant : apartmanData.distRestaurant} readOnly={!editable}
                                onChange={(e) => setDistRestaurant(e.target.value)}
                            />
                        </label>




                    </div>

                </div>

            )}
            <div style={{ backgroundColor: '#ADD8E6', display: 'flex', justifyContent: 'center' }}>
                Leírás:
                <br></br>
                <label >

                    <textarea type="textarea"
                        value={editable ? description : apartmanData.description} readOnly={!editable}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="2" cols="25">
                    </textarea>
                </label>




                <label >
                    Mettől
                    <input type="date" value={editable ? rentingFrom : apartmanData.rentingFrom} readOnly={!editable} onChange={(e) => setRentingFrom(e.target.value)}></input>
                </label>
                <br></br>
                <label >
                    Meddig
                    <input type="date" value={editable ? rentingTo : apartmanData.rentingTo} readOnly={!editable} onChange={(e) => setRentingTo(e.target.value)}></input>
                </label>

            </div>
            <div style={{ backgroundColor: '#ADD8E6', display: 'flex', justifyContent: 'center' }}>
                {!editable ? (
                    <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={handleEdit}>Módosítás</button>
                ) : (<button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={handleSubmit}>Mentés</button>)}
                <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={handleCancel}>Mégsem</button>
                <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={handleDelete}>Törlés</button>
                <button className="btn btn-primary" onClick={() => handleReservationsView()}>Foglalások</button>
            </div>
            <div className="image-gallery">

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                    {[...Array(10)].map((_, index) => (
                        <div key={index} style={{ display: 'flex', flexWrap: 'wrap' }} >

                            {!editable && (

                                apartmanData[`image${index + 1}`] && (<div key={index} style={{ margin: '5px' }}>
                                    <img
                                        key={index}
                                        src={apartmanData[`image${index + 1}`]}
                                        alt={`Image ${index + 1}`}
                                        style={{ maxWidth: '350px', maxHeight: '350px' }}
                                    />
                                </div>
                                )

                            )}
                            {editable && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '5px' }}>
                                    <div className="position-relative">
                                        <label htmlFor={`file-upload${index}`} className="btn btn-primary">
                                            Tallózás
                                        </label>

                                        <input
                                            id={`file-upload${index}`} hidden
                                            type="file"
                                            className="position-absolute top-0 start-0 translate-middle"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, index)}
                                        />
                                    </div>
                                    {newImages[index] && (
                                        <img
                                            src={newImages[index]}
                                            alt={`Uploaded Image ${index + 1}`}
                                            style={{ maxWidth: '350px', maxHeight: '350px' }}
                                        />
                                    )}
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            </div>
        </div >

    );

};

export default ViewApartman;
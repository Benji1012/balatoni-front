import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import '../customStyles/addApartman.css';

const AddApartman = () => {
    const { userId, jwToken } = useUserContext();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [stars, setStars] = useState(0);
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

    const [isNorth, setIsNorth] = useState(false);
    const [isFishing, setIsFishing] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [numberOfBeds, setNumberOfBeds] = useState(0);
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
    const [apartmanId, setApartmanId] = useState(null);
    const [newImages, setNewImages] = useState([]);
    const formData = new FormData();
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
    const [price, setPrice] = useState(0);

    const handleSubmit = () => {


        const formData = new FormData();

        imageFiles.forEach((image, index) => {
            if (image != null && image instanceof Blob) {
                formData.append(`image${index + 1}`, image);
            } else {
            }
        });

        //fetch('http://192.168.1.65:8080/api/apartments/upload-images', {
        fetch('http://localhost:8080/api/apartments/upload-images', {
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

                    fetch(`http://localhost:8080/api/apartments/new`, {
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

                            setApartmanId(data.apartmanId);
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

    return (
        <div >
            {userId && (
                <div className="apartment-container">
                    <div className="apartment-details">

                        <b>Alap adatok</b>
                        <br></br>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Név'
                        />
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='Város'
                        />
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Cím'
                        />
                        <label>
                            Ár éjszakánként
                            <input
                                type="number"
                                value={price} min={0}
                                onChange={(e) => setPrice(e.target.value)}

                            />
                        </label>
                        <br></br>
                        <label>
                            Szállás típusa
                            <br />
                            <select value={selectedType} onChange={handleOptionChange}>
                                <option value="0">Apartman</option>
                                <option value="1">Hotel</option>
                                <option value="2">Vendégház</option>
                                <option value="3">Panzió</option>
                            </select>
                        </label>
                        <br />
                        <label>
                            Csillag:
                            <br />
                            <input
                                type="number" max={"5"} min={"1"}
                                value={stars}
                                onChange={(e) => setStars(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Parkolóhelyek száma:
                            <input
                                type="number" min={"0"}
                                value={parkingSlots}
                                onChange={(e) => setParkingSlots(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Maximális emberek száma:
                            <input
                                type="number" min={"1"}
                                value={numberOfPeople}
                                onChange={(e) => setNumberOfPeople(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Szobák száma:
                            <input
                                type="number" min={"1"}
                                value={numberOfRooms}
                                onChange={(e) => setNumberOfRooms(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Ágyak száma:
                            <input
                                type="number" min={"1"}
                                value={numberOfBeds}
                                onChange={(e) => setNumberOfBeds(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <p><b>Elérhetőségek</b></p>
                        <input
                            type="number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder='Telefonszám'
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='E-mail cím'
                        />
                        <input
                            type="text"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder='Weboldal'
                        />
                        <br></br>
                        <label>
                            Látványosság 1 név:
                            <input
                                type="text"
                                value={nameSightseeingProgram1}
                                onChange={(e) => setNameSightseeingProgram1(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Látványosság 2 név:
                            <input
                                type="text"
                                value={nameSightseeingProgram2}
                                onChange={(e) => setNameSightseeingProgram2(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Látványosság 3 név:
                            <input
                                type="text"
                                value={nameSightseeingProgram3}
                                onChange={(e) => setNameSightseeingProgram3(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="column">
                        <b>Beszélt nyelvek:</b>
                        <br></br>
                        <label>
                            Magyar
                            <input
                                type="checkbox"
                                checked={isHungarian}
                                onChange={(e) => setIsHungarian(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Angol
                            <input
                                type="checkbox"
                                checked={isEnglisch}
                                onChange={(e) => setIsEnglisch(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Német
                            <input
                                type="checkbox"
                                checked={isGerman}
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
                                checked={isFreeWifi}
                                onChange={(e) => setIsFreeWifi(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Légkondi
                            <input
                                type="checkbox"
                                checked={isAirCondition}
                                onChange={(e) => setIsAirCondition(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Szauna
                            <input
                                type="checkbox"
                                checked={isSauna}
                                onChange={(e) => setIsSauna(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Medence
                            <input
                                type="checkbox"
                                checked={isPool}
                                onChange={(e) => setIsPool(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Trambulin
                            <input
                                type="checkbox"
                                checked={isTrambulin}
                                onChange={(e) => setIsTrambulin(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Móló
                            <input
                                type="checkbox"
                                checked={isPier}
                                onChange={(e) => setIsPier(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Ping pong
                            <input
                                type="checkbox"
                                checked={isTabbleTennis}
                                onChange={(e) => setIsTabbleTennis(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Billiárd
                            <input
                                type="checkbox"
                                checked={isBilliard}
                                onChange={(e) => setIsBilliard(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Tenisz
                            <input
                                type="checkbox"
                                checked={isTennis}
                                onChange={(e) => setIsTennis(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Jacuzzi
                            <input
                                type="checkbox"
                                checked={isJacuzzi}
                                onChange={(e) => setIsJacuzzi(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Masszás
                            <input
                                type="checkbox"
                                checked={isMassage}
                                onChange={(e) => setIsMassage(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Játszótér
                            <input
                                type="checkbox"
                                checked={isPlayGround}
                                onChange={(e) => setIsPlayGround(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Cigizésre kijelölt hely
                            <input
                                type="checkbox"
                                checked={isSmoking}
                                onChange={(e) => setIsSmoking(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Lovaglás
                            <input
                                type="checkbox"
                                checked={isHorseRiding}
                                onChange={(e) => setIsHorseRiding(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Szörf
                            <input
                                type="checkbox"
                                checked={isSurf}
                                onChange={(e) => setIsSurf(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Horgászás
                            <input
                                type="checkbox"
                                checked={isFishing}
                                onChange={(e) => setIsFishing(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Bár
                            <input
                                type="checkbox"
                                checked={isBar}
                                onChange={(e) => setIsBar(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Part menti
                            <input
                                type="checkbox"
                                checked={isPartside}
                                onChange={(e) => setIsPartside(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Teljes étkeztetés
                            <input
                                type="checkbox"
                                checked={isFood}
                                onChange={(e) => setIsFood(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Állatbarát
                            <input
                                type="checkbox"
                                checked={isAnimalFriendly}
                                onChange={(e) => setIsAnimalFriendly(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Gyerekbarát
                            <input
                                type="checkbox"
                                checked={isKidFriendly}
                                onChange={(e) => setIsKidFriendly(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Akadálymentesített
                            <input
                                type="checkbox"
                                checked={isUniversallyAccessable}
                                onChange={(e) => setIsUniversallyAccessable(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Különálló szállás
                            <input
                                type="checkbox"
                                checked={isSeperate}
                                onChange={(e) => setIsSeperate(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Tulaj ott él
                            <input
                                type="checkbox"
                                checked={isOwnerLivesThere}
                                onChange={(e) => setIsOwnerLivesThere(e.target.checked)}
                            />
                        </label>
                        <br></br>
                        <label>
                            Északi part
                            <input
                                type="checkbox"
                                checked={isNorth}
                                onChange={(e) => setIsNorth(e.target.checked)}
                            />
                        </label>
                        <br></br>
                    </div>
                    <div className="column">
                        <p><b>Távolságok</b></p>
                        <label>
                            Látványosság 1:
                            <br></br>
                            <input
                                type="number" min={"0"}
                                value={distSightseeingProgram1}
                                onChange={(e) => setDistSightseeingProgram1
                                    (e.target.value)}
                            />
                        </label>
                        km
                        <label>
                            Látványosság 2:
                            <br></br>
                            <input
                                type="number" min={"0"}
                                value={distSightseeingProgram2}
                                onChange={(e) => setDistSightseeingProgram2(e.target.value)}
                            />
                        </label>
                        km
                        <label>
                            Látványosság 3:
                            <br></br>
                            <input
                                type="number" min={"0"}
                                value={distSightseeingProgram3}
                                onChange={(e) => setDistSightseeingProgram3(e.target.value)}
                            />
                        </label>
                        km
                        <label>
                            Balaton:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={distBalaton}
                                onChange={(e) => setDistBalaton(e.target.value)}
                            />
                        </label>
                        km
                        <label>
                            Budapest:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={distBudapest}
                                onChange={(e) => setDistBudapest(e.target.value)}
                            />
                        </label>
                        km
                        <label>
                            Buszmegálló:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={distBus}
                                onChange={(e) => setDistBus(e.target.value)}
                            />
                        </label>
                        km
                        <label>
                            Központ:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={distCityCenter}
                                onChange={(e) => setDistCityCenter(e.target.value)}
                            />
                        </label>
                        km
                        <label>
                            Edzőterem:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={distGym}
                                onChange={(e) => setDistGym(e.target.value)}
                            />
                        </label>
                        km
                        <label>
                            Bolt:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={distHypermarket}
                                onChange={(e) => setDistHypermarket(e.target.value)}
                            />
                        </label>
                        km
                        <br></br>
                        <label>
                            Bár:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={distPub}
                                onChange={(e) => setDistPub(e.target.value)}
                            />
                        </label>
                        km
                        <label>
                            Vonat:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={distRail}
                                onChange={(e) => setDistRail(e.target.value)}
                            />
                        </label>
                        km
                        <label>
                            Étterem:
                            <br />
                            <input
                                type="number" min={"0"}
                                value={distRestaurant}
                                onChange={(e) => setDistRestaurant(e.target.value)}
                            />
                        </label>
                        km
                    </div>
                </div>
            )}

            <div style={{ backgroundColor: '#ADD8E6', display: 'flex', justifyContent: 'center' }}>
                Leírás:
                <br></br>
                <label >

                    <textarea type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="2" cols="25">

                    </textarea>
                </label>

                <label >
                    Mettől
                    <input type="date" value={rentingFrom} onChange={(e) => setRentingFrom(e.target.value)}></input>
                </label>
                <br></br>
                <label >
                    Meddig
                    <input type="date" value={rentingTo} onChange={(e) => setRentingTo(e.target.value)}></input>
                </label>


            </div>
            <div style={{ backgroundColor: '#ADD8E6', display: 'flex', justifyContent: 'center' }}>

                <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={handleSubmit}>Mentés</button>
                <button className="btn btn-primary" onClick={handleCancel}>Mégsem</button>

            </div>
            {userId && (
                <div className="image-gallery" style={{ display: 'flex', flexWrap: 'wrap' }}>

                    {[...Array(10)].map((_, index) => (
                        <div key={index} style={{ margin: '5px' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, index)}
                            />
                            {newImages[index] && (
                                <img
                                    src={newImages[index]}
                                    alt={`Uploaded Image ${index + 1}`}
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>

    );

};

export default AddApartman;
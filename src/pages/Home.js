import React, { useState, useEffect } from 'react';
import { Link, useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import '../customStyles/home.css';


const Home = () => {
  const navigate = useNavigate();
  const { userId, jwToken } = useUserContext();
  const [apartments, setApartments] = useState([]);
  const [selectedType, setselectedType] = useState(-1);
  const [filterClicked, setFilterClicked] = useState(false);
  const [noApartmanLikeThat, setNoApartmanLikeThat] = useState(false);
  const [datePicked, setDatePicked] = useState(true)
  const today = new Date().toISOString().split('T')[0];
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    type: -1,
    stars: 0,
    reviewPoints: 0,
    parkingSlots: 0,
    numberOfRoomsMin: 0,
    numberOfRoomsMax: 0,
    numberOfPeopleMin: 0,
    numberOfPeopleMax: 0,
    numberOfBedsMin: 0,
    numberOfBedsMax: 0,
    isPartside: null,
    isFood: null,
    isAnimalFriendly: null,
    isSauna: null,
    isPool: null,
    isParking: null,
    isTrambulin: null,
    isPier: null,
    isTabbleTennis: null,
    isBilliard: null,
    isTennis: null,
    isFreeWifi: null,
    isAirCondition: null,
    isJacuzzi: null,
    isMassage: null,
    isKidFriendly: null,
    isPlayground: null,
    isUniversallyAccessable: null,
    isSmoking: null,
    isHungarian: null,
    isEnglisch: null,
    isGerman: null,
    isHorseRiding: null,
    isSurf: null,
    isFishing: null,
    isBar: null,
    isSeperate: null,
    isOwnerLivesThere: null,
    isNoKid: null,
    isNorth: null,
    isSouth: null,
    distBalaton: 0,
    distRail: 0,
    distBus: 0,
    distRestaurant: 0,
    distCitycenter: 0,
    distBudapest: 0,
    distPub: 0,
    distGym: 0,
    distHypermarker: 0,
    rentingFrom: today,
    rentingTo: today,
    priceMin: 0,
    priceMax: 0,
    isImage: null,
    isMobile: null,
    isWebsite: null
  });

  const handleAdViewApartman = (apartmentId, rentingFrom, rentingTo) => {
    if (rentingFrom != null && rentingTo != null) {
      setDatePicked(true);
      navigate(`/adWiewApartman/${apartmentId}/${rentingFrom}/${rentingTo}`);

    } else {
      setDatePicked(false);
      alert("Kérem válassza ki a kívánt időpontot!");
    }
  };



  const handleInputChange = (e) => {
    const { id, type, checked, value } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [id]: inputValue === false ? null : inputValue,
    }));
  };

  const [error, setError] = useState('');
  useEffect(() => {
    const token = jwToken;
    console.log("Formdata: ", formData);

    fetch(`http://192.168.1.65:8080/api/apartments/filtered`, {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json',
      }, body: JSON.stringify(formData),

    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();

      })
      .then(data => {
        if (!data || data.length === 0) {
          setNoApartmanLikeThat(true);
        } else {
          setNoApartmanLikeThat(false);
          setApartments(data);
          setLoading(false);

        }

      })
      .catch(error => {
        setNoApartmanLikeThat(true);
        setLoading(false);
      });

  }, [userId, jwToken, filterClicked]);

  const handleOptionChange = (event) => {
    const newSelectedType = event.target.value;
    setselectedType(newSelectedType);

    setFormData((prevData) => ({
      ...prevData,
      ["type"]: newSelectedType
    }));
  };

  const handleFilter = () => {
    setLoading(true);
    if (filterClicked) {
      setFilterClicked(false);
    } else {
      setFilterClicked(true);
    }

  }


  return (

    <div style={{ display: 'flex', margin: '5px' }}>


      <div style={{ flex: 1, backgroundColor: '#ADD8E6', padding: '2px', borderRadius: '15px', marginRight: '5px' }}>

        <h2>Alap információk</h2>
        <label>Nyaralás kezdete</label>
        <br></br>
        <input
          type="date" id='rentingFrom' onChange={handleInputChange} value={formData.rentingFrom}
        />
        <br></br>
        <label>Nyaralás vége</label>
        <br></br>



        <input
          type="date" id='rentingTo' onChange={handleInputChange} value={formData.rentingTo}
        />
        <br></br>
        <button style={{ marginLeft: '5px' }} onClick={handleFilter} className="btn btn-primary">Szűrés</button  >
        <br></br>
        <label>Minimális ár / éj</label>
        <br></br>
        <input
          type="number" id='priceMin' onChange={handleInputChange}
        />
        <br></br>
        <label>Maximális ár / éj</label>
        <br></br>
        <input
          type="number" id='priceMax' onChange={handleInputChange}
        />
        <br></br>
        <label>Szállás neve</label>
        <br></br>
        <input
          type="text" id='name' onChange={handleInputChange}
        />
        <br></br>
        <label>Szállás települése</label>
        <br></br>
        <input
          type="text" id='city' onChange={handleInputChange}
        />
        <br></br>
        <label>Szállás típusa</label>
        <br></br>
        <select value={selectedType} id='type' onChange={handleOptionChange}>
          <option value="-1">Minden</option>
          <option value="0">Apartman</option>
          <option value="1">Hotel</option>
          <option value="2">Vendégház</option>
          <option value="3">Panzió</option>

        </select>
        <br></br>
        <label>Minimum parkolóhelyek száma</label>
        <br></br>
        <input
          type="number" id='parkingSlots' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Minimum férőhely</label>
        <br></br>
        <input
          type="number" id='numberOfPeopleMin' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Maximum férőhely</label>
        <br></br>
        <input
          type="number" id='numberOfPeopleMax' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Minimum csillagok száma</label>
        <br></br>
        <input
          type="number" id='stars' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Minimum értékelés</label>
        <br></br>
        <input
          type="number" id='reviewPoints' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Mnimum szábák száma</label>
        <br></br>
        <input
          type="number" id='numberOfRoomsMin' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Maximum szobák száma</label>
        <br></br>
        <input
          type="number" id='numberOfRoomsMax' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Minimum ágyak száma</label>
        <br></br>
        <input
          type="number" id='numberOfBedsMin' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Maximum ágyak száma</label>
        <br></br>
        <input
          type="number" id='numberOfBedsMax' min={0} onChange={handleInputChange}
        />

        <br></br>
        <label>Képpel rendelkező</label>

        <input
          type="checkbox"
          id='isImage'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Partmenti</label>

        <input
          type="checkbox"
          id='isPartside'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Északi part</label>
        <input
          type="checkbox"
          id='isNorth'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Déli part</label>
        <input
          type="checkbox"
          id='isSouth'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Étkeztetés</label>
        <input
          type="checkbox"
          id='isFood' onChange={handleInputChange}
          className="checkmargin"
        />
        <br></br>
        <label>Állatbarát</label>
        <input
          type="checkbox"
          id='isAnimalFriendly'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Gyerekbarát</label>
        <input
          type="checkbox"
          id='isKidFriendly'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Akadálymentesített</label>
        <input
          type="checkbox"
          id='isUniversallyAccessable'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Különálló szállás</label>
        <input
          type="checkbox"
          id='isSeperate'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Tulaj nem lakik ott</label>
        <input
          type="checkbox"
          id='isOwnerLivesThere'
          className="checkmargin" onChange={handleInputChange}
        />

        <label>Telefonszámmal rendelkező</label>
        <input
          type="checkbox"
          id='isMobile'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Weboldallal rendelkező</label>
        <input
          type="checkbox"
          id='isWebsite'
          className="checkmargin" onChange={handleInputChange}
        />

        <br></br>
        <h2>Beszélt nyelvek</h2>

        <label>Magyar</label>
        <input
          type="checkbox"
          id='isHungarian'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Angol</label>
        <input
          type="checkbox"
          id='isEnglisch'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Német</label>
        <input
          type="checkbox"
          id='isGerman'
          className="checkmargin" onChange={handleInputChange}
        />


        <br></br>
        <h2>Felszereltség / programok</h2>

        <label>Wifi</label>
        <input
          type="checkbox"
          id='isFreeWifi'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Légkondi</label>
        <input
          type="checkbox"
          id='isAirCondition'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Szanua</label>
        <input
          type="checkbox"
          id='isSauna'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Medence</label>
        <input
          type="checkbox"
          id='isPool'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Trambulin</label>
        <input
          type="checkbox"
          id='isTrambulin'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Saját móló</label>
        <input
          type="checkbox"
          id='isPier'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Ping-pong</label>
        <input
          type="checkbox"
          id='isTabbleTennis'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Billiárd</label>
        <input
          type="checkbox"
          id='isBilliard'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Tenisz</label>
        <input
          type="checkbox"
          id='isTennis'
          className="checkmargin" onChange={handleInputChange}
        />

        <label>Jacuzzi</label>
        <input
          type="checkbox"
          id='isJacuzzi'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Masszás</label>
        <input
          type="checkbox"
          id='isMassage'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Játszótér</label>
        <input
          type="checkbox"
          id='isPlayground'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Dohányzóbarát szállás</label>
        <input
          type="checkbox"
          id='isSmoking'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Lovaglás</label>
        <input
          type="checkbox"
          id='isHorseRiding'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Szörf</label>
        <input
          type="checkbox"
          id='isSurf'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Horgászás</label>
        <input
          type="checkbox"
          id='isFishing'
          className="checkmargin" onChange={handleInputChange}
        />
        <br></br>
        <label>Bár</label>
        <input
          type="checkbox"
          id='isBar'
          className="checkmargin" onChange={handleInputChange}
        />
        <h2>Maximális távolságok (km)</h2>

        <label>Balaton</label>
        <br></br>
        <input
          type="number" id='distBalaton' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Budapest</label>
        <br></br>
        <input
          type="number" id='distBudapest' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Buszmegálló</label>
        <br></br>
        <input
          type="number" id='distBus' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Város központ</label>
        <br></br>
        <input
          type="number" id='distCitycenter' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Edzőterem</label>
        <br></br>
        <input
          type="number" id='distGym' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Bolt</label>
        <br></br>
        <input
          type="number" id='distHypermarker' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Bár</label>
        <br></br>
        <input
          type="number" id='distPub' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Vasútállomás</label>
        <br></br>
        <input
          type="number" id='distRail' min={0} onChange={handleInputChange}
        />
        <br></br>
        <label>Étterem</label>
        <br></br>
        <input
          type="number" id='distRestaurant' min={0} onChange={handleInputChange}
        />


        <br></br>


        <br></br>
        <button style={{ marginLeft: '5px' }} onClick={handleFilter} className="btn btn-primary">Szűrés</button  >
      </div>

      <div style={{ flex: 3 }}>


        {loading === true ? (<h1>Töltés, kérem várjon!</h1>) : (
          <div>
            {apartments.length === 0 || noApartmanLikeThat === true ? (
              <h1>Nem található a keresési feltételeknek megfelelő szállás</h1>
            ) : (
              <div className="row row-cols-1 row-cols-md-3 g-3">
                {apartments.map(apartment => (
                  <div className="col" key={apartment.apartmanId} >
                    <div className="card h-100" style={{ backgroundColor: '#ADD8E6' }}>
                      <div className="card-body">
                        <h5 className="card-title">{apartment.name}</h5>
                        <div className="col">
                          <p className="card-text"> {(apartment.type === 0 ? "Apartman" : (apartment.type === 1 ? "Hotel" : (apartment.type === 2 ? "Vendégház" : "Panzió")))}</p>
                          <p className="card-text">{apartment.city}</p>
                          <p className="card-text"> {apartment.address}</p>
                          <p className="card-text"> {apartment.price} Ft / éj</p>

                          <div className="row row-cols-3 g-2">
                            <img src={apartment.image1} className="img-fluid" />
                            <img src={apartment.image2} className="img-fluid" />
                            <img src={apartment.image3} className="img-fluid" />
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <button onClick={() => handleAdViewApartman(apartment.apartmanId, formData.rentingFrom, formData.rentingTo)} className="btn btn-primary">Részletek</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );

};

export default Home;

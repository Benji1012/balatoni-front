import React, { useEffect, useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import '../customStyles/viewUser.css';

const UserDetails = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editable, setEditable] = useState(false);
    const { userId, jwToken, userName } = useUserContext();
    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [cityValue, setCityValue] = useState('');
    const [AddressValue, setAdressValue] = useState('');
    const [mobilValue, setMobileValue] = useState('');
    const [idValue, setIdValue] = useState('');
    const [taxIdValue, setTaxIdValue] = useState('');
    const [isPrivatePersonValue, setIsPrivatePersonValue] = useState(false);;

    useEffect(() => {
        const token = jwToken;

        if (userId) {
            fetch(`http://localhost:8080/api/user/view/${userId}`, {
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

                    setUserData(data);
                    setLoading(false);
                })
                .catch(error => {

                    setError('Failed to load user details');
                    setLoading(false);
                });
        } else {
            setError('Önnek nincs joga az adott felhasználó profiljának megtekintésére');
            setLoading(false);
        }
    }, [userId, jwToken]);

    const handleEdit = () => {
        setEditable(true);

        setEmailValue(userData.email);
        setNameValue(userData.name);

        setCityValue(userData.city);
        setAdressValue(userData.address);
        setMobileValue(userData.mobil);
        setIdValue(userData.personalId);
        setTaxIdValue(userData.taxIdNumber);
        setIsPrivatePersonValue(userData.isPrivatePerson);


    };
    useEffect(() => {

    }, [editable]);

    const handleSave = () => {
        const token = jwToken;

        if (userId) {
            fetch(`http://localhost:8080/api/user/edit/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameValue.toString(),
                    email: emailValue.toString(),
                    city: cityValue.toString(),
                    address: AddressValue.toString(),
                    mobil: mobilValue.toString(),
                    personalId: idValue.toString(),
                    taxIdNumber: taxIdValue.toString(),
                    isPrivatePerson: isPrivatePersonValue
                }),

            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {

                    setUserData(data);

                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                    setError('Failed to load user details when updating');

                });
        } else {
            setError('Önnek nincs joga az adott felhasználó profiljának megtekintésére');
            setLoading(false);
        }
        setEditable(false);
    };

    const handleCheckboxChange = (e) => {
        setIsPrivatePersonValue(e.target.checked);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div> {error}</div>;


    return (
        <div className="user-details-container">
            <div className="user-details">


                <label>Email cím:</label>
                <br />

                <input type="email" value={editable ? emailValue : userData.email} readOnly={true} onChange={(e) => setEmailValue(e.target.value)} />

                <br />

                <label>Város:</label>
                <br />
                <input type="text" value={editable ? cityValue : userData.city} readOnly={!editable} onChange={(e) => setCityValue(e.target.value)} />
                <br />

                <label>Adószám:</label>
                <br />
                <input type="number" value={editable ? taxIdValue : userData.taxIdNumber} readOnly={!editable} onChange={(e) => setTaxIdValue(e.target.value)} />
                <br />

                <label>Telefon:</label>
                <br />
                <input type="number" value={editable ? mobilValue : userData.mobil} readOnly={!editable} onChange={(e) => setMobileValue(e.target.value)} />
                <br />

                <label>Név:</label>
                <br />
                <input type="text" value={editable ? nameValue : userData.name} readOnly={!editable} onChange={(e) => setNameValue(e.target.value)} />
                <br />

                <label>Cím:</label>
                <br />
                <input type="text" value={editable ? AddressValue : userData.address} readOnly={!editable} onChange={(e) => setAdressValue(e.target.value)} />
                <br />

                <label>Személyi azonosítószám:</label>
                <br />
                <input type="text" value={editable ? idValue : userData.personalId} readOnly={!editable} onChange={(e) => setIdValue(e.target.value)} />
                <br />

                <label>Magánszemély: </label>
                <br />
                <input type="checkbox" checked={editable ? isPrivatePersonValue : userData.isPrivatePerson} readOnly={!editable} onChange={handleCheckboxChange} />
                <br />

                <label>Hűségpontok: </label>
                <br />

                <span>{userData.loyaltyPoint}</span>
                <br />

            </div>
            <div className="button-container">
                {!editable ? (
                    <button className="btn btn-primary" onClick={handleEdit}>Módosítás</button>
                ) : (
                    <button className="btn btn-primary" onClick={handleSave}>Mentés</button>
                )}
            </div>
        </div>
    );

};

export default UserDetails;

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
        <div style={{ background: "#ADD8E6" }}>
            {userData && (
                <div >
                    < div className="user-details"  >

                        <div className="column">
                            <p><strong>Email cím:</strong><br />
                                <input type="email" value={editable ? emailValue : userData.email} readOnly={!editable} onChange={(e) => setEmailValue(e.target.value)} />
                            </p>
                            <p><strong>Város:</strong><br />
                                <input type="text" value={editable ? cityValue : userData.city} readOnly={!editable} onChange={(e) => setCityValue(e.target.value)} />
                            </p>
                            <p><strong>Adószám:</strong><br />
                                <input type="number" value={editable ? taxIdValue : userData.taxIdNumber} readOnly={!editable} onChange={(e) => setTaxIdValue(e.target.value)} />
                            </p>
                            <p><strong>Telefon:</strong><br />
                                <input type="number" value={editable ? mobilValue : userData.mobil} readOnly={!editable} onChange={(e) => setMobileValue(e.target.value)} />
                            </p>

                        </div>
                        <div className="column">
                            <p><strong>Név:</strong><br />
                                <input type="text" value={editable ? nameValue : userData.name} readOnly={!editable} onChange={(e) => setNameValue(e.target.value)} />
                            </p>
                            <p><strong>Cím:</strong><br />
                                <input type="text" value={editable ? AddressValue : userData.address} readOnly={!editable} onChange={(e) => setAdressValue(e.target.value)} />
                            </p>
                            <p><strong>Személyi azonosítószám:</strong><br />
                                <input type="text" value={editable ? idValue : userData.personalId} readOnly={!editable} onChange={(e) => setIdValue(e.target.value)} />
                            </p>
                            <p><strong>Magánszemély:</strong>
                                <input type="checkbox" checked={editable ? isPrivatePersonValue : userData.isPrivatePerson} readOnly={!editable} onChange={handleCheckboxChange} />
                            </p>
                            <p>
                                <strong>Hűségpontok: {userData.loyaltyPoint}</strong>
                            </p>
                        </div>

                    </div >
                    <div className="button-container"> {!editable ? (
                        <button className="btn btn-primary" onClick={handleEdit}>Módosítás</button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    )}</div>
                </div>


            )
            }
        </div >

    );
};

export default UserDetails;

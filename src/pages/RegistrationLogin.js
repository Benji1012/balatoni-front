import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const RegistrationLogin = () => {
    const [isRegistrationMode, setIsRegistrationMode] = useState(true);
    const [validationErrors, setValidationErrors] = useState({});
    const [existingEmails, setExistingEmails] = useState([]);
    const [existingUserNames, setExistingUserNames] = useState([]);
    const navigate = useNavigate();
    const { setUserId, setJwToken, setUserName, setRole } = useUserContext();


    useEffect(() => {

        fetch('http://localhost:8080/api/auth/emails', {
            method: 'GET',

        })
            .then(response => response.json())
            .then(data => setExistingEmails(data))
            .catch(error => console.error('Error fetching emails:', error));
    }, []);

    useEffect(() => {

        fetch('http://localhost:8080/api/auth/usernames', {
            method: 'GET',

        })
            .then(response => response.json())
            .then(data => setExistingUserNames(data))
            .catch(error => console.error('Error fetching usernames:', error));
    }, []);

    const [formData, setFormData] = useState({
        loginUserName: '',
        loginPassword: '',
        registerName: '',
        registerUsername: '',
        registerEmail: '',
        registerPassword: '',
        registerRepeatPassword: ''
    });

    const handleRegistrationModeChange = (isRegistrationMode) => {
        setIsRegistrationMode(isRegistrationMode)
        setValidationErrors({});
    };

    const redirectToLogin = () => {
        const errors = {};

        handleRegistrationModeChange(false)
        errors.login = "Sikeres regisztráció! Kérem jelentkezzen be!"
        setValidationErrors(errors);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };


    const validateForm = () => {
        const errors = {};

        if (isRegistrationMode) {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const trimmedEmail = formData.registerEmail.trim();
            if (!trimmedEmail) {
                errors.register = 'Email cím kitöltése kötelező';
            } else if (!emailRegex.test(trimmedEmail)) {
                errors.register = 'Kérem egy helyes email címet adjon meg';
            } else if (existingEmails.includes(trimmedEmail)) {
                errors.register = 'Ezzel az emaillel már regisztráltak';
            }


            if (formData.registerPassword !== formData.registerRepeatPassword) {
                errors.register = 'A jelszavak nem egyeznek';
            } else if (!formData.registerPassword) {
                errors.register = 'A jelszó kitöltése kötelező';
            }

            if (existingUserNames.includes(formData.registerUsername)) {
                errors.register = 'Ezzel a felhasználónévvel már van fiók';
            } else if (!formData.registerUsername) {
                errors.register = "Felhasználónév kitöltése kötelező";
            }

            if (!formData.registerName) {
                errors.register = "Név kitöltése kötelező";
            }

        } else {
            if (!formData.loginPassword) {
                errors.login = "Jelszó kitöltése kötelező";
            }
            if (!formData.loginUserName) {
                errors.login = "Felhasználónév kitöltése kötelező";
            }
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };


    const handleLoginSubmit = (e) => {


        const errors = {};
        e.preventDefault();
        if (validateForm()) {

            const loginData = {
                username: formData.loginUserName,
                password: formData.loginPassword,
            };

            let loginSuccess = false;

            fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(loginData),
            })
                .then(response => {
                    if (response.ok) {
                        loginSuccess = true;

                        errors.login = "Sikeres bejelentkezés";
                        setValidationErrors(errors);



                    } else {
                        loginSuccess = false;
                        errors.login = "Rossz email cím vagy jelszó!";
                        setValidationErrors(errors);
                    }
                    if (loginSuccess) {
                        return response.json();
                    }
                })
                .then(

                    data => {
                        if (loginSuccess) {

                            setUserId(data.id);
                            setJwToken(data.token);
                            setUserName(data.userName);
                            setRole(data.role);

                            setTimeout(() => {
                                navigate("/");
                            }, 1000);

                        } else {
                            errors.login = "Nem megfelelő email cím vagy jelszó";
                            setValidationErrors(errors);
                        }


                    });

        } else {

        }

    };

    const handleRegistrationSubmit = (e) => {

        const errors = {};
        e.preventDefault();

        if (validateForm()) {

            fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.registerName,
                    userName: formData.registerUsername,
                    email: formData.registerEmail,
                    password: formData.registerPassword,
                    repeatPassword: formData.registerRepeatPassword,
                }),
            })
                .then(response => response.json())
                .then(data => {

                    redirectToLogin();
                })
                .catch(error => {

                });
        } else {

        }
    };

    return (
        <div className="registration-login-container" style={{ marginLeft: '175px', marginRight: '175px' }}>

            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className={!isRegistrationMode ? 'nav-link active' : 'nav-link'} id="tab-login" href="#pills-login" role="tab"
                        aria-controls="pills-login" aria-selected="true" onClick={() => handleRegistrationModeChange(false)}>Bejelentkezés</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={isRegistrationMode ? 'nav-link active' : 'nav-link'} id="tab-register" href="#pills-register" role="tab"
                        aria-controls="pills-register" aria-selected="false" onClick={() => handleRegistrationModeChange(true)}>Regisztráció</a>
                </li>
            </ul>



            <div className="tab-content">
                {!isRegistrationMode ? (
                    < div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        <form onSubmit={handleLoginSubmit}>

                            <div className="form-outline mb-4">
                                <label className="form-label" >Felhasználónév</label>
                                <input type="text" id="loginUserName" className="form-control" value={formData.loginUserName} onChange={handleInputChange} />

                            </div>


                            <div className="form-outline mb-4">
                                <label className="form-label" >Jelszó</label>
                                <input type="password" id="loginPassword" className="form-control" value={formData.loginPassword} onChange={handleInputChange} />

                            </div>
                            {validationErrors.login && <div className="text-danger">{validationErrors.login}</div>}
                            <button type="submit" className="btn btn-primary btn-block mb-4">Bejelentkezés</button>


                        </form>
                    </div>) : (
                    <div className="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                        <form onSubmit={handleRegistrationSubmit}>

                            <div className="form-outline mb-4">
                                <label className="form-label" >Név</label>
                                <input type="text" id="registerName" className="form-control" value={formData.registerName} onChange={handleInputChange} />

                            </div>


                            <div className="form-outline mb-4">
                                <label className="form-label" >Felhasználó név</label>
                                <input type="text" id="registerUsername" className="form-control" value={formData.registerUsername} onChange={handleInputChange} />

                            </div>


                            <div className="form-outline mb-4">
                                <label className="form-label" >Email</label>
                                <input type="email" id="registerEmail" className="form-control" value={formData.registerEmail} onChange={handleInputChange} />

                            </div>


                            <div className="form-outline mb-4">
                                <label className="form-label" >Jelszó</label>
                                <input type="password" id="registerPassword" className="form-control" value={formData.registerPassword} onChange={handleInputChange} />

                            </div>


                            <div className="form-outline mb-4">
                                <label className="form-label" >Jelszó újra</label>
                                <input type="password" id="registerRepeatPassword" className="form-control" value={formData.registerRepeatPassword} onChange={handleInputChange} />

                            </div>

                            {validationErrors.register && <div className="text-danger">{validationErrors.register}</div>}


                            <button type="submit" className="btn btn-primary btn-block mb-3">Regisztráció</button>
                        </form>
                    </div>)}
            </div>

        </div >
    );
};

export default RegistrationLogin;

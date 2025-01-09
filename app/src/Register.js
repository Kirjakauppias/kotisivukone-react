import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState ({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        re_password: "",
    });

    const [responseMessage, setResponseMessage] = useState("");
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content; //// Oletetaan, että CSRF-token lisätään meta-tagissa.
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.re_password) {
            setResponseMessage("Salasanat eivät täsmää!");
            return;
        }

        try {
            const response = await axios.post("/register_check.php", {
                ...formData,
                csrf_token: csrfToken,
            });

            setResponseMessage(response.data.message || "Rekisteröinti onnistui!");
        } catch (error) {
            setResponseMessage(
                error.response?.data?.message || "Rekisteröinti onnistui!"
            );
        }
    };

    return (
        <div id="loginModal" style={{ display: "block"}}>
            <div className="modal-content">
                <span
                    className="close"
                    onClick={() => {
                        document.querySelector("£loginModal").style.display = "none";
                    }}
                >
                    &times;
                </span>
                <div className="imgcontainer">
                    <img 
                        src="images/register_avatar.png"
                        alt="Avatar"
                        className="avatar"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstname" arial-label="Etunimi">
                        Etunimi:
                    </label>
                    <input 
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="lastname">Sukunimi:</label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                    />
            
                    <label htmlFor="username">Käyttäjätunnus:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      autoComplete="off"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
            
                    <label htmlFor="email">Sähköposti:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
            
                    <label htmlFor="password">Salasana:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      autoComplete="off"
                      minLength="8"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
            
                    <label htmlFor="re_password">Salasana uudelleen:</label>
                    <input
                      type="password"
                      id="re_password"
                      name="re_password"
                      autoComplete="off"
                      minLength="8"
                      value={formData.re_password}
                      onChange={handleInputChange}
                      required
                    />
            
                    <input type="hidden" name="csrf_token" value={csrfToken} />
                            
                    <input type="submit" value="Tallenna" />
                </form>
            </div>
        </div>
    )
}
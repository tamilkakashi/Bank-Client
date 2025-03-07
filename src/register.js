import React, { useState } from "react";
import axios from "axios";
import "./register.css"; 


export default function Register() {
    let [Name, setName] = useState('');
    let [Email, setEmail] = useState('');
    let [pass, setPass] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        let item = { name: Name, email: Email, password: pass, amount: 1000 };
        axios.post('https://bank-server-1-jf4n.onrender.com/create', item);
        alert("Submitted Successfully");
    }

    return (
        <div className="register-container">
            <div className="register-form">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" required />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

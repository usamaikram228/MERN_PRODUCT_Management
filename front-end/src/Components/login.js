import React, { useEffect, useState } from "react";
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })
    const loginHandle = async () => {
        let result = await fetch("http://localhost:5000/login",
            {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    'content-Type': 'application/json'
                }
            })
        //console.log(result);
        result = await result.json();
        if (result.name) {

            localStorage.setItem('user', JSON.stringify(result));
            navigate('/')
        }
        else {
            alert("Enter correct details");
        }

    }

    return (
        <div className="sign_up_div">
            <h2>Login</h2>
            <p>if does not have account?<Link to="/signup"> Signup</Link></p>
            <input className="sign_up" type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email" />
            <input className="sign_up" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" />
            <button onClick={loginHandle} className="sign_up_button" type="submit">Login</button>
        </div>
    )
}
export default Login;
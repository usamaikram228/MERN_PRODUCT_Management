import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const logout = () => {
        localStorage.clear();

        navigate('/login');
    }
    return (
        <div >

            <ul className="nav-ul">
                <li><Link to="/">Home</Link></li>
                <img alt="logo" className="logo" src ="https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg"></img>
                {auth ? (
                    <>
                        <li><Link to="/my-products">My Products</Link></li>
                        <li><Link to="/add-product">Add Product</Link></li>
                        <li><Link to="/update">Update</Link></li>
                        <li className="logout_nav"><Link onClick={logout} to="/login">logout ({JSON.parse(auth).name})</Link></li>

                    </>

                ) : (
                    <> 
                        <li className="logout_nav"><Link to="/signup">Signup</Link></li>
                        <li className="logout_nav"><Link to="/login">Login</Link></li>
                        </>
            )}
            </ul>
        </div>
    )
}
export default Nav;
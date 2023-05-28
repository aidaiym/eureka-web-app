import React, {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Container from "react-bootstrap/Container";
import logo from "../../logo.png";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

export const CustomNavbar = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [access_token, setAccessToken] = useState(null);
    let localStorageToken = localStorage.getItem('access_token');
    useEffect(() => {
        setAccessToken(localStorageToken)},
            [localStorageToken]
    )

    const [user, setUser] = useState(null);


    useEffect(() => {
     if (access_token !== null) {
        setIsAuth(true);
      }
     }, [isAuth, access_token]);

    useEffect(() => {
        let token;
        if (access_token) {
            token = jwt_decode(localStorage.getItem('access_token'));
            axios
                .get(`http://localhost:8000/api/users/${token['user_id']}/`)
                .then(r => {
                    setUser(r.data['username'])
                })
                .catch(error => {
                console.log("error", error);
                });
            }
      })

    const logoutHandler = e => {
      e.preventDefault()
        axios
            .post('http://localhost:8000/api/logout/',
                {
                    access_token: localStorage.getItem('access_token'),
                    refresh_token: localStorage.getItem('refresh_token')
                },
                {
                    headers: {
                    'Authorization': `Token ${localStorage.getItem('access_token')}`}})
            .then(response=> {
                console.log("response", response);
            })
            .catch(error => {
                console.log("Logout error", error)
            })
        localStorage.setItem('access_token', null);
        localStorage.setItem('refresh_token', null)
        localStorage.clear()
        setAccessToken(null)
        setIsAuth(false);
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
              {isAuth ? <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <a className="btn btn-dark" href="#">Hi, {user}</a>
                <Button variant="outline-light" onClick={logoutHandler}>Log Out</Button>
              </div>
                  :
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button className="btn btn-dark" href="/auth">Log in</Button>
                <Button className="btn btn-dark">Sign up</Button>
              </div>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default CustomNavbar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// export const CustomNavbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           Lesson CRUD
//         </Link>
//         <ul className="nav-menu">
//           <li className="nav-item">
//             <Link to="/signin" className="nav-links">
//               Sign In
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/signup" className="nav-links">
//               Sign Up
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default CustomNavbar;

import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Register from './register';
import CashBack from './cashback';
import Alldata from './alldata';
import Deposit from './deposit';
import UserContext from './context.js';
import backgroundVideo from './video/video.mp4'; // Add a video file in your `src` folder
import React from "react";

function App() {
  return (
    <>
      {/* Background Video */}
      <div className="video-container">
        <video autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>

      {/* Navbar */}
      <Navbar bg="transparent" expand="lg" className="navbar-custom">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#register">REGISTER</Nav.Link>
            <Nav.Link href="#deposit">DEPOSIT</Nav.Link>
            <Nav.Link href="#cashback">WITHDRAW</Nav.Link>
            <Nav.Link href="#alldata">ALLDATA</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Routes */}
      <HashRouter>
        <UserContext.Provider value={{ "users": [{ name: "xyz", email: "xyz@gmail.com", password: "xyz", amount: 1000 }] }}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/cashback" element={<CashBack />} />
            <Route path="/alldata" element={<Alldata />} />
          </Routes>
        </UserContext.Provider>
      </HashRouter>
    </>
  );
}

export default App;

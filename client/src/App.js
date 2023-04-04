import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import FilmDetails from "./components/FilmDetails";
// import NavBar from "./components/Header";
import Header from "./components/Header";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import GlobalStyles from "./components/GlobalStyles";
import UserProfile from "./components/UserProfile";

const App = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Filmdetails/:filmid" element={<FilmDetails />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: "Yanone Kaffeesatz", sans-serif;
`;
export default App;

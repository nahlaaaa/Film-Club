import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import FilmDetails from "./components/FilmDetails";
import Header from "./components/Header";
import GlobalStyles from "./components/GlobalStyles";
import UserProfile from "./components/UserProfile";
import Theatres from "./components/Theatres";
import Drama from "./components/Drama";
import Kids from "./components/Kids";
import ScienceFiction from "./components/ScienceFiction";
import Comedy from "./components/Comedy";

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
          <Route path="/theatres" element={<Theatres />} />
          <Route path="/drama" element={<Drama />} />
          <Route path="kids" element={<Kids />} />
          <Route path="sciencefiction" element={<ScienceFiction />} />
          <Route path="/comedy" element={<Comedy />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: "Bai Jamjuree", sans-serif
  min-width: 1250px;
`;

export default App;

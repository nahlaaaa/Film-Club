import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
// import NavBar from "./components/Header";
import Header from "./components/Header";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isLoading, error } = useAuth0();
  return (
    <main className="colum">
      <h1>Auth0 Login</h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
      )}
      <Header />
      <Home />
      <MovieDetails />
    </main>
  );
};

export default App;

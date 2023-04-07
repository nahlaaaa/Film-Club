import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const img = "https://image.tmdb.org/t/p/w500/";
const Theatres = () => {
  const [theatres, setTheatres] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8000/api/theatres")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setTheatres(data.results);
      });
  }, []);
  return (
    <>
      <Wrapper>
        {theatres &&
          theatres.map((the) => {
            return (
              <TheatresLink to={`/filmdetails/${the.id}`}>
                <MovieInfo>
                  <Img src={img + the.poster_path} />
                  <P>{the.title}</P>
                  <P>{the.vote_average}</P>
                </MovieInfo>
              </TheatresLink>
            );
          })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.2em;
  justify-content: center;
  padding: 30px;
`;

const P = styled.p`
  font-family: "Bai Jamjuree", sans-serif;
  font-size: 20px;
`;

const Img = styled.img`
  width: 200px;
  height: 400px;
`;

const TheatresLink = styled(Link)`
  flex: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  margin: 5px;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  background-color: #272727;
  color: white;
  text-decoration: none;
`;

const MovieInfo = styled.div``;

export default Theatres;

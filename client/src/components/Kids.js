import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const img = "https://image.tmdb.org/t/p/w500/";

const Kids = () => {
  const [kids, setKids] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8000/api/kids")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setKids(data.results);
      });
  }, []);
  return (
    <>
      <Wrapper>
        {kids &&
          kids.map((kid) => {
            return (
              <KidsLink to={`/filmdetails/${kid.id}`}>
                <MovieInfo>
                  <Img src={img + kid.poster_path} />
                  <P>{kid.title}</P>
                  <P>{kid.vote_average}</P>
                </MovieInfo>
              </KidsLink>
            );
          })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  margin-left: 5px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.2em;
  justify-content: center;
`;

const P = styled.p`
  font-family: "Bai Jamjuree", sans-serif;
  font-size: 20px;
`;

const Img = styled.img`
  width: 200px;
  height: 400px;
`;

const KidsLink = styled(Link)`
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

export default Kids;

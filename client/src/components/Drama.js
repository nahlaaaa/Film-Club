import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const img = "https://image.tmdb.org/t/p/w500/";

const Drama = () => {
  const [drama, setDrama] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8000/api/drama")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setDrama(data.results);
      });
  }, []);
  return (
    <>
      <Wrapper>
        {drama &&
          drama.map((val) => {
            return (
              <DramaLink to={`/filmdetails/${val.id}`}>
                <MovieInfo>
                  <Img src={img + val.poster_path} />
                  <P>{val.title}</P>
                  <P>{val.vote_average}</P>
                </MovieInfo>
              </DramaLink>
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
`;

const P = styled.p`
  font-family: "Bai Jamjuree", sans-serif;
  font-size: 20px;
`;

const Img = styled.img`
  width: 200px;
  height: 400px;
`;

const DramaLink = styled(Link)`
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

export default Drama;

import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { GlobalStyleComponent } from "styled-components";
import { FaStar } from "react-icons/fa";
import Rating from "./Rating";
import { useAuth0 } from "@auth0/auth0-react";
import YouTube from "react-youtube";

const img = "https://image.tmdb.org/t/p/w500/";
const FilmDetails = () => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const { user, setUser } = useAuth0();
  const { filmid } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8000/api/film/${filmid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSelectedFilm(data);
      })
      .catch((err) => console.log(err));
  }, [filmid]);

  return (
    <Div>
      {selectedFilm && (
        <Wrapper>
          <YouTube>{selectedFilm.id}</YouTube>
          <Img src={img + selectedFilm.backdrop_path} />
          <PosterImg src={img + selectedFilm.poster_path} />
          <InfoDiv>
            <Title>{selectedFilm.title}</Title>
            <OverView>{selectedFilm.overview}</OverView>
            <Date>{selectedFilm.release_date}</Date>
          </InfoDiv>
          {user && (
            <Rating
              movieId={selectedFilm.id}
              userId={user.email}
              selectedFilm={selectedFilm}
            />
          )}
        </Wrapper>
      )}
    </Div>
  );
};

const Div = styled.div`
  background-size: cover;
  background-position: center;
  padding: 50px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const InfoDiv = styled.div`
  margin-top: -250px;
  border: 5px solid #9e0505;
  border-radius: 10px;
  margin-top: -80px;
  padding-left: 10px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: white;
`;

const OverView = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 30px;
  color: white;
`;

const Date = styled.p`
  font-size: 30px;
  color: white;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const PosterImg = styled.img`
  /* position: absolute; */
  position: relative;
  top: -250px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  height: 500px;
  width: auto;
`;

export default FilmDetails;

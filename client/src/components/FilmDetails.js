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
  const [ytKey, setYtKey] = useState();
  useEffect(() => {
    fetch(`http://localhost:8000/api/film/${filmid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSelectedFilm(data);
      })
      .catch((err) => console.log(err));
  }, [filmid]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/gettrailer/${filmid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setYtKey(data[0].key);
      })
      .catch((err) => console.log(err));
  }, [filmid]);

  return (
    <Div>
      {selectedFilm && ytKey && (
        <Wrapper>
          <YtDiv>
            <YouTube
              videoId={ytKey}
              // onReady={(event) => event.target.playVideo()}
              width={640}
              height={360}
            />
          </YtDiv>
          <Img src={img + selectedFilm.backdrop_path} />
          <PosterImg src={img + selectedFilm.poster_path} />
          <InfoDiv>
            <Title>{selectedFilm.title}</Title>
            <OverView>{selectedFilm.overview}</OverView>
            <Date>{selectedFilm.release_date}</Date>
          </InfoDiv>
          <ReviewDiv>
            {user && (
              <Rating
                movieId={selectedFilm.id}
                userId={user.email}
                selectedFilm={selectedFilm}
              />
            )}
          </ReviewDiv>
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
  margin-top: -450px;
  border: 5px solid #9e0505;
  border-radius: 10px;
  padding-left: 10px;
  width: 900px;
  position: relative;
  right: -400px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: black;
  font-family: "Bai Jamjuree", sans-serif;
`;

const OverView = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 30px;
  color: black;
  font-family: "Bai Jamjuree", sans-serif;
`;

const Date = styled.p`
  font-size: 30px;
  color: black;
  font-family: "Bai Jamjuree", sans-serif;
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

const ReviewDiv = styled.div`
  width: 900px;
  position: relative;
  right: -400px;
  margin-top: 10px;
`;

const YtDiv = styled.div`
  width: 50%;
  height: auto;
  border-radius: 10px;
  position: absolute;
  top: 150px;
  left: 400px;
  padding-top: 50px;
`;

const YtButton = styled.button`
  border-radius: 10px;
  position: absolute;
  top: 570px;
  left: 660px;
  padding-top: 50px;
  z-index: 1;
`;

export default FilmDetails;

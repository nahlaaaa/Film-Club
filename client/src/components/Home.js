import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GlobalStyleComponent } from "styled-components";

const img = "https://image.tmdb.org/t/p/w500/";

const Home = () => {
  const [films, setFilms] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8000/api/popfilms")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFilms(data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Wrapper>
        {films &&
          films.map((film) => {
            return (
              <FilmLink to={`/filmdetails/${film.id}`}>
                <MovieInfo>
                  <Img src={img + film.poster_path} />
                  <P>{film.title}</P>
                  <P>ImDB: {film.vote_average}</P>
                </MovieInfo>
              </FilmLink>
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
const FilmLink = styled(Link)`
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

const P = styled.p``;

const MovieInfo = styled.div``;

const Img = styled.img`
  width: 200px;
  height: 400px;
`;
export default Home;

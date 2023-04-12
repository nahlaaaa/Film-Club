import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GlobalStyleComponent } from "styled-components";
import FilmsSlider from "./FilmsSlider";

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
    <Wrapper>
      <FilmsSlider films={films} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 50px;
`;

export default Home;

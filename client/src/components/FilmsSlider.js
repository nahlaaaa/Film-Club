import styled from "styled-components";
import { Link } from "react-router-dom";
import { GlobalStyleComponent } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const img = "https://image.tmdb.org/t/p/w500/";

const FilmsSlider = ({ films }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider {...settings}>
        {films &&
          films.map((film) => {
            return (
              <FilmLink to={`/filmdetails/${film.id}`}>
                <MovieInfo>
                  <Img src={img + film.poster_path} />
                  <Div1>
                    <P1>{film.title}</P1>
                    <P>IMDB: {film.vote_average}</P>
                  </Div1>
                </MovieInfo>
              </FilmLink>
            );
          })}
      </Slider>
    </>
  );
};

const FilmLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const P = styled.p`
  font-family: "Bai Jamjuree", sans-serif;
  font-size: 20px;
  margin: 5px;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 400px;
  height: auto;
`;

const Div1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const P1 = styled(P)`
  font-weight: bold;
  font-size: 25px;
`;
export default FilmsSlider;

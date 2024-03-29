import SignIn from "./SignIn";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";

const img = "https://image.tmdb.org/t/p/w500/";

const Header = () => {
  const [value, setvalue] = useState("");
  const [searchedFilms, setSearchedFilms] = useState(null);

  const onChange = (e) => {
    setvalue(e.target.value);
  };

  const searchHandle = () => {
    setSearchedFilms([]);
  };

  useEffect(() => {
    onSearch(value);
  }, [value]);

  const onSearch = (searchedvalue) => {
    fetch(`http://localhost:8000/api/films?search=${searchedvalue}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchedFilms(data.results);
      });
    console.log("search", searchedvalue);
  };

  return (
    <>
      <Div>
        <H1 to={"/"}>
          {" "}
          <GiFilmSpool size={80} />
          <P>Film Club</P>
        </H1>
        <TypesSec>
          <DramaLink to="/drama">Drama</DramaLink>
          <TheatresLink to="/theatres">Theatres</TheatresLink>
          <KidsLink to="/kids">Kids</KidsLink>
          <SfLink to="/sciencefiction">Science Fiction</SfLink>
          <ComedyLink to="/comedy">Comedy</ComedyLink>
        </TypesSec>
        <SearchBar>
          <Input
            type="text"
            id="query"
            placeholder="search..."
            value={value}
            onChange={onChange}
          />
          <SearchWrapper>
            <SearchDiv>
              {searchedFilms &&
                searchedFilms.slice(0, 10).map((film) => {
                  return (
                    <>
                      <SearchedLink
                        to={`/filmdetails/${film.id}`}
                        onClick={searchHandle}
                      >
                        <DropImg src={img + film.poster_path} />
                        <DropDown>{film.title}</DropDown>
                      </SearchedLink>
                    </>
                  );
                })}
            </SearchDiv>
          </SearchWrapper>
        </SearchBar>
        <SignIn />
      </Div>
    </>
  );
};

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  width: 400px;
  justify-content: center;
`;

const SearchDiv = styled.div`
  position: absolute;
  z-index: 10;
  max-width: 350px;
`;

const Div = styled.div`
  width: 100%;
  background-color: black; // red #9e0505
  min-width: 1300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H1 = styled(Link)`
  color: #faf5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Yanone Kaffeesatz", sans-serif;
  text-decoration: none;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  width: 300px;
  background-color: #f5f5f5;

  &:focus {
    outline: none;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  }

  &::placeholder {
    color: #a3a3a3;
  }
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
`;

const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0px 4px 12px #cccccc;
  width: 300px;
  background-color: white;
`;

const DropImg = styled.img`
  width: 40px;
  height: 50px;
`;

const SearchedLink = styled(Link)`
  position: relative;
  display: flex;

  &:hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }

  color: black;
  text-decoration: none;
`;

const P = styled.p`
  font-size: 30px;
  font-family: "Rubik Pixels", cursive;
`;

const TypesSec = styled.div`
  display: flex;
  font-family: "Bai Jamjuree", sans-serif;
  align-items: center;
`;

const DramaLink = styled(Link)`
  text-decoration: none;
  color: white;
  border-right: 2px solid white;
  padding: 3px 12px;
`;

const TheatresLink = styled(Link)`
  text-decoration: none;
  color: white;
  border-right: 2px solid white;
  padding: 3px 12px;
`;

const KidsLink = styled(Link)`
  text-decoration: none;
  color: white;
  border-right: 2px solid white;
  padding: 3px 12px;
`;

const SfLink = styled(Link)`
  text-decoration: none;
  color: white;
  border-right: 2px solid white;
  padding: 3px 12px;
`;

const ComedyLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 3px 12px;
`;

export default Header;

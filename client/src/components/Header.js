import { useAuth0 } from "@auth0/auth0-react";
import SignIn from "./SignIn";
import styled from "styled-components";
import { GlobalStyleComponent } from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbMovie } from "react-icons/tb";

const img = "https://image.tmdb.org/t/p/w500/";

const Header = () => {
  const [value, setvalue] = useState("");
  const [searchedFilms, setSearchedFilms] = useState(null);

  const onChange = (e) => {
    setvalue(e.target.value);
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
          <TbMovie size={80} />
          Film Club
        </H1>
        <SearchBar>
          <Input
            type="text"
            id="query"
            placeholder="search..."
            value={value}
            onChange={onChange}
          />
          {/* <Button onClick={() => onSearch(searchedFilms)}>Search</Button> */}
          <SearchWrapper>
            <SearchDiv>
              {searchedFilms &&
                searchedFilms.slice(0, 10).map((film) => {
                  return (
                    <>
                      <SearchedLink to={`/filmdetails/${film.id}`}>
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
  /* position: relative; */
  background-color: #9e0505; // red
  border-radius: 5px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H1 = styled(Link)`
  color: #faf5f5;
  display: flex;
  justify-content: center;
  padding-top: 40px;
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
  /* position: absolute;
  top: 10px;
  right: 10px; */
  /* transform: translateX(-100%); */
  /* width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #0077cc;
    box-shadow: 0 0 4px rgba(0, 119, 204, 0.4);
  } */
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

export default Header;

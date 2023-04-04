import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const img = "https://image.tmdb.org/t/p/w500/";

const UserProfile = () => {
  const { user, setUser } = useAuth0();
  const [watchlist, setWatchlist] = useState("");
  const [profileInfo, setProfileInfo] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/getwatchlist`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWatchlist(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/api/profiledata`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfileInfo(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      {user && watchlist && (
        <UserInfo>
          <div>
            <H1>{user.name}</H1>
            <Img src={user.picture} alt={user?.name} />
          </div>
          <ProfileInfo>
            <H1>latest avtivities</H1>
            {profileInfo &&
              profileInfo.slice(-7).map((info) => {
                return (
                  <>
                    <P>{info.rating}</P>
                    <P>{info.review}</P>
                    <P>{info.movieId}</P>
                    <img src={img + info} />
                  </>
                );
              })}
          </ProfileInfo>
          <WatchlistBox>
            <H1>Watchlist</H1>
            {watchlist.map((list) => {
              return (
                <ListInfo>
                  <WatchlistLink to={`/FilmDetails/${list.movieData.id}`}>
                    <Poster src={img + list.movieData.poster_path} />
                    <P>{list.movieData.title}</P>
                  </WatchlistLink>
                </ListInfo>
              );
            })}
          </WatchlistBox>
        </UserInfo>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  column-gap: 400px;
`;

const ListInfo = styled.div`
  display: flex;
`;

const H1 = styled.h1`
  /* display: flex;
  justify-content: left; */
  font-family: "Yanone Kaffeesatz", sans-serif;
  color: white;
  margin: 20px;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  border: 2px solid black;
  border-radius: 10px;
  margin: 20px;
`;

const WatchlistBox = styled.div`
  width: 200px;
  height: 400px;
  color: grey;
  margin: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const P = styled.p`
  color: yellow;
`;

const Poster = styled.img`
  width: 80px;
  height: 80px;
`;

const WatchlistLink = styled(Link)`
  text-decoration: none;
`;

const ProfileInfo = styled.div``;
export default UserProfile;

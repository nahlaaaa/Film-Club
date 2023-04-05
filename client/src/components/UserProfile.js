import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BsFillTrashFill } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { FcEditImage } from "react-icons/fc";
import Edit from "./Edit";

const img = "https://image.tmdb.org/t/p/w500/";

const UserProfile = () => {
  const { user, setUser } = useAuth0();
  const [watchlist, setWatchlist] = useState("");
  const [profileInfo, setProfileInfo] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [refetchUserData, setRefetchUserData] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/getwatchlist`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWatchlist(data.data);
      })
      .catch((err) => console.log(err));
  }, [refetch]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/profiledata`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfileInfo(data.data);
      })
      .catch((err) => console.log(err));
  }, [refetchUserData]);

  const updatedReview = (newReview, movieId) => {
    fetch(`http://localhost:8000/api/userdataupdate`, {
      headers: {
        Accept: "aplication/json",
        "content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        review: newReview,
        rating: "fake rating",
        movieId: movieId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setEdit(true);
      });
  };

  const handleDelete = (movieId) => {
    console.log(movieId);
    fetch(`http://localhost:8000/api/deletewatchlist`, {
      method: "DELETE",
      headers: {
        Accept: "aplication/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ _id: movieId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRefetch(!refetch);
      });
  };
  return (
    <Wrapper>
      {user && watchlist && (
        <UserInfo>
          <div>
            <H1>{user.name}</H1>
            <Img src={user.picture} alt={user?.name} />
          </div>
          <ProfileInfo>
            <H1>latest activities</H1>
            {profileInfo &&
              profileInfo
                .slice(-7)
                .reverse()
                .map((info) => {
                  return (
                    <>
                      <PosterImg src={img + info.movieData.poster_path} />
                      <P>{info.movieData.title}</P>
                      <P>{info.rating}</P>
                      <P>{info.review}</P>
                      <Edit
                        review={info.review}
                        updatedReview={updatedReview}
                        movieId={info.movieData.id}
                        handleDelete={handleDelete}
                        refetchUserData={refetchUserData}
                        setRefetchUserData={setRefetchUserData}
                      />
                    </>
                  );
                })}
          </ProfileInfo>
          <WatchlistBox>
            <H1>Watchlist</H1>
            {watchlist.reverse().map((list) => {
              console.log(list.movieData.id);
              return (
                <ListInfo>
                  <BsFillTrashFill
                    size={30}
                    color="white"
                    onClick={() => {
                      handleDelete(list.movieData.id);
                    }}
                  />
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
  /* display: flex; */
  width: 100%;
  display: grid;
  margin-left: 5px;
  grid-template-columns: repeat(1fr, 1fr, 1fr);
  grid-gap: 0.2em;
  justify-content: center;
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

const ProfileInfo = styled.div`
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

const PosterImg = styled.img`
  width: 80px;
  height: 80px;
`;
export default UserProfile;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BsFillTrashFill } from "react-icons/bs";
import { RxActivityLog } from "react-icons/rx";
import { BiListPlus } from "react-icons/bi";
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

  const updatedReview = (newReview, movieId, newRating) => {
    fetch(`http://localhost:8000/api/userdataupdate`, {
      headers: {
        Accept: "aplication/json",
        "content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        review: newReview,
        rating: newRating,
        movieId: movieId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRefetchUserData(!refetchUserData);
        // alert("your review has been updated :)");
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
        <SecWrapper>
          <UserInfo>
            <Div>
              <H2>{user.name}</H2>
              <Img src={user.picture} alt={user?.name} />
            </Div>
          </UserInfo>
          <MainDiv>
            <ProfileInfo>
              <H1>
                Latest Activities <RxActivityLog />
              </H1>
              {profileInfo &&
                profileInfo
                  .slice(-7)
                  .reverse()
                  .map((info) => {
                    return (
                      <Data>
                        <PosterImg src={img + info.movieData.poster_path} />
                        <RevDiv>
                          <P>{info.movieData.title}</P>
                          <P>your rating: {info.rating}</P>
                          <P>your review: {info.review}</P>
                          <Edit
                            review={info.review}
                            updatedReview={updatedReview}
                            movieId={info.movieData.id}
                            handleDelete={handleDelete}
                            refetchUserData={refetchUserData}
                            setRefetchUserData={setRefetchUserData}
                            rating={info.rating}
                            id={info.id}
                          />
                        </RevDiv>
                      </Data>
                    );
                  })}
            </ProfileInfo>
            <WatchlistBox>
              <H1>
                Watchlist <BiListPlus />{" "}
              </H1>
              {watchlist.map((list) => {
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
          </MainDiv>
        </SecWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SecWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px solid black;
  padding: 30px;
  border-radius: 5px;
  margin: 40px;
  background-color: #272727;
  color: white;
`;

const MainDiv = styled.div`
  display: flex;
  column-gap: 150px;
  padding: 10px 80px;
`;

const UserInfo = styled.div`
  border-bottom: 3px solid grey;
  padding-bottom: 10px;
  display: flex;
`;

const ListInfo = styled.div`
  display: flex;
  align-items: center;
`;

const H1 = styled.h1`
  border: 2px solid black;
  padding: 10px;
  margin: 15px;
  border-radius: 5px;
  font-family: "Bai Jamjuree", sans-serif;
  background-color: #b8b6b6;
  text-align: center;
  flex: 0;
  width: 150px;
`;
const H2 = styled.h2`
  font-family: "Bai Jamjuree", sans-serif;
`;
const Img = styled.img`
  width: 150px;
  height: 150px;
  border: 2px solid black;
  border-radius: 10px;
  margin: 20px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WatchlistBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const P = styled.p`
  font-family: "Bai Jamjuree", sans-serif;
  margin: 5px;
`;

const Poster = styled.img`
  width: 200px;
  height: auto;
`;

const WatchlistLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: white;
  border: 3px solid yellow;
  border-radius: 5px;
  padding: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Data = styled.div`
  border: 3px solid yellow;
  border-radius: 5px;
  display: flex;
  width: 500px;
  column-gap: 40px;
  align-items: center;
  padding: 20px;
`;

const RevDiv = styled.div``;

const PosterImg = styled.img`
  width: 200px;
  height: auto;
`;
export default UserProfile;

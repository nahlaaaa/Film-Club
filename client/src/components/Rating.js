import React, { useState } from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { BsFillBookmarkFill } from "react-icons/bs";

const Rating = ({ userId, movieId, selectedFilm }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submited, setSubmited] = useState(false);
  const [watchlist, setWatchlist] = useState(false);

  const postRatingReview = () => {
    console.log({ userId, movieId, rating, review, watchlist });
    fetch(`http://localhost:8000/api/rating`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        movieId,
        rating,
        review,
        watchlist,
        movieData: selectedFilm,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRating(data);
        console.log(data);
        setSubmited(true);
        // setInterval(() => {
        //   setSubmited(false);
        // }, 2000);
      });
  };

  const addToWatchlist = () => {
    fetch(`http://localhost:8000/api/watchlist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId, movieData: selectedFilm }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <Div>
        <ReactStars
          activeColor={"#dbbf09"}
          onChange={(rate) => setRating(rate)}
          size={50}
          isHalf={true}
        />
        <BsFillBookmarkFill
          color="white"
          size={"50px"}
          fill={watchlist ? "#9e0505" : "white"}
          onClick={() => {
            setWatchlist(!watchlist);
            addToWatchlist();
          }}
        />
      </Div>
      <Wrapper>
        <Textarea
          placeholder="What do you think?"
          onChange={(e) => setReview(e.target.value)}
        />
        <Button onClick={postRatingReview}>Post</Button>
      </Wrapper>
      {submited && <Thanks>Thanks for reviewing :)</Thanks>}
    </>
  );
};

const Textarea = styled.textarea`
  border: 5px solid #9e0505;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-family: Arial, sans-serif;
  font-size: 16px;
  padding: 10px;
  width: 900px;
  height: 100px;
  resize: none;
  margin-top: 10px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #faf5f5;
  border: none;
  color: #9e0505;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 25px;
  box-shadow: 0px 5px 15px rgba(75, 93, 104, 0.15);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #edd5d5;
  }
`;

const Thanks = styled.p`
  color: white;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;

  gap: 30px;
`;
export default Rating;

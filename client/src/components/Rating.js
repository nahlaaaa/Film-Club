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
      body: JSON.stringify({ userId, movieId, rating, review, watchlist }),
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
      <ReactStars
        activeColor={"#9e0505"}
        onChange={(rate) => setRating(rate)}
        size={50}
        isHalf={true}
      />
      <Textarea
        placeholder="What do you think?"
        onChange={(e) => setReview(e.target.value)}
      />
      <Button onClick={postRatingReview}>Post</Button>
      {submited && <Thanks>thanks for reviewing</Thanks>}
      <BsFillBookmarkFill
        color="white"
        size={"50px"}
        fill={watchlist ? "#9e0505" : "white"}
        onClick={() => {
          setWatchlist(!watchlist);
          addToWatchlist();
        }}
      />
    </>
  );
};

const Textarea = styled.textarea`
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 16px;
  padding: 10px;
  width: 500px;
  height: 100px;
  resize: none;
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
`;

export default Rating;

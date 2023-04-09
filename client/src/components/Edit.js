import React from "react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { BsFillTrashFill } from "react-icons/bs";
import styled from "styled-components";

const Edit = ({
  review,
  updatedReview,
  movieId,
  refetchUserData,
  setRefetchUserData,
  rating,
}) => {
  const [editedReview, setEditedReview] = useState(review);
  const [editedRating, setEditedRating] = useState(rating);

  const deleteReview = (movieId) => {
    console.log(movieId);
    fetch(`http://localhost:8000/api/deleteinfo`, {
      method: "DELETE",
      headers: {
        Accept: "aplication/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ id: movieId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRefetchUserData(!refetchUserData);
      });
  };
  return (
    <>
      <Div>
        <label>update your rating</label>
        <Input
          onChange={(e) => setEditedRating(e.target.value)}
          min={0}
          max={5}
          type="number"
        />
      </Div>
      <Textarea
        onChange={(e) => setEditedReview(e.target.value)}
        placeholder={"Edit your review?"}
      ></Textarea>
      <IconsDiv>
        <CiEdit
          size={30}
          onClick={() => {
            updatedReview(editedReview, movieId, editedRating);
          }}
        />
        <BsFillTrashFill
          size={20}
          onClick={() => {
            deleteReview(movieId);
          }}
        />
      </IconsDiv>
    </>
  );
};

const Textarea = styled.textarea`
  border: 5px solid #b8b6b6;
  border-radius: 5px;
  background-color: white;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 16px;
  padding: 10px;
  resize: none;
  margin-top: 10px;
  &:focus {
    outline: none;
  }
`;

const IconsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Input = styled.input``;

const Div = styled.div``;

export default Edit;

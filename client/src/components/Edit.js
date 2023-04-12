import React from "react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { BsFillTrashFill } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import styled from "styled-components";

const Edit = ({
  review,
  updatedReview,
  movieId,
  refetchUserData,
  setRefetchUserData,
  rating,
  id,
}) => {
  const [editedReview, setEditedReview] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const [editmode, setEditmode] = useState(false);

  console.log(editedRating, editedReview);

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
        setEditmode(false);
        setRefetchUserData(!refetchUserData);
      });
  };
  return (
    <Wrapper key={id}>
      {editmode && (
        <>
          <Div>
            <label>update your rating</label>
            <ReactStars
              activeColor={"#dbbf09"}
              onChange={(newRating) => setEditedRating(newRating)}
              size={30}
              isHalf={true}
            />
          </Div>
          <Textarea
            onChange={(e) => setEditedReview(e.target.value)}
            value={editedReview}
            placeholder={"Edit your review?"}
          ></Textarea>
        </>
      )}
      <IconsDiv>
        {editmode ? (
          <CiEdit
            size={30}
            onClick={() => {
              updatedReview(editedReview, movieId, editedRating);
            }}
          />
        ) : (
          <CiEdit
            size={30}
            onClick={() => {
              setEditmode(true);
            }}
          />
        )}
        <BsFillTrashFill
          size={20}
          onClick={() => {
            setEditedRating(0);
            deleteReview(movieId);
            setEditedReview("");
          }}
        />
      </IconsDiv>
    </Wrapper>
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

const Wrapper = styled.div``;

export default Edit;

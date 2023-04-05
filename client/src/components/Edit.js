import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { FcEditImage } from "react-icons/fc";
import { BsFillTrashFill } from "react-icons/bs";

const Edit = ({
  review,
  updatedReview,
  movieId,
  refetchUserData,
  setRefetchUserData,
}) => {
  const [editedReview, setEditedReview] = useState(review);

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
      <Textarea onChange={(e) => setEditedReview(e.target.value)}>
        {review}
      </Textarea>
      <IconsDiv>
        <FcEditImage
          size={30}
          onClick={() => {
            updatedReview(editedReview, movieId);
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
  border: 5px solid #9e0505;
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
export default Edit;

import { useState, useEffect } from "react";

const Home = () => {
  useEffect(() => {
    fetch("http://localhost:8000/url")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return <h1>Home</h1>;
};

export default Home;

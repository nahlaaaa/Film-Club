import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return isAuthenticated && <Button onClick={() => logout()}>sign out</Button>;
};

const Button = styled.button`
  font-family: "Bai Jamjuree", sans-serif;
  background-color: white;
  border: none;
  color: black;
  padding: 5px 5px;
  height: 35px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 15px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0px 5px 15px rgba(75, 93, 104, 0.15);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8f8b8b;
  }
`;

export default LogoutButton;

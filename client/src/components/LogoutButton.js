import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return isAuthenticated && <Button onClick={() => logout()}>sign out</Button>;
};


const Button = styled.button`
  background-color: #faf5f5;
  border: none;
  color:#9e0505;
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

export default LogoutButton;

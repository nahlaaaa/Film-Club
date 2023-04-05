import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const SignIn = () => {
  console.log("here");
  const { isLoading, error } = useAuth0();
  console.log(error);

  return (
    <main className="colum">
      <h1></h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <Wrapper>
          <Profile />
          <LoginButton />
          <LogoutButton />
        </Wrapper>
      )}
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default SignIn;

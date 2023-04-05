import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <ProfileLink to={"/userprofile"}>
        <>
          {isAuthenticated && (
            <Container>
              <H2>{user.name}</H2>
              {user?.picture && <Img src={user.picture} alt={user?.name} />}
              {/* <ul>
          {Object.keys(user).map((objKey, i) => (
            <li key={i}>
              {objKey}: {user[objKey]}
            </li>
          ))}
        </ul> */}
            </Container>
          )}
        </>
      </ProfileLink>
    </Wrapper>
  );
};

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;
const Wrapper = styled.div`
  display: flex;
`;

const H2 = styled.h2`
  color: white;
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 15px;
`;
export default Profile;

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
            <article className="row">
              {user?.picture && <Img src={user.picture} alt={user?.name} />}
              <H2>Welcome backe {user.name}</H2>
              {/* <ul>
          {Object.keys(user).map((objKey, i) => (
            <li key={i}>
              {objKey}: {user[objKey]}
            </li>
          ))}
        </ul> */}
            </article>
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
export default Profile;

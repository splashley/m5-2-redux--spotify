import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {
  requestArtistProfile,
  receiveArtistProfile,
  requestArtistProfileError,
} from "../../actions";
import styled from "styled-components";

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const artist = useSelector((state) => state.artists.currentArtist);
  const artistStatus = useSelector((state) => state.artists.status);
  const { id } = useParams();
  const numAbbreviation = (followers) => {
    const num = Number(followers);
    if (followers > 999 && followers < 999999) {
      return `${Math.round(num / 1000)}` + "K";
    } else if (followers > 999999 && followers < 999999999) {
      return `${Math.round(num / 1000000)}` + "M";
    } else {
      return num;
    }
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    try {
      dispatch(requestArtistProfile());
      fetchArtistProfile(accessToken, id).then((json) =>
        dispatch(receiveArtistProfile(json))
      );
    } catch (error) {
      console.log(error);
      dispatch(requestArtistProfileError());
    }
  }, [accessToken, id]);

  if (artistStatus.status === "loading" || !artist) {
    return <h1>Loading</h1>;
  }
  return (
    <Wrapper>
      <ProfilePic src={artist.profile.images[0].url}></ProfilePic>
      <Name>{artist.profile.name}</Name>
      <Followers>
        <FollowersTotal>
          {numAbbreviation(artist.profile.followers.total)}
        </FollowersTotal>
        <FollowersText> followers</FollowersText>
      </Followers>
      <TagTitle>Tags</TagTitle>
      <Tag>
        <TagList>
          {artist.profile.genres.slice(0, 2).map((genre) => (
            <TagItem>{genre}</TagItem>
          ))}
        </TagList>
      </Tag>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin: auto;
  background-color: #0b0f14;
  padding-top: 50px;
`;

const ProfilePic = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  margin: auto;
`;

const Name = styled.div`
  color: #ffffff;
  background-color: transparent;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-top: -50px;
`;

const Followers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FollowersText = styled.h2`
  color: white;
  font-size: 1rem;
  font-weight: 100;
  padding: 5px;
  text-align: center;
`;

const FollowersTotal = styled.h2`
  color: #ff4fd8;
  font-size: 1rem;
  padding: 5px;
  text-align: center;
`;

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TagTitle = styled.div`
  color: #ffffff;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 20px;
`;
const TagList = styled.div`
  display: flex;
  color: white;
`;

const TagItem = styled.div`
  background: rgba(75, 75, 75, 0.4);
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  font-size: 0.75rem;
  text-transform: lowercase;
`;

export default ArtistRoute;

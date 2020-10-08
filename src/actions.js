export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

export const requestArtistProfile = () => ({
  type: "REQUEST_ARTIST_PROFILE",
});

export const receiveArtistProfile = (profile) => ({
  type: "RECEIVE_ARTIST_PROFILE",
  profile,
});

export const requestArtistProfileError = () => ({
  type: "REQUEST_ARTIST_PROFILE_ERROR",
});

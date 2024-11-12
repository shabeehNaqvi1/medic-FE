import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

const logoutUrl = [
  `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?`,
  `client_id=${process.env.AUTH0_CLIENT_ID}`,
  `&returnTo=${process.env.AUTH0_BASE_URL}`,
];

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      screen_hint: "login",
      audience: process.env.AUTH0_AUDIENCE,
    },
  }),
  signupDoctor: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
      redirect_uri:
        "https://medic-chat-front-end.vercel.app/create-doctor-profile",
      audience: process.env.AUTH0_AUDIENCE,
    },
  }),
  signupPatient: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
      redirect_uri: "https://medic-chat-front-end.vercel.app/doctors",
      audience: process.env.AUTH0_AUDIENCE,
    },
  }),
  logout: handleLogout({
    returnTo: logoutUrl.join(""),
  }),
});


export const PUT = handleAuth();
export const DELETE = handleAuth();


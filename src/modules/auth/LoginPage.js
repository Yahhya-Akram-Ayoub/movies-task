import React from "react";
import { Container } from "@mui/material";
import { LoginForm, BgSVG } from "./components";
import ThemeSelector from "./styles/ThemeSelector";

const LoginPage = () => {
  return (
    <ThemeSelector>
      <Container className={"auth-container"} maxWidth="sm">
        <BgSVG />
        <LoginForm />
      </Container>
    </ThemeSelector>
  );
};

export default LoginPage;

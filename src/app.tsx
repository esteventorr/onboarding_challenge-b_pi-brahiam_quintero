import { useState } from "react";
import { Button } from "./components/atoms/button/button";
import { Input } from "./components/atoms/input/input";
import { Typography } from "./components/atoms/typography/typography";
import "./app.scss";
import { LoginForm } from "./components/organisms/login-form/login-form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUpForm } from "./components/organisms/sign-up-form/sign-up-form";

function App() {
  // TODO: Mover ésta Página a atom Arch correctamente
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    alert("Data: " + username + " - " + password);
  };

  return (
    <div className="app">
      <div className="app__container">
        <Router>
          <Routes>
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/signin" element={<LoginForm />} />
            <Route
              path="/"
              element={
                <>
                  <div className="app__gradient"></div>
                  <Typography variant="hero" color="black">
                    Welcome to React Template Onboarding
                  </Typography>
                  <Input
                    size="medium"
                    state="normal"
                    value={username}
                    onChange={setUsername}
                    placeholder="Nombre de usuario"
                    fullWidth={true}
                    controlEvent={true}
                    tabIndexElement={1}
                  ></Input>
                  <Input
                    size="medium"
                    state="normal"
                    value={password}
                    onChange={setPassword}
                    placeholder="Password"
                    type="password"
                    fullWidth={true}
                    controlEvent={true}
                    tabIndexElement={2}
                  ></Input>
                  <br></br>
                  <Button
                    tabIndexInner={3}
                    size="medium"
                    color="primary"
                    onClick={(handleClick)}
                  >
                    Enviar
                  </Button>
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

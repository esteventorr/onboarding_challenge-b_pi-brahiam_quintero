import { FC, useEffect, useRef, useState } from "react";

import { Form } from "../../molecules/form/form";
import { Input } from "../../atoms/input/input";
import { Button } from "../../atoms/button/button";
import { Link } from "../../atoms/link/link";
import { Typography } from "../../atoms/typography/typography";
import "./login-form.scss";
import { useCheckUser } from "../../../hooks/use-check-username/use-check-username";
import { useCheckPassword } from "../../../hooks/use-check-password/use-check-password";
import { login } from "../../../services/login";

export const LoginForm: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userErrorMessage } = useCheckUser(username, true, true);
  const { passwordErrorMessage } = useCheckPassword(password);

  const handleLogin = async () => {
    console.log("here");
    let inputUsername = document
      .querySelector('[id-element="username"]')
      ?.getAttribute("value");
    if (inputUsername == null || inputUsername == undefined) inputUsername = "";
    let inputPassword = document
      .querySelector('[id-element="password"]')
      ?.getAttribute("value");
    if (inputPassword == null || inputPassword == undefined) inputPassword = "";
    const data = await login({
      username: inputUsername,
      password: inputPassword,
    });
    if (data) {
      // handle successful login
      console.log("login successful");
    } else {
      // handle login error
    }
  };

  return (
    <Form className="login-form form">
      <Typography align="left" variant="amountSecondary" color="black">
        Iniciar Sesión
      </Typography>
      <hr></hr>
      <Input
        idElement="username"
        size="medium"
        state={userErrorMessage == "" ? "normal" : "error"}
        error-helper={userErrorMessage}
        value={username}
        onChange={setUsername}
        placeholder="Ej. name@example.com"
        fullWidth={true}
        controlEvent={true}
        tabIndexElement={1}
        label="Correo Electrónico"
      />
      <Input
        idElement="password"
        size="medium"
        state={passwordErrorMessage == "" ? "normal" : "error"}
        error-helper={passwordErrorMessage}
        value={password}
        onChange={setPassword}
        placeholder="*****"
        type="password"
        fullWidth={true}
        controlEvent={true}
        tabIndexElement={2}
        label="Contraseña"
      />
      <div className="login-form__footer form__footer">
        <Link disabled={false} href="/register">
          Registrate Aquí
        </Link>
        <Button
          disabled={Boolean(userErrorMessage || passwordErrorMessage)}
          size="medium"
          color="primary"
          idelement="button"
          onClick={handleLogin}
        >
          Iniciar Sesión
        </Button>
      </div>
    </Form>
  );
};

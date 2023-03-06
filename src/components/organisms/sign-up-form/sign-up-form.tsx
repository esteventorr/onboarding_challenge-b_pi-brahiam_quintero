import { FC, useEffect, useState } from "react";
import { Form } from "../../molecules/form/form";
import { Input } from "../../atoms/input/input";
import { Button } from "../../atoms/button/button";
import { Link } from "../../atoms/link/link";
import { Typography } from "../../atoms/typography/typography";
import { Checkbox } from "../../atoms/checkbox/checkbox";
import { useCheckboxList } from "./use-checkbox-list/use-checkbox-list";
import { useCheckUser } from "../../../hooks/use-check-username/use-check-username";
import { useCheckPassword } from "../../../hooks/use-check-password/use-check-password";
import { useCheckEmail } from "../../../hooks/use-check-email/use-check-email";
import "./sign-up-form.scss";
import { signup } from "../../../services/sign-up";

export const SignUpForm: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");
  const { categoryValues, categoriesErrorMessage } = useCheckboxList();
  const { userErrorMessage } = useCheckUser(username, false, false);
  const { passwordErrorMessage } = useCheckPassword(password);
  const { emailErrorMessage } = useCheckEmail(email, true);

  const handleSignUp = async () => {
    console.log("here", categoryValues);
    let inputUsername = document
      .querySelector('[id-element="username"]')
      ?.getAttribute("value");
    if (inputUsername == null || inputUsername == undefined) inputUsername = "";
    let inputEmail = document
      .querySelector('[id-element="email"]')
      ?.getAttribute("value");
    if (inputEmail == null || inputEmail == undefined) inputEmail = "";
    let inputPassword = document
      .querySelector('[id-element="password"]')
      ?.getAttribute("value");
    if (inputPassword == null || inputPassword == undefined) inputPassword = "";
    const checkboxes = document.querySelectorAll(
      ".sign-up-form__categories-list .sign-up-form__categories-checkbox"
    );
    let categoriesValuesInteger: number[] = [];
    checkboxes.forEach((checkbox) => {
      let value = checkbox.getAttribute("value");
      let checked = checkbox.getAttribute("checked");
      if (checked == "true") {
        categoriesValuesInteger.push(value ? parseInt(value) : -1);
      }
    });

    const data = await signup({
      name: inputUsername,
      email: inputEmail,
      password: inputPassword,
      category: categoriesValuesInteger,
    });
    if (data) {
      console.log("SignUp successful", data);
    } else {
      console.log("SignUp failed", data);
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setConfirmPasswordErrorMessage("Las Contraseñas No Coinciden");
    } else if (confirmPassword === "") {
      setConfirmPasswordErrorMessage("Confirmar Contraseña es requerido");
    } else {
      setConfirmPasswordErrorMessage("");
    }
  }, [confirmPassword]);

  return (
    <Form className="sign-up-form form">
      <Typography
        class="sign-up-form__title"
        align="left"
        variant="amountSecondary"
        color="black"
      >
        Registrate
      </Typography>
      <hr></hr>
      <Input
        idElement="username"
        size="medium"
        state={userErrorMessage == "" ? "normal" : "error"}
        error-helper={userErrorMessage}
        value={username}
        onChange={setUsername}
        placeholder="Ej. John Doe"
        fullWidth={true}
        controlEvent={true}
        tabIndexElement={1}
        label="Nombre de Usuario"
      />
      <Input
        idElement="email"
        size="medium"
        state={emailErrorMessage == "" ? "normal" : "error"}
        error-helper={emailErrorMessage}
        value={email}
        onChange={setEmail}
        placeholder="Ej. name@example.com"
        fullWidth={true}
        controlEvent={true}
        tabIndexElement={2}
        label="Correo Electrónico"
        type="email"
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
        tabIndexElement={3}
        label="Contraseña"
      />
      <Input
        idElement="confirm-password"
        size="medium"
        state={confirmPasswordErrorMessage !== "" ? "error" : "normal"}
        error-helper={
          confirmPasswordErrorMessage !== "" ? confirmPasswordErrorMessage : ""
        }
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="*****"
        type="password"
        fullWidth={true}
        controlEvent={true}
        tabIndexElement={4}
        label="Confirmar Contraseña"
      />
      <div className="sign-up-form__categories">
        <Typography align="left" variant="amountSecondary" color="black">
          Categorias
        </Typography>
        <div className="sign-up-form__categories-list">
          <Checkbox
            class="sign-up-form__categories-checkbox"
            idElement="anime"
            value="58"
            checked={categoryValues.includes("58")}
          >
            Anime
          </Checkbox>
          <Checkbox
            class="sign-up-form__categories-checkbox"
            idElement="cienfin"
            value="59"
            checked={categoryValues.includes("59")}
          >
            Ciencia Ficción
          </Checkbox>
          <Checkbox
            class="sign-up-form__categories-checkbox"
            idElement="novelas"
            value="60"
            checked={categoryValues.includes("60")}
          >
            Novelas
          </Checkbox>
          <Checkbox
            class="sign-up-form__categories-checkbox"
            idElement="drama"
            value="61"
            checked={categoryValues.includes("61")}
          >
            Drama
          </Checkbox>
          <Checkbox
            class="sign-up-form__categories-checkbox"
            idElement="intart"
            value="62"
            checked={categoryValues.includes("62")}
          >
            Inteligencia Artificial
          </Checkbox>
        </div>
        {categoriesErrorMessage !== "" && (
          <Typography align="left" variant="bodyText" color="error">
            {categoriesErrorMessage}
          </Typography>
        )}
      </div>
      <div className="sign-up-form__footer form__footer">
        <Link disabled={false} href="/signin">
          Iniciar sesión
        </Link>
        <Button
          disabled={Boolean(
            userErrorMessage ||
              emailErrorMessage ||
              passwordErrorMessage ||
              confirmPasswordErrorMessage ||
              categoriesErrorMessage
          )}
          size="medium"
          color="primary"
          onClick={handleSignUp}
        >
          Registrar
        </Button>
      </div>
    </Form>
  );
};

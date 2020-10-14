import {
  Flex,
  Text,
  Box,
  Button,
  Collapse,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/core";
import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEmailServiceController } from "../../../backend-api/EmailServiceController";
import ProffyInput from "../../ProffyInput";
import SuccessBanner from "../../SuccessBanner";

const schema = yup.object().shape({
  password: yup.string().required().min(10),
});

export default function ConfirmRegistrationForm(props: {
  query?: any;
  onSuccess: () => any;
}) {
  const [errorBox, setErrorBox] = useState(null);
  const router = useRouter();
  const emailServiceController = useEmailServiceController();
  const rawToken = props.query?.token;

  let token;
  try {
    if (!rawToken) throw new Error("Token not found");
    token = jwtDecode(rawToken);
    if (new Date() > new Date(Number(token.exp) * 1000))
      throw new Error("Token expired");
  } catch {
    (async () => {
      router.push("/");
    })();
    return <></>;
  }
  const { email, firstName, lastName, phoneNumber } = token;

  const { errors, handleSubmit, register } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    emailServiceController
      .confirm({
        password: data.password,
        token: rawToken,
      })
      .then(props.onSuccess)
      .catch((err: AxiosError) => {
        switch (err.response.status) {
          case 400:
            setErrorBox(
              "O token aparenta estar expirado e/ou já registrado, verifique os dados e tente novamente."
            );
          case 500:
            setErrorBox("Erro ao finalizar cadastro.");
        }
      });
  };

  return (
    <Flex
      flexDirection="column"
      alignContent="stretch"
      width="100%"
      maxWidth="25em"
    >
      <Text color="texts_titles" fontSize="2em" fontWeight="bold">
        Confirmação de cadastro
      </Text>
      <Text color="texts_base" fontSize="1em">
        Confira os dados e insira uma senha (mínimo de 10 caracteres).
      </Text>
      <Box height="2em" />
      <Collapse
        isOpen={errorBox !== null}
        marginBottom="2em"
        borderRadius="8px"
      >
        <Alert status="error" padding="1em">
          <AlertIcon marginRight="1em" />
          <AlertTitle mr={2}>{errorBox}</AlertTitle>
          <CloseButton onClick={() => setErrorBox(null)} />
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" width="100%">
          <ProffyInput
            placeholder="Primeiro nome"
            roundBottomBorder={false}
            paddingY="2em"
            isDisabled
            value={firstName}
          />
          <ProffyInput
            placeholder="Sobrenome"
            roundTopBorder={false}
            roundBottomBorder={false}
            paddingY="2em"
            isDisabled
            value={lastName}
          />
          <ProffyInput
            placeholder="E-mail"
            roundTopBorder={false}
            roundBottomBorder={false}
            paddingY="2em"
            isDisabled
            value={email}
          />
          <ProffyInput
            placeholder="Telefone (celular)"
            roundTopBorder={false}
            roundBottomBorder={false}
            paddingY="2em"
            isDisabled
            value={phoneNumber}
          />
          <ProffyInput
            name="password"
            type="password"
            placeholder="Senha"
            hookRef={register}
            isInvalid={errors.password}
            roundTopBorder={false}
            paddingY="2em"
          />
          <Box height="2em" />
          <Button
            backgroundColor="green"
            color="shapes_01"
            paddingX="button_padding_x"
            paddingY="button_padding_y"
            fontWeight="regular"
            type="submit"
          >
            Confirmar
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

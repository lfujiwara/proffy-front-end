import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Collapse,
  Flex,
  FlexProps,
  Text,
} from "@chakra-ui/core";
import Router from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../contexts/AuthContext";
import ProffyInput from "./ProffyInput";

export default function LoginForm(props: FlexProps) {
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const authData = useContext(AuthContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async (data: any) => {
    if (
      await authData.credentialsLogin(
        data.email,
        data.password,
        data.rememberMe
      )
    )
      Router.back();
    else setWrongCredentials(true);
  };

  return (
    <Flex flexDirection="column" alignContent="stretch" {...props}>
      <Collapse isOpen={wrongCredentials}>
        <Alert status="error" padding="1em">
          <AlertIcon marginRight="1em" />
          <AlertTitle mr={2}>E-mail e/ou senha incorretos</AlertTitle>
          <CloseButton onClick={() => setWrongCredentials(false)} />
        </Alert>
      </Collapse>
      <Text color="texts_titles" fontSize="2em" fontWeight="bold">
        Fazer login
      </Text>
      <Box height="2em" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex alignContent="stretch" flexDirection="column">
          <ProffyInput
            name="email"
            type="email"
            placeholder="E-mail"
            hookRef={register}
            roundBottomBorder={false}
            paddingY="2em"
          />
          <ProffyInput
            name="password"
            type="password"
            placeholder="Senha"
            hookRef={register}
            roundTopBorder={false}
            paddingY="2em"
          />
          <Box height="2em" />
          <Flex alignItems="center">
            <Checkbox
              colorScheme="custom_green"
              name="rememberMe"
              ref={register}
            >
              <Text color="texts_complements" marginLeft="0.25em">
                Lembrar de mim
              </Text>
            </Checkbox>
          </Flex>
          <Box height="2em" />
          <Button
            backgroundColor="green"
            color="shapes_01"
            paddingX="button_padding_x"
            paddingY="button_padding_y"
            fontWeight="regular"
            type="submit"
          >
            Entrar
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

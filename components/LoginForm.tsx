import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  CloseButton,
  Checkbox,
  Flex,
  FlexProps,
  Text,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import ProffyInput from "./ProffyInput";
import { useContext, useState } from "react";
import AuthContext, { isAuthenticated } from "../contexts/AuthContext";

export default function LoginForm(props: FlexProps) {
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const authData = useContext(AuthContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async (data: any) => {
    await authData.credentialsLogin(data.email, data.password, data.rememberMe);
    if (!isAuthenticated(authData)) setWrongCredentials(true);
  };

  return (
    <Flex flexDirection="column" alignContent="stretch" {...props}>
      {!!wrongCredentials && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Your browser is outdated!</AlertTitle>
          <AlertDescription>
            Your Chakra experience may be degraded.
          </AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
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
              variantColor="custom_green"
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

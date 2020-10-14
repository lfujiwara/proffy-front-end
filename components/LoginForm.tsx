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
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../contexts/AuthContext";
import ProffyInput from "./ProffyInput";

export default function LoginForm(props: FlexProps) {
  const router = useRouter();
  const [errorBox, setErrorBox] = useState<null | string>(null);
  const authData = useContext(AuthContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async (data: any) => {
    try {
      if (
        await authData.credentialsLogin(
          data.email,
          data.password,
          data.rememberMe
        )
      )
        router.push({
          pathname: router.query.backTo
            ? router.query.backTo.toString()
            : "/home",
        });
    } catch (err) {
      if (err?.request?.status == 400)
        setErrorBox("E-mail e/ou senha incorretos.");
      if (err?.request?.status >= 500) setErrorBox("Erro desconhecido.");
    }
  };

  return (
    <Flex flexDirection="column" alignContent="stretch" {...props}>
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

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Collapse,
  Flex,
  FlexProps,
  Text,
} from "@chakra-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEmailServiceController } from "../../../backend-api/EmailServiceController";
import { useUsersController } from "../../../backend-api/UsersController";
import ProffyInput from "../../ProffyInput";

export default function RegisterForm(
  props: FlexProps & { onSuccess: () => any }
) {
  const usersController = useUsersController();
  const emailServiceController = useEmailServiceController();
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required()
      .min(1)
      .max(128)
      .matches(/^[ À-ÿA-Za-z]+$/),
    lastName: yup
      .string()
      .required()
      .min(1)
      .max(128)
      .matches(/^[ À-ÿA-Za-z]+$/),
    email: yup
      .string()
      .required()
      .email()
      .test("email", "validate email", async (value) => {
        try {
          await usersController.validateEmail(value);
          return true;
        } catch {
          return false;
        }
      }),
    phoneNumber: yup
      .string()
      .required()
      .min(8)
      .max(20)
      .test("phoneNumber", "validate phone number", async (value) => {
        try {
          await usersController.validatePhoneNumber(value);
          return true;
        } catch {
          return false;
        }
      }),
  });

  const { register, handleSubmit, watch, errors, control } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const [errorBox, setErrorBox] = useState(null);
  const onSubmit = async (data) => {
    try {
      await emailServiceController.register(data);
      props.onSuccess();
    } catch {
      setErrorBox("Houve um erro ao realizar o cadastro.");
    }
  };

  return (
    <Flex flexDirection="column" alignContent="stretch" {...props}>
      <Text color="texts_titles" fontSize="2em" fontWeight="bold">
        Cadastro
      </Text>
      <Text color="texts_base" fontSize="1em">
        Preencha os dados abaixo para começar.
      </Text>
      <Box height="2em" />
      <Collapse isOpen={errorBox !== null}>
        <Alert status="error" padding="1em">
          <AlertIcon marginRight="1em" />
          <AlertTitle mr={2}>{errorBox}</AlertTitle>
          <CloseButton onClick={() => setErrorBox(null)} />
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex alignContent="stretch" flexDirection="column">
          <ProffyInput
            name="firstName"
            type="text"
            placeholder="Primeiro nome"
            hookRef={register}
            roundBottomBorder={false}
            paddingY="2em"
          />
          <ProffyInput
            name="lastName"
            type="text"
            placeholder="Sobrenome"
            hookRef={register}
            roundTopBorder={false}
            roundBottomBorder={false}
            paddingY="2em"
          />
          <ProffyInput
            name="email"
            type="email"
            placeholder="E-mail"
            hookRef={register}
            roundTopBorder={false}
            roundBottomBorder={false}
            paddingY="2em"
            isInvalid={errors.email}
          />
          <ProffyInput
            name="phoneNumber"
            type="text"
            placeholder="Telefone (celular)"
            hookRef={register}
            roundTopBorder={false}
            paddingY="2em"
            isInvalid={errors.phoneNumber}
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
            Entrar
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

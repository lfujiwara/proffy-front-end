import { Box, Button, Checkbox, Flex, FlexProps, Text } from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import ProffyInput from "./ProffyInput";

export default function LoginForm(props: FlexProps) {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Flex flexDirection="column" alignContent="stretch" {...props}>
      <Text color="texts_titles" fontSize="2em" fontWeight="bold">
        Fazer login
      </Text>
      <Box height="1em" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex alignContent="stretch" flexDirection="column">
          <ProffyInput
            name="email"
            type="email"
            placeholder="E-mail"
            hookRef={register}
            roundBottomBorder={false}
          />
          <ProffyInput
            name="password"
            type="password"
            placeholder="Senha"
            hookRef={register}
            roundTopBorder={false}
          />
          <Box height="0.5em" />
          <Flex alignItems="center">
            <Checkbox
              variantColor="custom_green"
              name="rememberMe"
              ref={register}
            >
              <Text color="texts_complements">Lembrar de mim</Text>
            </Checkbox>
          </Flex>
          <Box height="0.75em" />
          <Button
            backgroundColor="green"
            color="shapes_01"
            paddingX="2em"
            paddingY="1.5em"
            fontFamily="titles"
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

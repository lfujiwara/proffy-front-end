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

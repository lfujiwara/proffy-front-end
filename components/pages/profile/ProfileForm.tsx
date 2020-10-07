import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
} from "@chakra-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import * as yup from "yup";
import { useSubjectsController } from "../../../backend-api/SubjectsController";
import { useUsersController } from "../../../backend-api/UsersController";
import AuthContext from "../../../contexts/AuthContext";
import IAuthenticatedUserData from "../../../models/IAuthenticatedUserData";
import ProfileFormSection from "./ProfileFormSection";

interface UserData extends IAuthenticatedUserData {}

const schema = yup.object().shape({
  firstName: yup.string().required().min(1).max(128).matches("^[ À-ÿA-Za-z]+$"),
  lastName: yup.string().required().min(1).max(128).matches("^[ À-ÿA-Za-z]+$"),
  currency: yup.string().max(4),
  hourlyRate: yup
    .number()
    .min(0)
    .transform((value) => value * 100),
});

export default function ProfileForm() {
  const authData = useContext(AuthContext);
  const usersController = useUsersController();
  const subjectsController = useSubjectsController();
  const { control, register, handleSubmit, errors } = useForm<UserData>({
    defaultValues: {
      ...authData.userData,
      hourlyRate: authData.userData?.hourlyRate / 100,
    },
    resolver: yupResolver(schema),
  });
  const [subjectIds, setSubjectIds] = useState([]);
  const onSubmit = usersController.updateMe;

  const fetchSubjectIds = async () => {
    subjectsController.get().then(setSubjectIds);
  };
  const fetchData = () => {
    fetchSubjectIds();
  };

  useEffect(fetchData, []);

  const baseInputProps = {
    padding: "1em",
    backgroundColor: "shapes_02",
    _focus: {
      borderColor: "back_lines_in_white",
      boxShadow: "0 0 0 1px lightgray",
    },
  };
  const inputProps = {
    ...baseInputProps,
    ref: register,
  };

  const labelProps = { color: "texts_complements", fontSize: "0.875em" };

  return (
    <Flex
      backgroundColor="shapes_01"
      borderRadius="8px"
      width="100%"
      maxWidth="4xl"
      boxShadow="md"
      marginTop="-2em"
      overflow="hidden"
      padding={["1em", "2em", "2em", "3em"]}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Flex flexDirection="column" width="100%">
          <ProfileFormSection title="Seus dados" first>
            <FormControl
              marginRight={["0", "1em"]}
              marginBottom={["1em", "0"]}
              width={["100%", "calc(50% - 0.5em)"]}
              isInvalid={!!errors.firstName}
            >
              <FormLabel {...labelProps}>Nome</FormLabel>
              <Input name="firstName" type="text" {...inputProps} />
            </FormControl>

            <FormControl
              marginBottom={["1em", "0"]}
              width={["100%", "calc(50% - 0.5em)"]}
              isInvalid={!!errors.lastName}
            >
              <FormLabel {...labelProps}>Sobrenome</FormLabel>
              <Input name="lastName" type="text" {...inputProps} />
            </FormControl>

            <FormControl
              marginTop="1em"
              marginRight={["0", "1em"]}
              marginBottom={["1em", "0"]}
              width={["100%", "calc(50% - 0.5em)"]}
              isDisabled
            >
              <FormLabel {...labelProps}>E-mail</FormLabel>
              <Input name="email" type="text" {...inputProps} />
            </FormControl>

            <FormControl
              marginTop="1em"
              marginBottom={["1em", "0"]}
              width={["100%", "calc(50% - 0.5em)"]}
              isDisabled
            >
              <FormLabel {...labelProps}>Telefone (celular)</FormLabel>
              <Input name="phoneNumber" type="text" {...inputProps} />
            </FormControl>

            <FormControl marginTop="1em" isInvalid={!!errors.biography}>
              <FormLabel {...labelProps}>Biografia</FormLabel>
              <Textarea name="biography" {...inputProps} />
            </FormControl>
          </ProfileFormSection>

          <ProfileFormSection title="Sobre a aula">
            <FormControl
              marginBottom={["1em", "0"]}
              marginRight={["0", "1em"]}
              width={["100%", "calc(50% - 0.5em)"]}
              isInvalid={!!errors.subjectId}
            >
              <FormLabel {...labelProps}>Matéria</FormLabel>
              <Select name="subjectId" {...baseInputProps} padding="0">
                {subjectIds.map((subjectId) => (
                  <option value={subjectId}>
                    &nbsp;&nbsp;&nbsp;{subjectId}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Flex
              flexDirection="row"
              marginBottom={["1em", "0"]}
              width={["100%", "calc(50% - 0.5em)"]}
            >
              <FormControl
                width="6em"
                marginRight="0.5em"
                isInvalid={!!errors.currency}
              >
                <FormLabel {...labelProps}>Moeda</FormLabel>
                <Input name="currency" type="text" {...inputProps} />
              </FormControl>

              <FormControl>
                <FormLabel {...labelProps}>Valor por hora</FormLabel>
                <Controller
                  name="hourlyRate"
                  control={control}
                  as={
                    <NumberInput isInvalid={!!errors.hourlyRate}>
                      <NumberInputField
                        as={NumberFormat}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        {...baseInputProps}
                      />
                    </NumberInput>
                  }
                />
              </FormControl>
            </Flex>
          </ProfileFormSection>
          <Button
            type="submit"
            backgroundColor="green"
            color="shapes_01"
            fontWeight="normal"
            marginTop="2em"
            paddingX="3em"
            paddingY="2em"
            width="unset"
            alignSelf="flex-end"
          >
            Salvar cadastro
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

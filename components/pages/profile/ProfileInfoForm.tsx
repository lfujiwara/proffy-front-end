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
import { baseInputProps, inputLabelProps } from "../../../styles/theme";
import AvailableTimeWindowsForm from "./AvailableTimeWindowsForm";
import ProfileFormSection from "./ProfileFormSection";

interface UserData extends IAuthenticatedUserData {}

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
  currency: yup.string().max(4),
  hourlyRate: yup
    .number()
    .min(0)
    .transform((value) => value * 100),
});

export default function ProfileInfoForm() {
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
  const onSubmit = async (data) => {
    await usersController.updateMe(data);
    await authData.updateUserData();
  };

  const fetchSubjectIds = async () => {
    subjectsController.get().then(setSubjectIds);
  };
  const fetchData = () => {
    fetchSubjectIds();
  };

  useEffect(fetchData, []);

  const inputProps = {
    ...baseInputProps,
    ref: register,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Flex flexDirection="column" width="100%">
        <ProfileFormSection title="Seus dados" first>
          <FormControl
            marginRight={["0", "1em"]}
            marginBottom={["1em", "0"]}
            width={["100%", "calc(50% - 0.5em)"]}
            isInvalid={!!errors.firstName}
          >
            <FormLabel {...inputLabelProps}>Nome</FormLabel>
            <Input name="firstName" type="text" {...inputProps} />
          </FormControl>

          <FormControl
            marginBottom={["1em", "0"]}
            width={["100%", "calc(50% - 0.5em)"]}
            isInvalid={!!errors.lastName}
          >
            <FormLabel {...inputLabelProps}>Sobrenome</FormLabel>
            <Input name="lastName" type="text" {...inputProps} />
          </FormControl>

          <FormControl
            marginTop="1em"
            marginRight={["0", "1em"]}
            marginBottom={["1em", "0"]}
            width={["100%", "calc(50% - 0.5em)"]}
            isDisabled
          >
            <FormLabel {...inputLabelProps}>E-mail</FormLabel>
            <Input name="email" type="text" {...inputProps} />
          </FormControl>

          <FormControl
            marginTop="1em"
            marginBottom={["1em", "0"]}
            width={["100%", "calc(50% - 0.5em)"]}
            isDisabled
          >
            <FormLabel {...inputLabelProps}>Telefone (celular)</FormLabel>
            <Input name="phoneNumber" type="text" {...inputProps} />
          </FormControl>

          <FormControl marginTop="1em" isInvalid={!!errors.biography}>
            <FormLabel {...inputLabelProps}>Biografia</FormLabel>
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
            <FormLabel {...inputLabelProps}>Matéria</FormLabel>
            <Select
              ref={register}
              name="subjectId"
              {...baseInputProps}
              padding="0"
            >
              {subjectIds.map((subjectId) => (
                <option key={subjectId} value={subjectId}>
                  &nbsp;&nbsp;&nbsp;{subjectId}
                </option>
              ))}
            </Select>
          </FormControl>

          <Flex
            flexDirection="row"
            marginBottom="1em"
            width={["100%", "calc(50% - 0.5em)"]}
          >
            <FormControl
              width="6em"
              marginRight="0.5em"
              isInvalid={!!errors.currency}
            >
              <FormLabel {...inputLabelProps}>Moeda</FormLabel>
              <Input name="currency" type="text" {...inputProps} />
            </FormControl>

            <FormControl>
              <FormLabel {...inputLabelProps}>Valor por hora</FormLabel>
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
  );
}

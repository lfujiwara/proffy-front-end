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
import ProfileInfoForm from "./ProfileInfoForm";

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

export default function ProfileForm() {
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
      flexDirection="column"
    >
      <ProfileInfoForm />
      <ProfileFormSection title="Horários">
        <AvailableTimeWindowsForm />
      </ProfileFormSection>
    </Flex>
  );
}

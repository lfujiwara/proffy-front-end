import {
  Button,
  Flex,
  FlexProps,
  FormControl,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import mapNumberToWeekDay from "../../../lib/mapNumberToWeekDay";
import { baseInputProps, inputLabelProps } from "../../../styles/theme";
import useAvailableTimeWindowController from "../../../backend-api/AvailableTimeWindowController";
import IAvailableTimeWindow from "../../../models/IAvailableTimeWindow";

const hours = Array.from(Array(25).keys()).map((i) => i);

const schema = yup.object().shape({
  weekDay: yup.number().integer().min(1).max(7),
  startHour: yup.number().integer().min(0).max(23),
  endHour: yup
    .number()
    .integer()
    .min(1)
    .max(24)
    .when(["startHour"], (startHour: number, schema) =>
      schema.min(startHour + 1)
    ),
});

export default function AvailableTimeWindowForm(props: {
  weekDay?: number;
  startHour?: number;
  endHour?: number;
  onUpdate?: () => any;
  availableWeekDays: number[];
}) {
  const availableTimeWindowController = useAvailableTimeWindowController();
  const form = useForm({ resolver: yupResolver(schema) });
  const {
    weekDay,
    availableWeekDays: propsAvailableWeekDays,
    startHour,
    endHour,
    onUpdate,
  } = props;

  const availableWeekDays = weekDay
    ? [...propsAvailableWeekDays, weekDay].sort()
    : propsAvailableWeekDays.sort();

  const onSubmit = (data: IAvailableTimeWindow) => {
    availableTimeWindowController
      .set(data.weekDay || weekDay, startHour, endHour)
      .then(onUpdate);
  };

  const deleteAtw = () => {
    if (weekDay) availableTimeWindowController.delete(weekDay).then(onUpdate);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Flex flex="1" flexDirection={["column", "row"]} marginBottom="1em">
        <Flex flex="2">
          <FormControl maxWidth="12em" marginRight="0.5em">
            <FormLabel {...inputLabelProps}>Dia</FormLabel>
            <Select
              name="weekDay"
              ref={form.register}
              isInvalid={form.errors.weekDay}
              defaultValue={weekDay}
              disabled={!!weekDay}
              {...baseInputProps}
              padding="0"
            >
              {availableWeekDays.map((availableWeekDay) => (
                <option key={availableWeekDay} value={availableWeekDay}>
                  &nbsp;&nbsp;&nbsp;{mapNumberToWeekDay(availableWeekDay)}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl maxWidth="6em" marginRight="0.5em">
            <FormLabel {...inputLabelProps}>Início</FormLabel>
            <Select
              ref={form.register}
              name="startHour"
              defaultValue={startHour}
              {...baseInputProps}
              padding="0"
              isInvalid={form.errors.startHour}
            >
              {hours.slice(0, 24).map((hour) => (
                <option key={hour} value={hour}>
                  &nbsp;&nbsp;&nbsp;{hour}:00
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl maxWidth="6em" marginRight={["0", "0.5em"]}>
            <FormLabel {...inputLabelProps}>Fim</FormLabel>
            <Select
              ref={form.register}
              name="endHour"
              defaultValue={endHour}
              {...baseInputProps}
              padding="0"
              isInvalid={form.errors.endHour}
            >
              {hours.slice(1).map((hour) => (
                <option key={hour} value={hour}>
                  &nbsp;&nbsp;&nbsp;{hour}:00
                </option>
              ))}
            </Select>
          </FormControl>
        </Flex>
        <Flex flex="1" justifyContent="flex-end">
          <Button
            onClick={deleteAtw}
            backgroundColor="delete"
            color="shapes_01"
            fontWeight="normal"
            width="unset"
            alignSelf="flex-end"
            flex="1"
            marginTop={["0.5em", "0"]}
            marginRight="0.5em"
            disabled={!weekDay}
          >
            Remover
          </Button>
          <Button
            type="submit"
            backgroundColor="green"
            color="shapes_01"
            fontWeight="normal"
            width="unset"
            alignSelf="flex-end"
            flex="1"
            marginTop={["0.5em", "0"]}
          >
            OK
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

AvailableTimeWindowForm.defaultProps = {
  startHour: 12,
  endHour: 13,
};

import { Box, Flex, Text } from "@chakra-ui/core";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useAvailableTimeWindowController from "../../../backend-api/AvailableTimeWindowController";
import IAvailableTimeWindow from "../../../models/IAvailableTimeWindow";
import AvailableTimeWindowCard from "../study/AvailableTimeWindowCard";
import AvailableTimeWindowForm from "./AvailableTimeWindowForm";

const weekDays = [1, 2, 3, 4, 5, 6, 7];

export default function AvailableTimeWindowsForm() {
  const availableTimeWindowController = useAvailableTimeWindowController();

  const [state, setState] = useState({
    atws: new Array<IAvailableTimeWindow>(),
    availableWeekDays: new Array<number>(),
  });

  const fetchAvailableWeekDays = () => {
    availableTimeWindowController.list().then((atws) => {
      const atwSet = new Set(atws.map((atw) => atw.weekDay));
      setState({
        atws,
        availableWeekDays: weekDays.filter((weekDay) => !atwSet.has(weekDay)),
      });
    });
  };

  useEffect(fetchAvailableWeekDays, []);

  return (
    <Flex flexDirection="column" flex="1">
      {state.atws
        .sort((a, b) => a.weekDay - b.weekDay)
        .map((atw) => (
          <AvailableTimeWindowForm
            key={atw.weekDay}
            weekDay={atw.weekDay}
            startHour={atw.startHour}
            endHour={atw.endHour}
            onUpdate={fetchAvailableWeekDays}
            availableWeekDays={state.availableWeekDays}
          />
        ))}
      {state.availableWeekDays.length > 0 && (
        <AvailableTimeWindowForm
          onUpdate={fetchAvailableWeekDays}
          availableWeekDays={state.availableWeekDays}
        />
      )}
    </Flex>
  );
}

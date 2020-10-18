import { Box, Flex, FlexProps, Text } from "@chakra-ui/core";
import mapNumberToWeekDay from "../../../lib/mapNumberToWeekDay";

export default function AvailableTimeWindowCard(
  props: FlexProps & { weekDay: number; startHour?: number; endHour?: number }
) {
  const { weekDay, startHour, endHour, ...flexProps } = props;
  return (
    <Flex
      borderRadius="8px"
      borderWidth="1px"
      borderColor="back_lines_in_white"
      backgroundColor="shapes_02"
      padding="1em"
      flexDirection="column"
      opacity={!!startHour && !!endHour ? "100%" : "40%"}
      {...flexProps}
    >
      <Box marginBottom="1em">
        <Text color="texts_complements" fontSize="0.75em">
          Dia
        </Text>
        <Text color="texts_base" fontWeight="bold">
          {mapNumberToWeekDay(weekDay)}
        </Text>
      </Box>
      <Box>
        <Text color="texts_complements" fontSize="0.75em">
          Horário
        </Text>
        <Text color="texts_base" fontWeight="bold">
          {!!startHour && !!endHour ? `${startHour}h - ${endHour}h` : "N/D"}
        </Text>
      </Box>
    </Flex>
  );
}

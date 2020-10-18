import { Box, Flex, Text } from "@chakra-ui/core";
import IAvailableTimeWindow from "../../../models/IAvailableTimeWindow";
import IUser from "../../../models/IUser";
import Avatar from "../../Avatar";
import HomeButton from "../../HomeButton";
import AvailableTimeWindowCard from "./AvailableTimeWindowCard";

export default function ProffyCard(props: { proffy: IUser }) {
  const { proffy } = props;
  const getProffyTimeWindow: {
    [weekDay: number]: IAvailableTimeWindow | undefined;
  } = proffy.availableTimeWindows.reduce((acc, cur) => {
    acc[cur.weekDay] = cur;
    return acc;
  }, {});

  return (
    <Flex
      flexDirection="column"
      backgroundColor="shapes_01"
      border="1px solid"
      borderColor="back_lines_in_white"
      padding="2em"
      width="100%"
      borderRadius="8px"
    >
      <Flex alignItems="center">
        <Avatar name="" imageHeight="80px" marginRight="1em" />
        <Flex flexDirection="column">
          <Text fontSize="1.5em" color="texts_titles" fontWeight="bold">
            {proffy.firstName} {proffy.lastName}
          </Text>
          <Text color="texts_base">Matemática</Text>
        </Flex>
      </Flex>
      <Text marginY="2em" color="texts_base">
        {proffy.biography || "N/D"}
      </Text>
      <Flex
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-around"
        width="100%"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <AvailableTimeWindowCard
            width="110px"
            margin="0.25em"
            weekDay={day}
            startHour={getProffyTimeWindow[day]?.startHour}
            endHour={getProffyTimeWindow[day]?.endHour}
          />
        ))}
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding="2em"
        marginX="-2em"
        marginTop="2em"
        marginBottom="-2em"
        borderBottomRadius="8px"
        borderTop="1px solid"
        borderTopColor="back_lines_in_white"
        backgroundColor="shapes_02"
      >
        <Flex alignItems="center">
          <Text color="texts_complements" display="inline-block">
            Preço/hora
          </Text>
          <Text
            color="purple"
            display="inline-block"
            fontSize="1.25em"
            marginLeft="1em"
          >
            {proffy.currency} {(proffy.hourlyRate / 100).toFixed(2)}
          </Text>
        </Flex>

        <Box>
          <HomeButton
            backgroundColor="green"
            padding="1.5em"
            fontWeight="normal"
            onClick={() =>
              (window.location.href = `https://api.whatsapp.com/send?phone=${proffy.phoneNumber}`)
            }
          >
            Entrar em contato
          </HomeButton>
        </Box>
      </Flex>
    </Flex>
  );
}

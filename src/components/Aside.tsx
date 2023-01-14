import { Box } from "@chakra-ui/react";
import styled from "styled-components";
import TabList from "./TabList";

const Logo = styled.div`
  height: 100px;
  width: 100px;
  border: 1px;
  border-color: red;
`;

export default function Aside() {
  return (
    <Box
      position="fixed"
      bgColor="#141517"
      w="240px"
      h="930px"
      left="0"
      top="0"
      zIndex="500"
    >
      <Logo />
      <TabList />
    </Box>
  );
}

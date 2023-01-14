import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Aside from "./Aside";
import { Grid, GridItem } from "@chakra-ui/react";
import styled from "styled-components";

const Homewrap = styled.div`
  padding-left: 240px;
  padding-top: 56px;
  height: 100%;
  background-color: black;
`;

export default function Root() {
  return (
    <>
      <Aside />
      <Header />
      <Grid
        h="200px"
        templateColumns="repeat(1, 1fr)"
        templateRows="repeat(2, 1fr)"
      >
        <Homewrap>
          <GridItem
            rowSpan={1}
            colSpan={2}
            paddingLeft={"40px"}
            paddingRight={"40px"}
          >
            <Outlet />
          </GridItem>
          <GridItem rowSpan={1} colSpan={2}>
            <Footer />
          </GridItem>
        </Homewrap>
      </Grid>
    </>
  );
}

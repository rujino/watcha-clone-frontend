import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { FaBoxes, FaFilm } from "react-icons/fa";
import { Button } from "@chakra-ui/react";

const TabMenu = styled.ul`
  background-color: #141517;
  font-weight: bold;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  /* text-align: center; */
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 13px;

  .submenu {
    width: 100% auto;
    padding: 10px 10px;
    cursor: pointer;
  }
  .focused {
    border-radius: 8px;

    background-color: #303133;
  }
`;

export default function TabList() {
  const homeMatch = useMatch("/");
  const wishListMatch = useMatch("/wishlist");
  return (
    <>
      <div>
        <TabMenu>
          <Link to="/">
            <Button
              justifyContent="left"
              width="100%"
              variant="none"
              className={homeMatch ? "submenu focused" : "submenu"}
              leftIcon={<FaFilm fontSize="20px" />}
            >
              비디오
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button
              justifyContent="left"
              width="100%"
              variant="none"
              className={wishListMatch ? "submenu focused" : "submenu"}
              leftIcon={<FaBoxes fontSize="20px" />}
            >
              보관함
            </Button>
          </Link>
        </TabMenu>
      </div>
    </>
  );
}

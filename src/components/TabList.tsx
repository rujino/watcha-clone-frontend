import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "비디오", to: "/" },
    { name: "보관함", to: "/wishlist" },
  ];

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <>
      <div>
        <TabMenu>
          {menuArr.map((ele, index) => {
            return (
              <Link to={ele.to} key={index}>
                <li
                  className={
                    currentTab === index ? "submenu focused" : "submenu"
                  }
                  onClick={() => selectMenuHandler(index)}
                >
                  {ele.name}
                </li>
              </Link>
            );
          })}
        </TabMenu>
      </div>
    </>
  );
}

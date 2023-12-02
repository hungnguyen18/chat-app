import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { LogoutOutlined } from "@ant-design/icons";

import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import { auth } from "../../firebase/config";
import { AppContext } from "../../context/AppProvider";

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-aroun;
  background: black;
  color: wwhite;
  height: 100vh;
`;

export default function SideBar() {
  const { clearState } = React.useContext(AppContext);

  return (
    <SidebarStyled>
      <UserInfo />
      <RoomList />
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: "20px",
          padding: "0px 12px",
        }}
      >
        <Button
          icon={<LogoutOutlined />}
          ghost
          block
          danger
          onClick={() => {
            auth.signOut();
            clearState();
          }}
        >
          Đăng xuất
        </Button>
      </div>
    </SidebarStyled>
  );
}

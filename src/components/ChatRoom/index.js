import React from "react";
import { Row, Col } from "antd";
import SideBar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function ChatRoom() {
  return (
    <div>
      <Row>
        <Col span={4}>
          <SideBar />
        </Col>
        <Col span={20}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
}

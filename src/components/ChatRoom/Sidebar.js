import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import UserInfo from './UserInfo';
import RoomList from './RoomList';

const SidebarStyled = styled.div`
    background: linear-gradient(to bottom right, #0d324d, #7f5a83);
    color: wwhite;
    height: 100vh;
`;

export default function () {
    return (
        <SidebarStyled>
            <div>
                <Row>
                    <Col span={24}>
                        <UserInfo />
                    </Col>
                    <Col span={24}>
                        <RoomList />
                    </Col>
                </Row>
            </div>
        </SidebarStyled>
    );
}

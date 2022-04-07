import React, { useContext } from 'react';
import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { LogoutOutlined } from '@ant-design/icons';

import { auth, db } from '../../firebase/config';
import { AuthContext } from '../../context/AuthProvider';
import { AppContext } from '../../context/AppProvider';

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;

    .username {
        color: white;
        margin-left: 5px;
    }
`;

export default function UserInfo() {
    const {
        user: { displayName, photoURL },
    } = useContext(AuthContext);
    const { clearState } = React.useContext(AppContext);

    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL}>
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className='username'>
                    {displayName}
                </Typography.Text>
            </div>
            <Button
                icon={<LogoutOutlined />}
                ghost
                danger
                onClick={() => {
                    auth.signOut();
                    clearState();
                }}>
                Đăng xuất
            </Button>
        </WrapperStyled>
    );
}

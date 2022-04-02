import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../firebase/config';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { addDocument, generateKeywords } from '../../firebase/services';

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
    const handleFbLogin = async (provider) => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(
            provider
        );

        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName?.toLowerCase()),
            });
        }
    };

    return (
        <div>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>
                        LOGIN ROOM CHAT
                    </Title>
                    <Button
                        icon={<GoogleOutlined />}
                        onClick={() => handleFbLogin(googleProvider)}
                        style={{ width: '100%', marginBottom: 5 }}>
                        Đăng nhập bằng Google
                    </Button>
                    <Button
                        icon={<FacebookOutlined />}
                        onClick={() => handleFbLogin(fbProvider)}
                        style={{ width: '100%' }}>
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

import React, { useEffect } from 'react';
import { Row, Col, Button, Input, message } from 'antd';

import styles from './Signin.module.css';
import { LoginReqType } from '../types';

interface SigninProps {
  loading: boolean;
  error: Error | null;
  login: ({ email, password }: LoginReqType) => void;
}

const Signin: React.FC<SigninProps> = ({ loading, login, error }) => {
  const emailRef = React.useRef<Input>(null);
  const passwordRef = React.useRef<Input>(null);

  useEffect(() => {
    if (error === null) return;

    switch (error.message) {
      case 'USER_NOT_EXIST':
        message.error('User not exist');
        break;
      case 'PASSWORD_NOT_MATCH':
        message.error('Wrong password');
        break;
      default:
        message.error('Unknown error occured');
    }
  }, [error]);

  return (
    <form>
      <Row align="middle" className={styles.signin_row}>
        <Col span={24}>
          <Row className={styles.signin_contents}>
            <Col span={12}>
              <img
                src="/bg_signin.png"
                alt="Signin"
                className={styles.signin_bg}
              />
            </Col>
            <Col span={12}>
              <div className={styles.signin_title}>My Books</div>
              <div className={styles.signin_subtitle}>
                Please Note Your Opinion
              </div>
              <div className={styles.signin_underline} />
              <div className={styles.email_title}>
                Email
                <span className={styles.required}> *</span>
              </div>
              <div className={styles.input_area}>
                <Input
                  placeholder="Email"
                  autoComplete="email"
                  name="email"
                  ref={emailRef}
                  className={styles.input}
                />
              </div>
              <div className={styles.password_title}>
                Password
                <span className={styles.required}> *</span>
              </div>
              <div className={styles.input_area}>
                <Input
                  type="password"
                  autoComplete="current-password"
                  ref={passwordRef}
                  className={styles.input}
                />
              </div>
              <div className={styles.button_area}>
                <Button
                  size="large"
                  loading={loading}
                  onClick={click}
                  className={styles.button}
                >
                  Sign In
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </form>
  );

  function click() {
    const email = emailRef.current?.state.value;
    const password = passwordRef.current?.state.value;

    login({ email, password });
  }
};

export default Signin;

import { AuthenticationProvider, User } from "../AuthenticationContext";
import {
  BellOutlined,
  CalendarOutlined,
  CloseOutlined,
  CrownOutlined,
  InboxOutlined,
  KeyOutlined,
  LockOutlined,
  NotificationOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu } from "antd";
import React, { useState } from "react";

import { LoginModal } from "./components/LoginModal";
import { NavLink } from "react-router-dom";
import { RegisterModal } from "./components/RegisterModal";
import { ResponsiveNav } from "./components/ResponsiveNav";
import _ from "lodash";
import styles from "./styles.module.scss";
import { useLogoutMutation } from "./hooks/useLogoutMutation";

const { SubMenu } = Menu;
const { Header, Content } = Layout;

interface NavigationLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const NavigationLayout: React.FC<NavigationLayoutProps> = ({
  children,
}) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const mutation = useLogoutMutation();

  const userMenu = (
    <Menu>
      {_.isEmpty(user?._id) && (
        <>
          <Menu.Item
            key="login"
            onClick={() => setLoginModalOpen(true)}
            icon={<KeyOutlined />}
          >
            Login
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => setRegisterModalOpen(true)}
            icon={<LockOutlined />}
          >
            Register
          </Menu.Item>
        </>
      )}
      {!_.isEmpty(user?._id) && (
        <Menu.Item
          key="3"
          icon={<CloseOutlined />}
          onClick={() => {
            mutation.mutate();
            setUser(undefined);
          }}
        >
          Logout
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <AuthenticationProvider user={user} setUser={setUser}>
        <Layout style={{ height: "100vh" }}>
          <Header className={styles.headerContainer}>
            <h1>GUILD PLACE</h1>
            <div className={styles.headerControlls}>
              <Button shape="circle" ghost icon={<BellOutlined />} />
              <Dropdown overlay={userMenu} trigger={["click"]}>
                <Button shape="circle" ghost icon={<UserOutlined />} />
              </Dropdown>
            </div>
          </Header>
          <Layout hasSider>
            <ResponsiveNav>
              <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
                <Menu.Item key="dashboard" icon={<NotificationOutlined />}>
                  <NavLink to="/">Dashboard</NavLink>
                </Menu.Item>
                <Menu.Item key="inbox" icon={<InboxOutlined />}>
                  <NavLink to="/forum">Forum</NavLink>
                </Menu.Item>
                <Menu.Item icon={<CalendarOutlined />} key="8">
                  <NavLink to="/calendar">Your Calendar</NavLink>
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  icon={<TeamOutlined />}
                  title="Guild Management"
                >
                  <Menu.Item key="1">Member list</Menu.Item>
                  <Menu.Item key="2">Guild settings</Menu.Item>
                </SubMenu>
                <Menu.Item key="sub3" icon={<ToolOutlined />}>
                  Account
                </Menu.Item>
                {user?.role === "admin" && (
                  <Menu.Item key="sub4" icon={<CrownOutlined />}>
                    <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
                  </Menu.Item>
                )}
              </Menu>
            </ResponsiveNav>
            <Content className={styles.contentContainer}>{children}</Content>
          </Layout>
        </Layout>
        <LoginModal
          visible={isLoginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onLogin={(user) => setUser(user)}
        />
        <RegisterModal
          visible={isRegisterModalOpen}
          onClose={() => setRegisterModalOpen(false)}
        />
      </AuthenticationProvider>
    </>
  );
};

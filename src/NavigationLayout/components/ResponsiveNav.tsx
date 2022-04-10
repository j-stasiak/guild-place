import "./overrides.scss";

import { Affix, Button, Drawer } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import Sider from "antd/lib/layout/Sider";
import styles from "../styles.module.scss";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useState } from "react";

export const ResponsiveNav: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile] = useIsMobile();

  return !isMobile ? (
    <Affix offsetTop={80}>
      <Sider collapsible className={styles.sideNav}>
        {children}
      </Sider>
    </Affix>
  ) : (
    <>
      <Drawer
        closable
        width={200}
        mask
        maskClosable
        getContainer={false}
        onClose={() => setIsOpen(false)}
        headerStyle={{ display: "none" }}
        placement="left"
        visible={isOpen}
      >
        {children}
      </Drawer>
      <Button
        shape="circle"
        icon={isOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        className={styles.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
      />
    </>
  );
};

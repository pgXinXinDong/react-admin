import React from "react";
import { Layout } from "antd";

const { Sider } = Layout;

const AppAside = props => {
  const { menuToggle, menu } = props;
  return <Sider collapsed={menuToggle}></Sider>;
};

export default AppAside;

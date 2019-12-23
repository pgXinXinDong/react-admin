import React from "react";
import { Layout, Icon } from "antd";
import PropTypes from "prop-types";

import CustomMenu from "../components/CustomMenu";
const { Sider } = Layout;

const AppAside = props => {
  const { menuToggle, menu, menuClick } = props;
  return (
    <Sider
      className="aside"
      collapsible
      collapsed={menuToggle}
      onCollapse={menuClick}
    >
      <div className="logo">
        <a
          rel="noopener noreferrer"
          href="https://github.com/ltadpoles"
          target="_blank"
        >
          <Icon type="github" style={{ fontSize: "3.8rem", color: "#fff" }} />
        </a>
      </div>
      <CustomMenu menu={menu} />
    </Sider>
  );
};

AppAside.propTypes = {
  menuToggle: PropTypes.bool,
  menu: PropTypes.array.isRequired
};
export default AppAside;

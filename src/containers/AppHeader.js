import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Icon, Dropdown, Avatar, Badge } from "antd";

const Item = Menu.Item;
const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.ItemGroup title="用户设置">
      <Menu.Divider />
      <Item>
        <Icon type="edit" />
        个人设置
      </Item>
      <Item>
        <Icon type="setting" theme="filled" />
        系统设置
      </Item>
    </Menu.ItemGroup>
    <Menu.Divider />
    <Item>
      <span>
        <Icon type="logout" />
        退出登录
      </span>
    </Item>
  </Menu>
);

const AppHeader = props => {
  const { avatar, menuToggle, menuClick } = props;
  return (
    <Header className="header">
      <div className="left">
        <Icon
          className="trigger"
          onClick={menuClick}
          type={menuToggle ? "menu-unfold" : "menu-fold"}
        />
      </div>
      <div className="right">
        <div className="mr15">
          <a rel="noopener noreferrer" href="" target="_blank">
            <Icon type="github" style={{ color: "#000" }} />
          </a>
        </div>
        <div className="mr15">
          <Badge dot={true} offset={[-2, 0]}>
            <a href="" style={{ color: "#000" }}>
              <Icon type="bell" />
            </a>
          </Badge>
        </div>
        <div>
          <Dropdown overlay={menu}>
            <Avatar
              icon="user"
              src={avatar}
              alt="avatar"
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

AppHeader.propTypes = {
  menuToggle: PropTypes.bool,
  menuClick: PropTypes.func,
  avatar: PropTypes.string
};

export default React.memo(AppHeader);

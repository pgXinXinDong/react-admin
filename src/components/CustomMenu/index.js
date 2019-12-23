import React, { Component } from "react";
import { Menu, Icon } from "antd";
const { SubMenu } = Menu;
const Item = Menu.Item;

class CustomMenu extends Component {
  getMenu = menu => {
    if (menu.length > 0) {
      return menu.map(item => {
        if (item.subs && item.subs.length > 0) {
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  {item.icon && <Icon type={item.icon} />}
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenu(item.subs)}
            </SubMenu>
          );
        } else {
          return (
            <Item key={item.key}>
              <Icon type={item.icon} />
              {item.title}
            </Item>
          );
        }
      });
    } else {
      return;
    }
  };

  render() {
    const menu = this.props.menu;
    return (
      <Menu mode={"inline"} theme={"dark"}>
        {this.props.menu && this.getMenu(menu)}
      </Menu>
    );
  }
}

export default CustomMenu;

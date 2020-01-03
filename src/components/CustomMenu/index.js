import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Menu, Icon } from "antd";
const { SubMenu } = Menu;
const Item = Menu.Item;

class CustomMenu extends Component {
  state = {
    openKeys: [],
    selectedKeys: []
  };
  getOpenKeys = string => {
    let newArr = [];
    let arr = string.split("/").map(i => "/" + i);
    newArr.push(arr[1]);

    return newArr;
  };

  handelItemClick = key => {
    //点击首页时 关闭其他子菜单
    if (key == "/index") {
      this.setState({
        openKeys: null
      });
    }
    this.setState({
      selectedKeys: [key]
    });
  };

  onOpenChange = key => {
    //点击自己关闭 此时key = []
    if (key.length === 0) {
      this.setState({
        openKeys: undefined
      });
    }
    this.setState({
      openKeys: [key[key.length - 1]]
    });
  };

  componentDidMount() {
    let { pathname } = this.props.location;
    this.setState({
      openKeys: this.getOpenKeys(pathname),
      selectedKeys: [pathname]
    });
  }

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
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
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
    const { selectedKeys, openKeys } = this.state;
    return (
      <Menu
        mode={"inline"}
        theme={"dark"}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onClick={({ key }) => this.handelItemClick(key)}
        onOpenChange={key => this.onOpenChange(key)}
      >
        {this.props.menu && this.getMenu(menu)}
      </Menu>
    );
  }
}

export default withRouter(CustomMenu);

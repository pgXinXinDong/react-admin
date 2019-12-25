import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { Layout, message, BackTop } from "antd";
import { connect } from "react-redux";
import menu from "./menu";
import "@/style/layout.scss";
import { menuToggleAction } from "@/store/actionCreators";

import routers from "@/routes";
import AppAside from "./AppAside";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

import avatar from "@/assets/images/user.jpg";

const { Header, Footer, Sider, Content } = Layout;

class DefluatLayout extends Component {
  state = {
    menu: [],
    avatar: avatar
  };
  componentDidMount() {
    this.isLogin();
  }
  loginOut = () => {
    localStorage.clear("user");
    this.props.history.push("/login");
    message.success("成功退出");
  };

  isLogin = () => {
    if (!localStorage.getItem("user")) {
      this.props.history.push("/login");
    } else {
      this.setState({
        menu: this.getMenu(menu)
      });
    }
  };

  getMenu = menu => {
    let newMenu,
      auth = JSON.parse(localStorage.getItem("user")).auth;

    if (!auth) {
      //auth 0 代表管理员
      return menu;
    } else {
      // auth  1 代表普通的用户  需要过滤
      newMenu = menu.filter(item => {
        return item.auth && item.auth.indexOf(auth) !== -1;
      });
      return newMenu;
    }
  };
  render() {
    let { menuToggle, menuClick } = this.props;
    let { auth } = JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : "";
    return (
      <Layout className="app">
        <BackTop />
        <AppAside
          menuToggle={menuToggle}
          menuClick={menuClick}
          menu={this.state.menu}
          loginOut={this.loginOut}
        ></AppAside>
        <Layout
          style={{
            marginLeft: menuToggle ? "80px" : "200px",
            minHeight: "100vh"
          }}
        >
          <AppHeader
            avatar={this.state.avatar}
            menuToggle={menuToggle}
            menuClick={menuClick}
            loginOut={this.loginOut}
          ></AppHeader>
          <Content>
            {routers.map(item => {
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  exact={item.exact}
                  render={props =>
                    !auth ? (
                      <item.component />
                    ) : item.auth && item.auth.indexOf(auth) !== -1 ? (
                      <item.component />
                    ) : (
                      <Redirect to="404" {...props} />
                    )
                  }
                ></Route>
              );
            })}
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    menuToggle: state.menuToggle
  };
}
function mapDispatchToProps(dispatch) {
  return {
    menuClick: function() {
      console.log();
      dispatch(menuToggleAction());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefluatLayout);

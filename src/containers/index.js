import React, { Component } from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AppAside from "./AppAside";
import menu from "./menu";
import "@/style/layout.scss";

const { Header, Footer, Sider, Content } = Layout;

class DefluatLayout extends Component {
  state = {
    menu: []
  };
  componentDidMount() {
    this.isLogin();
  }

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
    let { menuToggle } = this.props;
    return (
      <Layout className="app">
        <AppAside menuToggle={menuToggle} menu={this.state.menu}></AppAside>
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
      console.log(dispatch);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefluatLayout);

import React, { Component } from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AppAside from "./AppAside";
import menu from "./menu";

const { Header, Footer, Sider, Content } = Layout;

class DefluatLayout extends Component {
  state = {
    menu: []
  };
  render() {
    let { menuToggle } = this.props;
    return (
      <Layout>
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

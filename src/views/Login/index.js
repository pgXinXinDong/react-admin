import React, { Component } from "react";
import { Layout, Divider, Form, Input, Icon, Button } from "antd";
import "@/style/view-style/login.scss";

class Login extends Component {
  state = {
    loading: false
  };

  enterLoading = () => {
    this.setState({
      loading: true
    });
  };

  handleSubmit = e => {
    this.props.form.validateFields(
      ["username", "password"],
      { first: true },
      (errors, values) => {
        if (errors) return;

        console.log("values", values);
        switch (values.username) {
          case "admin":
            values.auth = 0;
          default:
            values.auth = 1;
        }

        localStorage.setItem("user", JSON.stringify(values));
        this.enterLoading();
      }
    );
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className="login animated fadeIn">
        <div className="model">
          <div className="login-form">
            <h3>后台管理系统</h3>
            <Divider />
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "请输入用户名" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="用户名"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入密码" }]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="login-form-button"
                  loading={this.state.loading}
                  htmlType="submit"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Form.create()(Login);

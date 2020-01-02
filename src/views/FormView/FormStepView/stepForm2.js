import React, { Component } from "react";
import { Form, Input, Select, Button } from "antd";
const { Option } = Select;

class StepForm2 extends Component {
  state = {
    iconLoading: false
  };
  step2Submit = () => {
    this.setState({
      iconLoading: true
    });

    setTimeout(() => {
      this.setState({
        iconLoading: false
      });
      this.props.setCurrent(2);
    }, 2000);
  };
  render() {
    const { FormData, formItemLayout, tailFormItemLayout } = this.props;
    return (
      <Form {...formItemLayout}>
        <Form.Item label="接收人">{FormData.person}</Form.Item>
        <Form.Item label="接收邮箱">{FormData.Email}</Form.Item>
        <Form.Item label="暗号">{FormData.Password}</Form.Item>
        <Form.Item label="联系渠道">{FormData.Code}</Form.Item>
        <Form.Item label="联系方式">{FormData.Type}</Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            loading={this.state.iconLoading}
            onClick={this.step2Submit}
          >
            发送
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(StepForm2);

import React, { Component } from "react";
import { Form, Input, Select, Button } from "antd";
const { Option } = Select;

class StepForm1 extends Component {
  handleSelectChange = value => {
    this.props.form.setFieldsValue({
      Email: `${value == "kenan" ? "kenan" : "maoli"}@google.com`
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      this.props.getFormData(values);
      this.props.setCurrent(1);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formItemLayout, tailFormItemLayout } = this.props;

    const selectBefore = getFieldDecorator("Type", {
      initialValue: "twitter"
    })(
      <Select style={{ width: "8rem" }}>
        <Option value="twitter">twitter</Option>
        <Option value="facebook">facebook</Option>
        <Option value="weixin">微信</Option>
      </Select>
    );

    return (
      <Form {...formItemLayout} hideRequiredMark onSubmit={this.handleSubmit}>
        <Form.Item label={"接收人:"}>
          {getFieldDecorator("person", {
            initialValue: "kenan",
            rules: [{ required: true }]
          })(
            <Select placeholder="请选择人物" onChange={this.handleSelectChange}>
              <Option value={"kenan"}>柯南</Option>
              <Option value={"maoli"}>毛利大叔</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label={"接收邮箱"}>
          {getFieldDecorator("Email", {
            initialValue: "kenan@google.com",
            rules: [{ required: true, message: "请输入邮箱" }]
          })(
            <Select disabled>
              <Option value="kenan@google.com">kenan@google.com</Option>
              <Option value="maoli@google.com">maoli@google.com</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label={"暗号"}>
          {getFieldDecorator("Password", {
            initialValue: "真相只有一个",
            rules: [{ required: true, message: "请输入对接暗号" }]
          })(<Input placeholder={"请输入对接暗号"} />)}
        </Form.Item>
        <Form.Item label="联系方式">
          {getFieldDecorator("Code", {
            initialValue: "kenan0528",
            rules: [{ required: true, message: "请输入联系方式" }]
          })(
            <Input
              addonBefore={selectBefore}
              placeholder="请输入联系方式"
              style={{ width: "100%" }}
            />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type={"primary"} htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create("name")(StepForm1);

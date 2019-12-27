import React, { Component } from "react";
import {
  Layout,
  Form,
  Tooltip,
  Icon,
  Input,
  Radio,
  Button,
  Checkbox,
  Col,
  Row,
  InputNumber,
  DatePicker,
  AutoComplete
} from "antd";

const { Item } = Form;
const formItemLayout = {
  labelCol: { span: 4, offset: 5 },
  wrapperCol: { span: 8 }
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 10 }
};

const AutoCompleteOption = AutoComplete.Option;

class FromView extends Component {
  state = {
    autoCompleteResult: [],
    confirmDirty: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      // console.log("value",value)
    });
  };
  //邮箱自动填充功能
  handleWebsiteChange = value => {
    console.log(value);
    var autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ["@google.com", "@qq.com", "@163.com"].map(
        domin => `${value}${domin}`
      );
    }

    this.setState({
      autoCompleteResult
    });
  };

  //检验密码是否相等
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && !this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("密码不一致");
    }
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    console.log(!!value);
    console.log({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const websiteOptions = this.state.autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}> {website} </AutoCompleteOption>
    ));
    return (
      <Layout>
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          <Item
            label={
              <span>
                用户名&nbsp;
                <Tooltip title="可以尽量好听点，真的">
                  <Icon type="question-circle-o"></Icon>
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入用户名" }]
            })(<Input placeholder="请输入用户名" />)}
          </Item>
          <Item label="性别">
            {getFieldDecorator("sex", {
              rules: [
                {
                  required: true,
                  message: "请选择性别"
                }
              ]
            })(
              <Radio.Group>
                <Radio value="man">男</Radio>
                <Radio value="women">女</Radio>
              </Radio.Group>
            )}
          </Item>
          <Item label="爱好">
            {getFieldDecorator("hobby", {
              rules: [{ required: true, message: "请至少选择一个爱好" }],
              initialValue: ["A", "B"]
            })(
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox value="A">A</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox disabled value="B">
                      B
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="C">C</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            )}
          </Item>
          <Item label="年龄">
            {getFieldDecorator("年龄", {
              rules: [{ required: true, message: "请输入年龄" }]
            })(
              <InputNumber
                placeholder="请输入你的年龄"
                style={{ width: "100%" }}
              />
            )}
          </Item>
          <Item label="出生日期">
            {getFieldDecorator("date-picker", {
              rules: [{ type: "object", required: true, message: "请选择日期" }]
            })(
              <DatePicker style={{ width: "100%" }} placeholder="请选择日期" />
            )}
          </Item>
          <Item label="邮箱">
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "请输入邮箱" },
                { type: "email", message: "请输入正确的邮箱" }
              ]
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="请输入邮箱"
              >
                <Input />
              </AutoComplete>
            )}
          </Item>
          <Item label="密码">
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "请输入密码!" },
                { validator: this.validateToNextPassword }
              ]
            })(
              <Input.Password
                placeholder="请输入密码"
                onBlur={this.handleConfirmBlur}
              />
            )}
          </Item>

          <Item label="确认密码">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "请确认密码!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password placeholder="请确认密码" />)}
          </Item>
          <Item {...formTailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Layout>
    );
  }
}

export default Form.create({ name: "normal_login" })(FromView);

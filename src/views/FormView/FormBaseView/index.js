import React, { Component } from "react";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
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
  Switch,
  Row,
  InputNumber,
  DatePicker,
  AutoComplete,
  Cascader,
  Select,
  Rate,
  Slider,
  Upload
} from "antd";

const { Item } = Form;
const formItemLayout = {
  labelCol: { span: 4, offset: 5 },
  wrapperCol: { span: 8 }
};
const { Option } = Select;

const options = [
  {
    value: "sichuan",
    label: "四川",
    children: [
      {
        value: "chengdu",
        label: "成都",
        children: [
          {
            value: "gaoxin",
            label: "高新区"
          }
        ]
      }
    ]
  },
  {
    value: "gansu",
    label: "甘肃",
    children: [
      {
        value: "lanzhou",
        label: "兰州",
        children: [
          {
            value: "anning",
            label: "安宁区"
          }
        ]
      }
    ]
  }
];

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 10 }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 0
    },
    sm: {
      span: 10,
      offset: 6
    }
  }
};
const AutoCompleteOption = AutoComplete.Option;

class FromView extends Component {
  state = {
    autoCompleteResult: [],
    confirmDirty: false,
    options: options
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      console.log(`${value}`, value);
    });
  };
  //邮箱自动填充功能
  handleWebsiteChange = value => {
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
    } else {
      callback();
    }
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  };
  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  validatePhone = (rule, value, callback) => {
    const { form } = this.props;
    const zone = form.getFieldValue("prefix");
    if (form.getFieldValue("phone")) {
      const phone = form.getFieldValue("phone");
      switch (zone) {
        case "86":
          if (/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)) {
            callback();
          } else {
            callback("手机号不符合验证规则");
          }
          break;
        default:
          callback("请输入对应的手机号");
          break;
      }
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const websiteOptions = this.state.autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}> {website} </AutoCompleteOption>
    ));
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <Layout class="fadeIn animated">
        <CustomBreadcrumb arr={["表单", "基础表单"]} />
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
          <Item label="密码" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "请输入密码!" },
                { validator: this.validateToNextPassword }
              ]
            })(<Input.Password placeholder="请输入密码" />)}
          </Item>
          <Item label="确认密码" hasFeedback>
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
            })(
              <Input.Password
                placeholder="请确认密码"
                onBlur={this.handleConfirmBlur}
              />
            )}
          </Item>
          <Item label="地址">
            {getFieldDecorator("address", {
              rules: [
                {
                  required: true,
                  type: "array",
                  message: "请输入你的地址"
                }
              ],
              initialValue: ["sichuan", "chengdu", "gaoxin"]
            })(
              <Cascader
                options={this.state.options}
                placeholder={"请输入你的地址"}
                onChange={this.onChange}
              />
            )}
          </Item>
          <Item label="电话">
            {getFieldDecorator("phone", {
              rules: [
                {
                  required: true,
                  message: "请输入你的手机号",
                  validator: this.validatePhone
                }
              ]
            })(<Input addonBefore={prefixSelector} />)}
          </Item>

          <Item label="评价" extra="这个项目怎样">
            {getFieldDecorator("rate", {
              initialValue: 3.5
            })(<Rate />)}
          </Item>

          <Item label="Upload" extra="longgggggggggggggggggggggggggggggggggg">
            {getFieldDecorator("upload", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile
            })(
              <Upload
                name="logo"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
              >
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )}
          </Item>
          <Form.Item label="switch">
            {getFieldDecorator("switch", {
              valuePropName: "checked",
              initialValue: true
            })(<Switch />)}
          </Form.Item>
          <Form.Item label="slider">
            {getFieldDecorator("slider", {
              initialValue: 30
            })(<Slider disabled={getFieldValue("switch") ? false : true} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked"
            })(
              <Checkbox>
                阅读并理解 <a href="https://github.com/ltadpoles">此协议</a>
              </Checkbox>
            )}
          </Form.Item>

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

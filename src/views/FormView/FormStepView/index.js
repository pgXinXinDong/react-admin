import React, { Component } from "react";
import { Layout, Divider, Steps, Row, Col, Button, message } from "antd";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import StepForm1 from "./stepForm1";
import StepForm2 from "./stepForm2";
import StepForm3 from "./stepForm3";
const { Step } = Steps;
const steps = [
  {
    title: "填写接收信息"
  },
  {
    title: "确认接收信息"
  },
  {
    title: "完成"
  }
];
const formItemLayout = {
  labelCol: { span: 3, offset: 6 },
  wrapperCol: { span: 6 }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      formData: null
    };
  }

  getFormData = data => {
    this.setState({
      formData: data
    });
  };

  setCurrent = index => {
    this.setState({
      current: index
    });
  };

  render() {
    const current = this.state.current;
    return (
      <Layout className="animated fadeIn">
        <div>
          <CustomBreadcrumb arr={["表单", "步骤表单"]}></CustomBreadcrumb>
        </div>
        <div className="base-style">
          <h3>何时使用</h3>
          <Divider />
          <p>当用户需要分步收集不同信息时</p>
        </div>
        <div className="base-style">
          <Divider orientation="left">分步表单</Divider>
          <Row>
            <Col>
              <Steps current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title}></Step>
                ))}
              </Steps>
              {current === 0 && (
                <div style={{ marginTop: "20px" }}>
                  {
                    <StepForm1
                      getFormData={this.getFormData}
                      formItemLayout={formItemLayout}
                      tailFormItemLayout={tailFormItemLayout}
                      setCurrent={this.setCurrent}
                    />
                  }
                </div>
              )}
              {current === 1 && (
                <div style={{ marginTop: "20px" }}>
                  <StepForm2
                    FormData={this.state.formData}
                    formItemLayout={formItemLayout}
                    tailFormItemLayout={tailFormItemLayout}
                    setCurrent={this.setCurrent}
                  />
                </div>
              )}
              {current === 2 && (
                <div style={{ marginTop: "20px" }}>
                  <StepForm3 setCurrent={this.setCurrent} />
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}
export default Index;

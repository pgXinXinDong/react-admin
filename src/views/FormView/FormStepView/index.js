import React, { Component } from "react";
import { Layout, Divider, Steps, Row, Col, Button, message } from "antd";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
const { Step } = Steps;
const steps = [
  {
    title: "填写接收信息",
    content: "填写接收信息"
  },
  {
    title: "确认接收信息",
    content: "确认接收信息"
  },
  {
    title: "完成",
    content: "完成"
  }
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }
  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({
      current
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
              <div>{steps[current].content}</div>
            </Col>
          </Row>
          <div>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                {" "}
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success("成功")}>
                prev
              </Button>
            )}
            {current > 0 && (
              <Button type="paimary" onClick={() => this.prev()}>
                prev
              </Button>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}
export default Index;

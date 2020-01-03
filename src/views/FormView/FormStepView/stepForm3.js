import React, { Component } from "react";
import { Result, Button } from "antd";

class StepForm3 extends Component {
  render() {
    const { setCurrent } = this.props;
    return (
      <Result
        status={"success"}
        title="再送一封"
        extra={[
          <Button type={"primary"} key={"again"} onClick={() => setCurrent(0)}>
            在发送一封
          </Button>,
          <Button style={{ marginLeft: "20px" }} key={"record"}>
            查看记录
          </Button>
        ]}
      ></Result>
    );
  }
}

export default StepForm3;

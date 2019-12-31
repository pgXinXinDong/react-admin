import React, { Component } from "react";
import PropTypes from "prop-types";
import { Breadcrumb } from "antd";

import { Link } from "react-router-dom";

const CustomBreadcrumb = props => (
  <Breadcrumb style={{ marginBottom: 16 }}>
    <Breadcrumb.Item>
      <Link to="/index">首页</Link>
    </Breadcrumb.Item>
    {props.arr.map(res => {
      if (typeof res === "object") {
        return (
          <Breadcrumb.Item key={res.path}>
            <Link to={res.path}>{res.title}</Link>
          </Breadcrumb.Item>
        );
      } else {
        return <Breadcrumb.Item key={res}>{res}</Breadcrumb.Item>;
      }
    })}
  </Breadcrumb>
);

CustomBreadcrumb.propTypes = {
  arr: PropTypes.array
};
function shouldRender(prevProps, nextProps) {
  if (prevProps.arr.join() === nextProps.arr.join()) {
    return true;
  }
  return false;
}

export default React.memo(CustomBreadcrumb, shouldRender);

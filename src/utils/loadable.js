import React, { Component } from "react";
import Loadable from "react-loadable";
import NProgress from "nprogress"; //页面加载进度条
import "nprogress/nprogress.css"; //这个样式必须引入
// NProgress.configure({
//     minimum: 0.1,
//     ease: 'ease-in-out',
//     speed: 2000,
//     showSpinner: false
// })

class loadableCompoent extends Component {
  constructor(props) {
    super(props);
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    return <div />;
  }
}

export default (loader, loading = loadableCompoent) => {
  return Loadable({
    loader,
    loading
  });
};

import loadable from "@/utils/loadable";

//引入组件
const Index = loadable(() => import("@/views/index"));

// 导航
const DropdownView = loadable(() =>
  import(/* webpackChunkName: 'dropdown' */ "@/views/NavView/Dropdown")
);

const routes = [
  { path: "/index", exact: true, name: "index", component: Index, auth: [1] },
  {
    path: "/nav/dropdown",
    exact: false,
    name: "下拉菜单",
    component: DropdownView
  }
];

export default routes;

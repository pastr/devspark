import Icon, { FileUnknownOutlined, CodeOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { OptionsProvider } from "@devspark/context/options";

import { ReactComponent as GithubIcon } from "../../images/logo/github.svg";
import { ReactComponent as JiraIcon } from "../../images/logo/jira.svg";

const { Sider, Content } = Layout;

const IS_DEVELOPMENT = import.meta.env.MODE === "development";


type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}


const menuItems: MenuProps["items"] = [
  getItem("Jira", "jira", <Icon component={JiraIcon} />, [
    getItem("Organization", "organization")
  ]),

  getItem("GitHub", "github", <Icon component={GithubIcon} />, [
    getItem("Customize PR colors", "pr-colors")
  ]),
  getItem("Environment name", "environmentName", <FileUnknownOutlined />)
];

if (IS_DEVELOPMENT) {
  menuItems.push(getItem("Development", "development", <CodeOutlined />));
}

export default function Options() {
  const LEFT_MENU_WIDTH = 240;
  const fullLocation = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🚀 ~ file: Options.tsx:61 ~ Options ~ fullLocation:", fullLocation);

  }, [fullLocation, fullLocation.pathname, navigate]);

  const onClick: MenuProps["onClick"] = (e) => {
    const reverseKeyPath = e.keyPath.reverse();
    const finalLocation = reverseKeyPath.join("/");

    navigate(`/${finalLocation}`);
  };

  return (
    <OptionsProvider>
      <Layout hasSider className="max-h">
        <Sider theme="light" width={LEFT_MENU_WIDTH}>
          <Menu onClick={onClick}
                className="h-screen"
                defaultSelectedKeys={fullLocation.pathname.split("/")}
                defaultOpenKeys={fullLocation.pathname.split("/")}
                style={{ width: LEFT_MENU_WIDTH }}
                mode="inline"
                items={menuItems}/>
        </Sider>
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </OptionsProvider>
  );
}

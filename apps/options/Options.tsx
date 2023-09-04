import Icon, { FileUnknownOutlined, CodeOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
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


const commonMenuItems: MenuProps["items"] = [
  getItem("Jira", "jira", <Icon component={JiraIcon} />, [
    getItem("Organization", "organization")
  ]),

  getItem("GitHub", "github", <Icon component={GithubIcon} />, [
    getItem("Customize PR colors", "pr-colors"),
    getItem("Reviewers Group", "reviewers-group")
  ]),

  getItem("Environment name", "environmentName", <FileUnknownOutlined />)
];

const devMenuItems = IS_DEVELOPMENT ? [getItem("Development", "development", <CodeOutlined />)] : [];

const menuItems = [...commonMenuItems, ...devMenuItems];


export default function Options() {
  const LEFT_MENU_WIDTH = 240;
  const location = useLocation();
  const locationArray = location.pathname.split("/");

  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    const reverseKeyPath = e.keyPath.reverse();
    const finalLocation = reverseKeyPath.join("/");

    navigate(`/${finalLocation}`);
  };

  return (
    <OptionsProvider>
      <Layout hasSider className="h-full">
        <Sider width={LEFT_MENU_WIDTH}>
          <Menu onClick={onClick}
                className="h-full"
                defaultSelectedKeys={locationArray}
                defaultOpenKeys={locationArray}
                style={{ width: LEFT_MENU_WIDTH }}
                mode="inline"
                items={menuItems}/>
        </Sider>
        <Layout>
          <Content style={{ minHeight: "100vh" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </OptionsProvider>
  );
}

import { OptionsProvider } from "@devspark/context/options";
import OptionViewEnvironmentName from "./src/environment/OptionViewEnvironment";
import OptionViewGithub from "./src/github/OptionViewGithub";
import OptionViewJira from "./src/jira/OptionViewJira";
import OptionDevelopment from "./src/development/OptionDevelopment";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { LOGOS } from "@devspark/ui/components/AppTitle";
import { FileUnknownOutlined, CodeOutlined } from "@ant-design/icons";

const { Sider, Content } = Layout;


type TRoute = "environmentName" | "jira" | "github" | "development";

const menuConfig = [
  { key: "jira", label: "Jira", icon: LOGOS.jira },
  { key: "github", label: "GitHub", icon: LOGOS.github },
  { key: "environmentName", label: "Environment", iconComponent: <FileUnknownOutlined /> },
  { key: "development", label: "Development", iconComponent: <CodeOutlined />, showInDevelopment: true }
];

export default function Options() {
  const [route, setRoute] = useState<TRoute>("jira");
  const isDevelopment = import.meta.env.MODE === "development";

  const onClick: MenuProps["onClick"] = (e) => {
    setRoute(e.key as TRoute);
  };

  return (
    <OptionsProvider>
      <Layout hasSider className="max-h">
        <Sider theme="light">
          <Menu theme="light" onClick={onClick} className="h-screen" defaultSelectedKeys={[route]}>
            {menuConfig.map((item) => {
              if (item.showInDevelopment && !isDevelopment) return null;

              return (
                <Menu.Item key={item.key}>
                  <div className="flex items-center gap-2">
                    {item.label}
                    {item.icon && <img className="h-4 ml-2" src={item.icon} alt={`${item.label} logo`} />}
                    {item.iconComponent}
                  </div>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <DisplayOption route={route} />
          </Content>
        </Layout>
      </Layout>
    </OptionsProvider>
  );
}

export function DisplayOption({ route }: { route: TRoute }) {
  switch (route) {
  case "jira":
    return <OptionViewJira />;
  case "github":
    return <OptionViewGithub />;
  case "environmentName":
    return <OptionViewEnvironmentName />;
  case "development":
    return <OptionDevelopment />;
  }
}

import { FileUnknownOutlined, CodeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { OptionsProvider } from "@devspark/context/options";
import { LOGOS } from "@devspark/ui/components/AppTitle";

const { Sider, Content } = Layout;

type TRoute = "environmentName" | "jira" | "github" | "development";

const menuConfig = [
  { key: "jira", label: "Jira", icon: LOGOS.jira },
  { key: "github", label: "GitHub", icon: LOGOS.github },
  { key: "environmentName", label: "Environment", iconComponent: <FileUnknownOutlined /> },
  { key: "development", label: "Development", iconComponent: <CodeOutlined />, showInDevelopment: true }
];

export default function Options() {
  const isDevelopment = import.meta.env.MODE === "development";
  const fullLocation = useLocation();
  const navigate = useNavigate();
  const [location, setLocation] = useState<TRoute>(fullLocation.pathname.split("/")[1] as TRoute);
  const defaultPathname = "jira";

  useEffect(() => {
    setLocation(fullLocation.pathname.split("/")[1] as TRoute);

    if (fullLocation.pathname === "/") {
      navigate(`/${defaultPathname}`);
    }

  }, [fullLocation.pathname, navigate]);


  return (
    <OptionsProvider>
      <Layout hasSider className="max-h">
        <Sider theme="light">
          <Menu theme="light" className="h-screen" selectedKeys={[location]} >
            {menuConfig.map((item) => {
              if (item.showInDevelopment && !isDevelopment) return null;

              return (
                <Menu.Item key={item.key}>
                  <div className="flex items-center gap-2">
                    <Link to={`${item.key}`}>{item.label}</Link>
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
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </OptionsProvider>
  );
}

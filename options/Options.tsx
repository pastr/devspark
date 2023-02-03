import { OptionsProvider } from "../common/context/options.context";
import OptionViewEnvironmentName from "./components/OptionViewEnvironment";
import OptionViewGithub from "./components/OptionViewGithub";
import OptionViewJira from "./components/OptionViewJira";
import browser from "webextension-polyfill";
import { Layout, Space, Menu } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { LOGOS } from "../common/components/AppTitle";


const { Sider, Content } = Layout;


type TRoute = "environmentName" | "jira" | "github";

export default function Options() {
  const [route, setRoute] = useState<TRoute>("jira");

  function clearStorage() {
    browser.storage.sync.clear();
  }

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setRoute(e.key as TRoute);
  };

  return (
    <OptionsProvider>
      <Layout hasSider className="max-h">
        <Sider theme="light">
          <Menu theme="light"
                onClick={onClick}
                className="h-screen"
                defaultSelectedKeys={[route]}>

            <Menu.Item key={"jira"}>
              <div className="flex items-center">
                Jira
                <img className="h-4 ml-2" src={LOGOS.jira} alt="Jira's logo"/>
              </div>
            </Menu.Item>
            <Menu.Item key={"github"}>
              <div className="flex items-center">
                GitHub
                <img className="h-4 ml-2" src={LOGOS.github} alt="GitHub's logo"/>
              </div>
            </Menu.Item>
            <Menu.Item key={"environmentName"}>
              Environment
            </Menu.Item>
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
// {icon && <img className={`${iconClassName}`} src={LOGOS[icon]} alt={`${title} logo`} />}

export function DisplayOption({ route }: { route: TRoute }) {
  switch (route) {
  case "jira":
    return <OptionViewJira />;
  case "github":
    return <OptionViewGithub />;
  case "environmentName":
    return <OptionViewEnvironmentName />;
  }
}
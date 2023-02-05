import { Button, Divider } from "antd";
import AppTitle from "../../../_shared/components/AppTitle";
import { ESupportedApps } from "../../../_shared/enums/ESupportedApps";

type Props = {
  title: string;
  icon?: ESupportedApps;
  children: JSX.Element;
}

export default function OptionView({ title, icon, children }: Props) {
  return (
    <main className="m-4 max-w-screen-xl">
      <header className="mb-6">
        <h1 className="font-bold text-5xl flex">
          <AppTitle title={title} icon={icon} iconClassName="h-10 ml-2" />
        </h1>
      </header>
      <section className="p-2">
        {children}
      </section>
    </main>
  );
}
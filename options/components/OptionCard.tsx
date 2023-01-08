import AppTitle from "../../common/components/AppTitle";
import { ESupportedApps } from "../../common/enums/ESupportedApps";

type Props = {
  title: string;
  icon?: ESupportedApps;
  children: JSX.Element;
}

export default function OptionCard({ title, icon, children }: Props) {
  return (
    <article className="border-blue-400 border-[1px] rounded min-w-[20rem]">
      <header className="bg-blue-400 py-1">
        <h1 className="font-bold text-3xl flex justify-center">
          <AppTitle title={title} icon={icon} iconClassName="h-8 ml-1" />
        </h1>
      </header>
      <section className="p-2">
        {children}
      </section>
    </article>
  );
}
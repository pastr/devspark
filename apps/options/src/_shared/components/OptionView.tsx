import { ESupportedApps } from "@devspark/types/enums/ESupportedApps";
import AppTitle from "@devspark/ui/components/AppTitle";

type Props = {
  title: string;
  icon?: ESupportedApps;
  children: React.ReactNode;
}

export default function OptionView({ title, icon, children }: Props) {
  return (
    <div className="m-6 max-w-screen-xl">
      <header className="mb-6">
        <h1 className="font-bold text-5xl flex">
          <AppTitle title={title} icon={icon} iconClassName="h-10 ml-2" />
        </h1>
      </header>
      <section>
        {children}
      </section>
    </div>
  );
}

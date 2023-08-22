import { ESupportedApps } from "@devspark/types/enums/ESupportedApps";
import AppTitle from "@devspark/ui/components/AppTitle";

type Props = {
  title: string;
  icon?: ESupportedApps;
  children: JSX.Element;
}

export default function PopupSection({ title, icon, children }: Props) {
  return (
    <article className="popup-section w-full">
      <h1 className="font-bold text-xl flex justify-center mb-2">
        <AppTitle title={title} icon={icon} iconClassName="h-5 ml-1"/>
      </h1>

      <main>
        {children}
      </main>

    </article>
  );
}

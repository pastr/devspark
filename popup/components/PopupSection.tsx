import { ESupportedApps } from "../../common/enums/ESupportedApps";
import AppTitle from "../../common/components/AppTitle";

type Props = {
  title: string;
  icon?: ESupportedApps;
  children: JSX.Element;
}

export default function PopupSection({ title, icon, children }: Props) {
  return (
    <article className="popup-section w-full">
      <h1 className="font-bold text-xl flex justify-center mb-2">
        <AppTitle title={title} icon={icon} />
      </h1>

      <main>
        {children}
      </main>

    </article>
  );
}
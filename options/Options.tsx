import { OptionsProvider } from "../common/context/options.context";
import OptionCardGithub from "./components/OptionCardGithub";
import OptionCardJira from "./components/OptionCardJira";

export default function Options() {
  return (
    <OptionsProvider>
      <div>
        <header className="my-2">
          <h1 className="text-center font-bold text-4xl"> Devspark Toolbox&apos;s Options</h1>
        </header>
        <main className="flex gap-4 px-4">
          <OptionCardJira />
          <OptionCardGithub />
        </main>
      </div>
    </OptionsProvider>
  );
}
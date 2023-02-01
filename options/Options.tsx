import { OptionsProvider } from "../common/context/options.context";
import OptionCardEnvironmentName from "./components/OptionCardEnvironmentName";
import OptionCardGithub from "./components/OptionCardGithub";
import OptionCardJira from "./components/OptionCardJira";
import browser from "webextension-polyfill";

export default function Options() {
  function clearStorage() {
    browser.storage.sync.clear();
  }

  return (
    <OptionsProvider>
      <div>
        <header className="mt-4 mb-8">
          <h1 className="text-center font-bold text-4xl"> Devspark Toolbox&apos;s Options</h1>
          {/* TODO: To be removed, it's just to make my life simplier during dev  */}
          <button className="absolute right-2 top-2 cursor-pointer" onClick={clearStorage}>reset sync storage</button>
        </header>
        <main className="flex gap-4 px-4 flex-wrap">
          <OptionCardJira />
          <OptionCardGithub />
          <OptionCardEnvironmentName />
        </main>
      </div>
    </OptionsProvider>
  );
}
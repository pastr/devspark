import { Button } from "antd";
import { useEffect, useState } from "react";
import * as browser from "webextension-polyfill";

import { useOptions } from "@devspark/context/options";

import OptionView from "../_shared/components/OptionView";


export default function OptionDevelopment() {
  const [options, setOptions] = useOptions();
  const [browserStorage, setBrowserStorage] = useState<any>(null);

  useEffect(() => {
    async function getBrowserStorage() {

      setBrowserStorage(await browser.storage.local.get());
    }
    getBrowserStorage();

  }, []);


  function clearStorage() {
    browser.storage.sync.clear();
    window.location.reload();
  }

  return (
    <OptionView title={"Development"}>
      <>
        <div className="">
          <Button onClick={clearStorage}>Clear storage</Button>
        </div>

        <div className="mt-4">
          <h1 className="mb-4 font-bold text-xl">User's options:</h1>
          <pre>{JSON.stringify(options, null, 2)}</pre>
        </div>

        <div className="mt-4">
          <h1 className="mb-4 font-bold text-xl">Browser's storage (browser.storage.local.get)</h1>
          <pre>{JSON.stringify(browserStorage, null, 2)}</pre>
        </div>
      </>
    </OptionView>
  );
}

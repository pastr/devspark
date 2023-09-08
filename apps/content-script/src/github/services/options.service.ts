import * as browser from "webextension-polyfill";

import { IOptionsContextState } from "@devspark/types/interfaces/IOptionsState";

export class OptionsService {

  static async getSyncOptions() {
    const storage = await browser.storage.sync.get("options");
    const options = storage.options as IOptionsContextState;

    return options;
  }

}

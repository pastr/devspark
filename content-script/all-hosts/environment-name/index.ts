import browser from "webextension-polyfill";
import { addRibbon, addLine, addSquare } from "./ribbon-corner";
import { IEnvrionmentNameState, IOptionsContextState } from "../../../common/types/IOptionsState";

browser.storage.sync.get("options").then((item) => {
  const options: IOptionsContextState = item.options;
  options.options?.environmentName?.forEach((environmentNameOption) => {
    addMarker(environmentNameOption);
  });
});


function addMarker(userOptions: IEnvrionmentNameState) {
  userOptions.fontSize = 15;

  const url = new URL(window.location.href);
  if (url.href.match(new RegExp(userOptions.url, "g"))) {
    switch (userOptions.shape) {
    case "ribbon":
      userOptions.toCorner = 100;
      userOptions.height = 50;
      addRibbon(userOptions);
      break;
    case "triangle":
      userOptions.toCorner = 30;
      userOptions.height = 60;
      addRibbon(userOptions);
      break;
    case "line":
      addLine(userOptions);
      break;
    case "square":
      userOptions.fontSize = 12;
      userOptions.height = 40;
      addSquare(userOptions);
      break;
    default:
      break;
    }
  }
}
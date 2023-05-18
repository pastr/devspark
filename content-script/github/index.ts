import { addCopyFileNameButton } from "./pull-requests/copy-filename/index";
import { AddCheckboxesElements } from "./pull-requests/reviewed-checkboxes/index";
import { addResizePropertyToSidebar } from "./resize-sidebar/index";
import { addCopyFileNameButtonToComments } from "./pull/conversation/index";


type TTurboLoadEventDetail = {
  url: string;
};

function onTurboLoad(event: CustomEvent<TTurboLoadEventDetail>) {
  const url = new URL(event.detail.url);
  if (url.pathname.includes("/pulls")) {
    const prCheckbox = document.querySelector("[data-eqx-checkbox]");
    if (!prCheckbox) {
      AddCheckboxesElements(url);
    }
  }

  if (url.pathname.includes("/pull/")) {
    addResizePropertyToSidebar();
    addCopyFileNameButton();
    addCopyFileNameButtonToComments();
  }
}

// Custom Event dispatched by GitHub's code when the turbo frame is loaded
window.addEventListener("turbo:load", onTurboLoad);

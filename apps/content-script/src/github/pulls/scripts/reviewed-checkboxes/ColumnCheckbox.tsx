import set from "lodash.set";
import { createEffect, createSignal } from "solid-js";
import type { Component } from "solid-js";
import * as browser from "webextension-polyfill";

import { reviewedPrs, setReviewedPrs } from "./reviewed-checkboxes";

type Props = {
  issueId: string;
  organization: string;
  repository: string;
}

export const ColumnCheckbox: Component<Props> = ({ organization, repository, issueId }) => {
  const PR_LINK_EL = document.querySelector<HTMLElement>(`#${issueId}_link`);
  const [checked, setChecked] = createSignal(reviewedPrs()?.[organization]?.[repository]?.[issueId] ?? false);

  createEffect(() => {
    if (checked()) {
      PR_LINK_EL?.style.setProperty("text-decoration", "line-through", "important");
    } else {
      PR_LINK_EL?.style.setProperty("text-decoration", "");
    }
  });

  async function onClick() {
    const updatedData = { ...reviewedPrs() };
    set(updatedData, [organization, repository, issueId], !checked());
    setReviewedPrs(updatedData);
    await browser.storage.local.set({ reviewedPrs: updatedData });
    setChecked(!checked());
  }

  return (
    <span>
      <input type="checkbox" style="cursor: pointer;" checked={checked()} onchange={onClick} />
    </span>
  );
};

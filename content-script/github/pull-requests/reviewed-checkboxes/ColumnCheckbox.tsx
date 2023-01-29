import { createEffect, createSignal } from "solid-js";
import type { Component } from "solid-js";
import { reviewedPrs, setReviewedPrs } from "./index";
import set from "lodash.set";
import browser from "webextension-polyfill";

type Props = {
  issueId: string;
  organization: string;
  repository: string;
}

export const ColumnCheckbox: Component<Props> = ({ organization, repository, issueId }) => {
  const PR_LINK_EL = document.querySelector<HTMLElement>(`#${issueId}_link`);
  const [checked, setChecked] = createSignal(reviewedPrs()?.[organization]?.[repository]?.[issueId] ?? false);

  createEffect(() => {
    const isOwnPr = !!PR_LINK_EL?.dataset.eqxOwnPr;
    const deemphasizedPr = !!PR_LINK_EL?.dataset.eqxDeemphasizedPr;
    if (checked()) {
      PR_LINK_EL?.style.setProperty("text-decoration", "line-through", "important");
      if (!isOwnPr && !deemphasizedPr) {
        PR_LINK_EL?.style.setProperty("color", "var(--color-fg-subtle)", "important");
      }
    } else {
      PR_LINK_EL?.style.setProperty("text-decoration", "");
      if (!isOwnPr && !deemphasizedPr) {
        PR_LINK_EL?.style.setProperty("color", "");
      }
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
    <span data-eqx-checkbox={issueId}>
      <input type="checkbox" style="cursor: pointer;" checked={checked()} onchange={onClick} />
    </span>
  );
};

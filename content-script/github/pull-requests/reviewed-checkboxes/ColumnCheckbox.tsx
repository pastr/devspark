import { createEffect, createSignal, Show } from "solid-js";
import { reviewedPrs, setReviewedPrs } from "./index";
import browser from "webextension-polyfill";

export const ColumnCheckbox = ({ issue_id }: { issue_id: string}) => {
  const PR_LINK_EL = document.querySelector<HTMLElement>(`#${issue_id}_link`);
  const [checked, setChecked] = createSignal(reviewedPrs()[issue_id] ?? false);

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
    setReviewedPrs({ ...reviewedPrs(), [issue_id]: !checked() });
    await browser.storage.local.set({ reviewedPrs: { ...reviewedPrs(), [issue_id]: !checked() } });
    setChecked(!checked());
  }

  return (
    <span data-eqx-checkbox={issue_id}>
      <input type="checkbox" style="cursor: pointer;" checked={checked()} onchange={onClick} />
    </span>
  );
};

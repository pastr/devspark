import { createEffect, createSignal, Show } from "solid-js";
import { reviewedPrs, setReviewedPrs } from "./index";
import browser from "webextension-polyfill";

export const ColumnCheckbox = ({ issue_id }: { issue_id: string}) => {
  const PR_LINK_EL = document.querySelector<HTMLElement>(`#${issue_id}_link`);
  const [checked, setChecked] = createSignal(reviewedPrs()[issue_id] ?? false);

  createEffect(() => {
    // TODO: Use a data-eqx-own-pr instead of using the style
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
    <span data-eqx-checkbox={issue_id} class="ml-4 mt-1">
      {/* Had to use a button because of github's behaviours with input:checkbox */}
      <button onclick={onClick} style="border: none; margin: 0; padding: 0; height: 14px; width: 14px; display: flex; align-items: center; justify-content: center;">
        <Show when={checked()}>
          {/* This SVG comes from github website */}
          <svg viewBox="0 0 16 16" version="1.1" class="octicon octicon-check">
            <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
          </svg>
        </Show>
      </button>
    </span>
  );
};

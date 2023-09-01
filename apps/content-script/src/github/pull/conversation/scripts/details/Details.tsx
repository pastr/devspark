import { createEffect, createSignal, ParentProps } from "solid-js";
import type { Component } from "solid-js";
import * as browser from "webextension-polyfill";

import GithubCross from "../../../../assets/github-cross.svg";


type Props = {
  title: string;
  dataDvs: string;
  id?: string;
}

export const Details: Component<ParentProps<Props>> = ({ dataDvs, title, id, children }) => {
  const dynamicAttribute = {
    [`data-dvs-${dataDvs}`]: true
  };

  return (
    <details {...dynamicAttribute} class="details-reset details-overlay" id={id ?? dataDvs}>
      <summary class="btn btn-outline btn-sm mr-3 mb-2">
        <span>{title}</span>
        <span class="dropdown-caret"></span>
      </summary>

      <div class="SelectMenu SelectMenu--hasFilter right-0">
        <div class="SelectMenu-modal">
          <header class="SelectMenu-header border-bottom-0 border-md-bottom">
            <span class="SelectMenu-title">Add reviewers</span>
            <button class="SelectMenu-closeButton" data-toggle-for={id ?? dataDvs}>
              <GithubCross />
            </button>
          </header>

          <div class="SelectMenu-list">
            {children}
          </div>
        </div>
      </div>
    </details>
  );
};

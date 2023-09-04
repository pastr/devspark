import { For, Show, createSignal, onMount } from "solid-js";
import * as browser from "webextension-polyfill";

import { IGhReviewersGroup } from "@devspark/types/interfaces/IGhReviewersGroup";
import { IMessageOpenOptionsPage } from "@devspark/types/interfaces/IMessage";
import { IOptionsContextState } from "@devspark/types/interfaces/IOptionsState";

import { Details } from "./details/Details";


export function addReviewersButton() {
  const devsparkSidebarSection = document.querySelector("#devspark-sidebar-section");
  if (!devsparkSidebarSection) return;

  const addReviewersButtonExist = document.querySelector("[data-dvs-add-reviewers]");
  if (addReviewersButtonExist) return;

  devsparkSidebarSection.appendChild(<ReviewersDetailsButton /> as Node);
}

function ReviewersDetailsButton() {
  const [groups, setGroups] = createSignal<IGhReviewersGroup[] | null>(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = createSignal<number>(0);

  onMount(async () => {
    const { options } = await browser.storage.sync.get() as {options: IOptionsContextState};
    setGroups(options.github?.reviewersGroup);
  });

  async function submitForm(event: Event) {
    event.preventDefault();
    if (!groups()) return;

    const formData = new FormData(event.target as HTMLFormElement);
    const selectedGroup = formData.get("dvs-select-reviewer-group") as unknown as number;
    const users = groups()![selectedGroup].users.map((user) => user.id);

    const authenticity_token = document.querySelector("#partial-discussion-sidebar > div.discussion-sidebar-item.sidebar-assignee.js-discussion-sidebar-item.position-relative > form > input[type=hidden]")?.value;
    const githubOrganization = window.location.pathname.split("/")[1];
    const githubRepo = window.location.pathname.split("/")[2];
    const githubPrNumber = window.location.pathname.split("/")[4];
    const prUrl = `https://github.com/${githubOrganization}/${githubRepo}/pull/${githubPrNumber}`;

    const formDataRequest = new FormData();
    formDataRequest.set("authenticity_token", authenticity_token);
    formDataRequest.set("dummy-field-just-to-avoid-empty-submit", "foo");

    const headers = new Headers();
    headers.append("accept", "text/html");
    headers.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7");
    headers.append("cache-control", "no-cache");
    // headers.append("Content-Type", "multipart/form-data"); // If we set the content type ourselves then the boundary between the header and the body won't match. Not specifying the type is the correct solution
    // headers.append("boundary", "----WebKitFormBoundaryCcdd7oA4m3hnVkg5");
    headers.append("pragma", "no-cache");
    headers.append("sec-ch-ua", "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"");
    headers.append("sec-ch-ua-mobile", "?0");
    headers.append("sec-ch-ua-platform", "\"macOS\"");
    headers.append("sec-fetch-dest", "empty");
    headers.append("sec-fetch-mode", "cors");
    headers.append("sec-fetch-site", "same-origin");
    headers.append("x-requested-with", "XMLHttpRequest");
    // formDataRequest.append("reviewer_user_ids[]", users as string);
    users.forEach((user) => {
      formDataRequest.append("reviewer_user_ids[]", user.toString());
    });

    fetch(`${prUrl}/review-requests`, {
      "headers": headers,
      "referrer": prUrl,
      "referrerPolicy": "strict-origin-when-cross-origin",
      body: formDataRequest,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
  }

  function openOptionsPage() {
    const message: IMessageOpenOptionsPage = { eventType: "OpenOptionsPage", path: "/github/reviewers-group" };
    browser.runtime.sendMessage(message);
  }

  function selectGroup(event: Event) {
    setSelectedGroupIndex(event.target.value);
  }

  return (
    <Details dataDvs="add-reviewers" title="Add reviewers">
      <div class="mb-2"></div>
      <Show when={!groups()?.length}>
        <div class="mx-3">You don't have any group</div>
      </Show>
      <div class="mx-3 mb-3">click <a href="#" class="text" onclick={openOptionsPage}>here</a> to create or see existing groups</div>

      <Show when={groups()?.length}>
        <form class="mx-3 mb-3" onsubmit={submitForm}>
          <dl class="form-group">
            <dt>
              <label for="dvs-select-reviewer-group">Select a group</label>
            </dt>

            <dd>
              <select name="dvs-select-reviewer-group"
                    id="dvs-select-group"
                    class="form-select form-control" onchange={selectGroup} >
                <For each={groups()}>{(group, index) =>
                  <option value={index()}>
                    {group.groupName}
                  </option>
                }</For>
              </select>
            </dd>
          </dl>

          <div>Users:</div>
          <div class="mb-4" style={{ display: "flex", "flex-wrap": "wrap", "gap": "4px" }}>
            <For each={groups()![selectedGroupIndex()].users}>
              {
                (user, index) =>
                  <div>
                    <a data-hovercard-type="user" data-hovercard-url={`/users/${user.login}/hovercard`} data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href={`/${user.login}`}>
                      <span class="Link--primary text-bold">{user.login}</span>
                    </a>
                    <Show when={index() !== groups()![selectedGroupIndex()].users.length -1}>
                      <span>, </span>
                    </Show>
                  </div>
              }
            </For>
          </div>


          <button type="submit"
                class="btn btn-sm btn-primary">
                  Select
          </button>
        </form>
      </Show>
    </Details>
  );

}

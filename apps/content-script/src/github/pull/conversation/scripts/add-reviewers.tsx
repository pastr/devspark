import { Details } from "./details/Details";

export function addReviewersButton() {
  const devsparkSidebarSection = document.querySelector("#devspark-sidebar-section");
  if (!devsparkSidebarSection) return;

  const addReviewersButtonExist = document.querySelector("[data-dvs-add-reviewers]");
  if (addReviewersButtonExist) return;

  devsparkSidebarSection.appendChild(<ReviewersDetailsButton /> as Node);
}

function ReviewersDetailsButton() {

  function onGroupSelection(event: Event) {
    event.preventDefault();
    const formEl = event.target as HTMLFormElement;
    const formDataGroup = new FormData(formEl);
    const selectedGroup = formDataGroup.get("dvs-select-reviewer-group");

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
    formDataRequest.append("reviewer_user_ids[]", selectedGroup as string);
    console.log("🚀 ~ file: add-reviewers.tsx:46 ~ onGroupSelection ~ formDataRequest:", formDataRequest);

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

  return (
    <Details dataDvs="add-reviewers" title="Add reviewers">
      <form class="mx-3 mb-3" onsubmit={onGroupSelection}>
        <dl class="form-group">
          <dt>
            <label for="dvs-select-reviewer-group">Select your group</label>
          </dt>

          <dd>
            <select name="dvs-select-reviewer-group" id="dvs-select-group" class="form-select form-control">
              <option value="6838136">pastr</option>
            </select>
          </dd>
        </dl>

        <button type="submit" class="btn btn-sm btn-primary">Select</button>
      </form>
    </Details>
  );

}

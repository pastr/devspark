// TODOE: Not used currently, to be improve
chrome.tabs.onUpdated.addListener(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.url.includes("github.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: requestToAddReviewers
    });
  }
});

chrome.tabs.onActivated.addListener(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.url.includes("github.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: requestToAddReviewers
    });
  }
});


// It should work but probably needs improvements
function requestToAddReviewers() {
  const authenticity_token = document.querySelector("#partial-discussion-sidebar > div.discussion-sidebar-item.sidebar-assignee.js-discussion-sidebar-item.position-relative > form > input[type=hidden]")?.value;
  const reviewersParent = document.querySelector("[data-reviewers-team-size-check-url]");
  const reviewers = document.querySelector("#reviewers-select-menu");
  const addReviewersButton = document.querySelector("[data-inserted");
  const githubOrganization = window.location.pathname.split("/")[1];
  const githubRepo = window.location.pathname.split("/")[2];
  const githubPrNumber = window.location.pathname.split("/")[4];
  const prUrl = `https://github.com/${githubOrganization}/${githubRepo}/pull/${githubPrNumber}`;

  if (!addReviewersButton && reviewersParent) {
    const addBenzeneReviewersButton = document.createElement("button");
    const benzeneReviewersButtonContainer = document.createElement("div");
    const menuTitle = document.createElement("div");

    menuTitle.classList.add("text-bold");
    menuTitle.innerText = "Eqtension";

    benzeneReviewersButtonContainer.style.display = "flex";
    benzeneReviewersButtonContainer.style.justifyContent = "center";
    benzeneReviewersButtonContainer.style.marginTop = "12px";
    benzeneReviewersButtonContainer.style.marginBottom = "12px";
    benzeneReviewersButtonContainer.dataset.inserted = "true";

    addBenzeneReviewersButton.innerText = "Add custom Reviewers";
    addBenzeneReviewersButton.classList.add("btn", "btn-outline", "btn-sm");

    benzeneReviewersButtonContainer.appendChild(addBenzeneReviewersButton);
    reviewersParent.insertBefore(benzeneReviewersButtonContainer, reviewers);
    reviewersParent.insertBefore(menuTitle, benzeneReviewersButtonContainer);

    const formData = new FormData();
    formData.set("authenticity_token", authenticity_token);
    formData.set("dummy-field-just-to-avoid-empty-submit", "foo");

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

    addBenzeneReviewersButton.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      chrome.storage.sync.get("users", ({ users }) => {
        Object.values(users).forEach((user) => {
          formData.append("reviewer_user_ids[]", user);
        });

        fetch(`${prUrl}/review-requests`, {
          "headers": headers,
          "referrer": prUrl,
          "referrerPolicy": "strict-origin-when-cross-origin",
          body: formData,
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
        });
      });
    });
  }
}

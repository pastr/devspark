import browser from "webextension-polyfill";

browser.tabs.onUpdated.addListener(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (tab.url!.includes("github.com")) {
    browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: addOpenAllCommentsButton
    });
  }
});

browser.tabs.onActivated.addListener(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (tab.url!.includes("github.com")) {
    browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: addOpenAllCommentsButton
    });
  }
});

function addOpenAllCommentsButton() {
  const devsparkSidebarSection = document.querySelector("#devspark-sidebar-section");
  const openAllCommentsButtonExist = document.querySelector("[data-all-comments-inserted]");

  if (!openAllCommentsButtonExist && devsparkSidebarSection) {
    const openAllCommentsButton = document.createElement("button");
    openAllCommentsButton.innerText = "Open all resolved comments";
    openAllCommentsButton.classList.add("btn", "btn-outline", "btn-sm", "mr-3", "mb-2");
    openAllCommentsButton.dataset.allCommentsInserted = "true";

    openAllCommentsButton.addEventListener("click", async () => {
      document.querySelectorAll(".js-resolvable-timeline-thread-container").forEach((e) => {
        e.setAttribute("open", "");
      });
    });
    devsparkSidebarSection.appendChild(openAllCommentsButton);
  }

}
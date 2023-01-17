import browser from "webextension-polyfill";

browser.tabs.onUpdated.addListener(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (tab.url!.includes("github.com")) {
    browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: addDevsparkSectionToConversationPage
    });
  }
});

browser.tabs.onActivated.addListener(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (tab.url!.includes("github.com")) {
    browser.scripting.executeScript({
      target: { tabId: tab.id! },
      func: addDevsparkSectionToConversationPage
    });
  }
});

function addDevsparkSectionToConversationPage() {
  const discussionSidebarContainer = document.querySelector("#partial-discussion-sidebar");
  const firstDiscussionSideBarItem = document.querySelector(".discussion-sidebar-item.sidebar-assignee.js-discussion-sidebar-item");
  const devsparkSectionExist = document.querySelector("[data-devspark-section-inserted");

  if (!devsparkSectionExist && firstDiscussionSideBarItem && discussionSidebarContainer) {
    const devsparkSidebarSection = document.createElement("section");
    devsparkSidebarSection.id = "devspark-sidebar-section";
    devsparkSidebarSection.classList.add("discussion-sidebar-item", "sidebar-assignee", "js-discussion-sidebar-item", "text-bold", "discussion-sidebar-heading");
    devsparkSidebarSection.dataset.devsparkSectionInserted = "true";

    const sectionTitle = document.createElement("div");
    sectionTitle.innerText = "Devspark";
    sectionTitle.classList.add("mb-2");

    devsparkSidebarSection.appendChild(sectionTitle);

    discussionSidebarContainer.insertBefore(devsparkSidebarSection, firstDiscussionSideBarItem);
  }

}

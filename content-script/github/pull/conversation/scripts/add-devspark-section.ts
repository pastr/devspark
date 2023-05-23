export function addDevsparkSectionToConversationPage() {
  const discussionSidebarContainer = document.querySelector<HTMLDivElement>("#partial-discussion-sidebar");
  const firstDiscussionSideBarItem = document.querySelector(".discussion-sidebar-item.sidebar-assignee.js-discussion-sidebar-item");
  const devsparkSectionExist = document.querySelector("[data-devspark-section-inserted");

  if (!devsparkSectionExist && firstDiscussionSideBarItem && discussionSidebarContainer) {
    const devsparkSidebarSection = document.createElement("section");
    devsparkSidebarSection.id = "devspark-sidebar-section";
    devsparkSidebarSection.classList.add("discussion-sidebar-item", "sidebar-assignee", "js-discussion-sidebar-item", "text-bold", "discussion-sidebar-heading");
    devsparkSidebarSection.dataset.devsparkSectionInserted = "true";
    devsparkSidebarSection.style.position = "sticky";
    devsparkSidebarSection.style.top = "60px";
    devsparkSidebarSection.style.zIndex = "10";
    devsparkSidebarSection.style.backgroundColor = "var(--color-canvas-default)";

    const sectionTitle = document.createElement("div");
    sectionTitle.innerText = "Devspark";
    sectionTitle.classList.add("mb-2");

    discussionSidebarContainer.style.height = "100%";
    devsparkSidebarSection.appendChild(sectionTitle);

    discussionSidebarContainer.insertBefore(devsparkSidebarSection, firstDiscussionSideBarItem);
  }

}

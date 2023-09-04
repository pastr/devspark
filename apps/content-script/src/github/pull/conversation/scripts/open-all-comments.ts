export function addOpenAllCommentsButton() {
  const showResolvedButtons = document.querySelectorAll(".js-resolvable-timeline-thread-container");
  const devsparkSidebarSection = document.querySelector("#devspark-sidebar-section");
  const openAllCommentsButtonExist = document.querySelector("[data-all-comments-inserted]");

  if (showResolvedButtons.length === 0) return;

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

export function addOpenAllCommentsAndLoadMoreButton() {
  const devsparkSidebarSection = document.querySelector("#devspark-sidebar-section");
  const openAllCommentsAndLoadMoreButtonExist = document.querySelector("[data-all-comments-and-load-more-inserted]");
  const ajaxButtons = document.querySelectorAll<HTMLButtonElement>(".ajax-pagination-btn");

  if (ajaxButtons.length === 0) return;

  if (!openAllCommentsAndLoadMoreButtonExist && devsparkSidebarSection) {
    const openAllCommentsAndLoadMoreButton = document.createElement("button");
    openAllCommentsAndLoadMoreButton.innerText = "Load and open all comments";
    openAllCommentsAndLoadMoreButton.classList.add("btn", "btn-outline", "btn-sm", "mr-3", "mb-2");
    openAllCommentsAndLoadMoreButton.dataset.allCommentsAndLoadMoreInserted = "true";

    function openAllCommentsAndLoadMore() {
      console.log("🚀 ~ file: open-all-comments-and-load-more.ts:13 ~ openAllCommentsAndLoadMore ~ ajaxButtons:", ajaxButtons);
      for (const ajaxButton of ajaxButtons) {
        ajaxButton.click();
      }

      setTimeout(() => {
        if (ajaxButtons.length > 0) {
          openAllCommentsAndLoadMore();
          // openGithubComment(); doesn't work
          document.querySelectorAll(".js-resolvable-timeline-thread-container").forEach((e) => {
            e.setAttribute("open", "");
          });
        }
      }, 1500);
    }

    openAllCommentsAndLoadMoreButton.addEventListener("click", openAllCommentsAndLoadMore);
    devsparkSidebarSection.appendChild(openAllCommentsAndLoadMoreButton);
  }
}

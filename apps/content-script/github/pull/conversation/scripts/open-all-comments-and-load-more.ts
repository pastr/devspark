export function addOpenAllCommentsAndLoadMoreButton() {
  const devsparkSidebarSection = document.querySelector("#devspark-sidebar-section");
  const openAllCommentsAndLoadMoreButtonExist = document.querySelector("[data-all-comments-and-load-more-inserted]");

  if (!openAllCommentsAndLoadMoreButtonExist && devsparkSidebarSection) {
    const openAllCommentsAndLoadMoreButton = document.createElement("button");
    openAllCommentsAndLoadMoreButton.innerText = "Load and open all comments";
    openAllCommentsAndLoadMoreButton.classList.add("btn", "btn-outline", "btn-sm", "mr-3", "mb-2");
    openAllCommentsAndLoadMoreButton.dataset.allCommentsAndLoadMoreInserted = "true";

    function openAllCommentsAndLoadMore() {
      const ajaxButtons = document.querySelectorAll<HTMLButtonElement>(".ajax-pagination-btn");
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

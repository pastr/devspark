export function loadAllDifss() {
  const buttonExist = !!document.querySelector<HTMLElement>("#devspark-load-all-diffs");
  const rev = document.querySelector(".pr-review-tools");
  if (!buttonExist && rev) {
    const openDeletedFilesButton = document.createElement("button");
    openDeletedFilesButton.id = "devspark-load-all-diffs";
    openDeletedFilesButton.innerText = "Load all diffs";
    openDeletedFilesButton.classList.add("diffbar-item", "btn", "btn-outline", "btn-sm", "mr-3");
    rev.insertBefore(openDeletedFilesButton, rev.firstChild);

    openDeletedFilesButton.addEventListener("click", () => {
      const loadDiffButtons = document.querySelectorAll<HTMLButtonElement>("[aria-describedby^=\"hidden-diff-reason\"]");
      loadDiffButtons.forEach((loadDiffButton) => {
        loadDiffButton.click();
      });
    });
  }
}

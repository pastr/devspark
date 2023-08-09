const styles = `
.blob-code-inner {
  white-space: pre !important;
}

.js-file-content {
  overflow-x: auto !important;
  overflow-y: hidden !important;
}

.diff-table:not(.js-file-level-comments-tablefile-diff-split) {
  width: auto !important;
}
`;

export function addNoWrapForDiffButton() {
  const buttonExist = !!document.querySelector<HTMLElement>("#devspark-load-all-diffs");
  const rev = document.querySelector(".pr-review-tools");
  if (!buttonExist && rev) {
    const toggleNoWrapModeButton = document.createElement("button");
    toggleNoWrapModeButton.id = "devspark-diff-no-wrap";
    toggleNoWrapModeButton.innerText = "Toggle no wrap mode";
    toggleNoWrapModeButton.classList.add("diffbar-item", "btn", "btn-outline", "btn-sm", "mr-3");
    rev.insertBefore(toggleNoWrapModeButton, rev.firstChild);

    toggleNoWrapModeButton.addEventListener("click", () => {
      const noWrapStylesExist = document.querySelector<HTMLStyleElement>("style[data-devspark-diff-no-wrap]");
      if (noWrapStylesExist) {
        noWrapStylesExist.parentNode!.removeChild(noWrapStylesExist);
      } else {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        styleSheet.dataset.devsparkDiffNoWrap = "";
        document.head.appendChild(styleSheet);
      }
    });
  }
}

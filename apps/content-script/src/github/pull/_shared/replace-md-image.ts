// TODO: Need to disconnect the mutationObserver when the textarea is removed from the DOM
// I could have a global array of mutationObservers and disconnect them all when the page is unloaded

const textareaIds = new Map();

function replaceMdImage(textarea: HTMLTextAreaElement, originalContent: string) {
  // Regex to find Markdown image syntax
  const markdownImageRegex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/;

  const match = markdownImageRegex.exec(originalContent);

  if (match) {
    const replacedContent = originalContent.replace(markdownImageRegex, "<img src=\"$2\" alt=\"$1\" width=\"\" height=\"\">");
    textarea.value = replacedContent;
  }

}

export function replaceMdImageSetup() {
  const turboFrame = document.querySelector("#repo-content-turbo-frame") as HTMLDivElement | null;

  if (!turboFrame) return;
  if (turboFrame.dataset.dvsReplaceMdImage === "true") return;

  turboFrame.dataset.dvsReplaceMdImage = "true";

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

      if (mutation.target.nodeName === "TEXTAREA") {
        // When writing text into a textarea, the attribute "style" is changed
        const textarea = mutation.target as HTMLTextAreaElement;
        const originalContent = textarea.value;
        replaceMdImage(textarea, originalContent);
      }

      if (mutation.type !== "childList") return;
      const addedNodes = mutation.addedNodes as NodeListOf<HTMLElement>;
      if (addedNodes.length === 0) return;
      let textarea = null as null | HTMLTextAreaElement;

      Array.from(addedNodes).forEach((node) => {
        if (node.nodeName ==="#text" || node.nodeName === "#comment") return;
        textarea = node.querySelector("textarea");
      });

      if (!textarea) return;

      const originalContent = textarea.value;

      if (textareaIds.has(textarea.id)) return;

      textareaIds.set(textarea.id, originalContent);


      // eslint-disable-next-line no-extra-parens
      textarea.addEventListener("input", (e: Event) => replaceMdImage(e.target as HTMLTextAreaElement, (e.target as HTMLTextAreaElement).value));
      // eslint-disable-next-line no-extra-parens
      textarea.addEventListener("change", (e: Event) => replaceMdImage(e.target as HTMLTextAreaElement, (e.target as HTMLTextAreaElement).value));
    });
  });

  const config = { attributes: true, childList: true, characterData: false, subtree: true, attributeOldValue: true };

  observer.observe(turboFrame, config);
}



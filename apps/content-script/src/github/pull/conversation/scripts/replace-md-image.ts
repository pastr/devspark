// TODO: Need to disconnect the mutationObserver when the textarea is removed from the DOM
// I could have a global array of mutationObservers and disconnect them all when the page is unloaded


export function replaceMdImage() {
  const commentsTextarea = document.querySelectorAll("[name=\"comment[body]\"");
  if (!commentsTextarea.length) return;

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      const textarea = mutation.target;
      const originalContent = textarea.value;

      // Regex to find Markdown image syntax
      const markdownImageRegex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/;

      const match = markdownImageRegex.exec(originalContent);

      if (match) {
        const replacedContent = originalContent.replace(markdownImageRegex, "<img src=\"$2\" alt=\"$1\" width=\"\">");

        textarea.value = replacedContent;

        // Calculate the position to place the caret
        const startOfTag = replacedContent.indexOf("<img src=\"");
        const dynamicLength = match[2].length + match[1].length;
        const staticLength = "<img src=\"\" alt=\"\" width=\"".length;
        const widthPosition = startOfTag + staticLength + dynamicLength;

        // Set the caret position
        textarea.focus();
        textarea.selectionStart = widthPosition;
        textarea.selectionEnd = widthPosition;
      }
    });
  });

  const config = { attributes: true, childList: false, characterData: false };

  commentsTextarea.forEach((textarea) => {
    observer.observe(textarea, config);
  });
}

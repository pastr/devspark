let currentObserver: MutationObserver | null = null;
let observingReviewCommentTextarea = false;
const textareaIds = new Map();


export function replaceMdImageSetup() {
  const reviewCommentTextarea = document.querySelector("[name=\"pull_request_review[body]\"]") as HTMLTextAreaElement | null;

  if (reviewCommentTextarea && !observingReviewCommentTextarea) {
    reviewCommentTextarea.addEventListener("input", replaceMdImageCb);
    reviewCommentTextarea.addEventListener("change", replaceMdImageCb);
    observingReviewCommentTextarea = true;
  }

  const turboFrame = document.querySelector("#repo-content-turbo-frame") as HTMLDivElement | null;

  if (!turboFrame) return;
  if (turboFrame.dataset.dvsReplaceMdImage === "true") return;

  turboFrame.dataset.dvsReplaceMdImage = "true";

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === "attributes" && mutation.target.nodeName === "TEXTAREA") {
        handleAttributeChange(mutation);
      }

      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        handleChildListChange(mutation);
      }
    });
  });

  const config = { attributes: true, childList: true, subtree: true };

  currentObserver?.disconnect();

  observer.observe(turboFrame, config);

  currentObserver = observer;

}

function handleAttributeChange(mutation: MutationRecord) {
  // When writing text into a textarea, the attribute "style" is changed
  const textarea = mutation.target as HTMLTextAreaElement;
  const originalContent = textarea.value;
  replaceMdImage(textarea, originalContent);
}


function handleChildListChange(mutation: MutationRecord) {
  const addedNodes = mutation.addedNodes as NodeListOf<HTMLElement>;
  let textarea = null as null | HTMLTextAreaElement;

  Array.from(addedNodes).forEach((node) => {
    if (node.nodeName === "#text" || node.nodeName === "#comment" || !node.querySelector("textarea")) return;
    textarea = node.querySelector("textarea");
  });

  if (!textarea || textareaIds.has(textarea.id)) return;

  textareaIds.forEach((textarea) => {
    textarea.removeEventListener("input", replaceMdImageCb);
    textarea.removeEventListener("change", replaceMdImageCb);
  });

  textareaIds.set(textarea.id, textarea);


  textarea.addEventListener("input", replaceMdImageCb);
  textarea.addEventListener("change", replaceMdImageCb); // For when the user drag and drop an image into the textarea
}

function replaceMdImageCb(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  replaceMdImage(target, target.value);
}


function replaceMdImage(textarea: HTMLTextAreaElement, originalContent: string) {
  // Regex to find Markdown image syntax
  const markdownImageRegex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/;

  const replacedContent = originalContent.replace(markdownImageRegex, "<img src=\"$2\" alt=\"$1\" width=\"\" height=\"\">");
  if (replacedContent !== originalContent) {
    textarea.value = replacedContent;
  }
}

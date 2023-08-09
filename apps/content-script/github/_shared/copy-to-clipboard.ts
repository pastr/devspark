export function addCopyToClipboardButton<ElementType extends Element>(selector: string, getValue: (el: ElementType) => any, onClick?: (e?: MouseEvent) => void): void {
  const copyButtonsExists = !!document.querySelectorAll("clipboard-copy[data-devspark-copy-file-name]").length;

  if (!copyButtonsExists) {
    const elements = document.querySelectorAll<ElementType>(selector);
    elements.forEach((element) => {
      const valueToCopy = getValue(element);


      if (valueToCopy && element.parentNode) {
        const clipboardCopy = document.createElement("clipboard-copy");
        clipboardCopy.setAttribute("data-copy-feedback", "Filename copied!");
        clipboardCopy.setAttribute("aria-label", "Copy filename");
        clipboardCopy.setAttribute("value", valueToCopy);
        clipboardCopy.setAttribute("data-view-component", "true");
        clipboardCopy.setAttribute("class", "Link--onHover color-fg-muted ml-2 mr-2");
        clipboardCopy.setAttribute("tabindex", "0");
        clipboardCopy.setAttribute("role", "button");
        clipboardCopy.setAttribute("data-devspark-copy-file-name", "true");
        clipboardCopy.style.setProperty("color", "var(--color-btn-outline-text)", "important");

        clipboardCopy.innerHTML = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy" style="display: inline-block;">
        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
    </svg>
        <svg style="display: none;" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check color-fg-success">
        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
    </svg>`;


        clipboardCopy.addEventListener("click", (e) => {
          if (onClick) {
            onClick(e);
          }
          navigator.clipboard.writeText(valueToCopy);
        });

        element.parentNode.insertBefore(clipboardCopy, element.nextSibling);
      }
    });
  }

}

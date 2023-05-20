import { addCopyToClipboardButton } from "../../../../_shared/copy-to-clipboard";

export function addCopyFileNameButtonToFilesComments(): void {
  addCopyToClipboardButton<HTMLAnchorElement>(
    "a[title].Link--primary",
    (element) => element.getAttribute("title")?.split("/").at(-1)
  );
}

import { addCopyToClipboardButton } from "../../../_shared/copy-to-clipboard";

export function addCopyFileNameButtonToConversationComments(): void {
  addCopyToClipboardButton<HTMLAnchorElement>("summary[role=button] a", (element) => element.text?.split("/").at(-1), (e) => {
    e?.preventDefault();
  });
}

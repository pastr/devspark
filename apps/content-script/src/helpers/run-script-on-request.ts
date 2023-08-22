import { IMessage } from "@devspark/types/interfaces/IMessage";

export function runScriptOnRequests(message: IMessage, cb: () => void, requests: RegExp[]): void {
  requests.forEach((request) => {
    if (request.test(message.eventDetails.url)) {
      cb();
    }
  });
}

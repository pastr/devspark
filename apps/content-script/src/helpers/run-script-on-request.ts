import { IMessage } from "@devspark/types/interfaces/IMessage";

export function runScriptOnRequests(message: IMessage, cb: any, requests: RegExp[]): void {
  requests.forEach((request) => {
    if (request.test(message.eventDetails.url)) {
      cb();
    }
  });
}

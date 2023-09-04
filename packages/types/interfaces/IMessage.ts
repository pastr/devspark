interface IEventWebRequestDetails {
  url: string;
}

interface IWebRequestCompleted {
  eventType: "WebRequestCompleted";
  eventDetails: IEventWebRequestDetails;
}

interface IWebRequestStarted {
  eventType: "WebRequestStarted";
  eventDetails: IEventWebRequestDetails;
}

export interface IMessageOpenOptionsPage {
  eventType: "OpenOptionsPage";
  path: string;
}


export type IMessage = IWebRequestCompleted | IWebRequestStarted ;

import { RibbonOptions } from "./IRibbonOptions";

export interface IOptionsContextState {
  jira?: {
    organizationName?: string
    ticketPrefix?: string
    ticketHistory?: string[]
  },
  github?: {
    deemphasizeTextList?: string[]
  },
  allHost?: {
    environmentName?: IEnvrionmentNameState[]
  }
}


export interface IEnvrionmentNameState extends RibbonOptions {
  url: string,
  shape: "ribbon" | "triangle" | "line" | "square";
}

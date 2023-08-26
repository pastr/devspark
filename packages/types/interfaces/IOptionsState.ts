import { RibbonOptions } from "./IRibbonOptions";
import { TGhColorPrType } from "./TGhColorPrType";

export interface IOptionsContextState {
  jira?: {
    organizationName?: string
    ticketPrefix?: string
    ticketHistory?: string[]
  },
  github?: {
    prColors?: {
      type: TGhColorPrType
      color: string
      regexString: string
    }[]
  },
  allHost?: {
    environmentName?: IEnvrionmentNameState[]
  }
}


export interface IEnvrionmentNameState extends RibbonOptions {
  url: string,
  shape: "ribbon" | "triangle" | "line" | "square";
}

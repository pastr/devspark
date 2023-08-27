import { RibbonOptions } from "./IRibbonOptions";
import { IGhColorPr } from "./IghColorPr";
import { TGhColorPrType } from "./TGhColorPrType";

export interface IOptionsContextState {
  jira?: {
    organizationName?: string
    ticketPrefix?: string
    ticketHistory?: string[]
  },
  github?: {
    prColors?: IGhColorPr[]
  },
  allHost?: {
    environmentName?: IEnvrionmentNameState[]
  }
}


export interface IEnvrionmentNameState extends RibbonOptions {
  url: string,
  shape: "ribbon" | "triangle" | "line" | "square";
}

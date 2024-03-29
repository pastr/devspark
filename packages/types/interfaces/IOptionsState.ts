import { RibbonOptions } from "./IRibbonOptions";
import { IGhColorPr } from "./IGhColorPr";
import { TGhColorPrType } from "./TGhColorPrType";
import { IGhReviewersGroup } from "./IGhReviewersGroup";
import { IGhGeneralOptions } from "./IGhGeneralOptions";

export interface IOptionsContextState {
  jira: {
    organizationName: string
    ticketPrefix: string
    ticketHistory: string[]
  },
  github: {
    prColors: IGhColorPr[],
    reviewersGroup: IGhReviewersGroup[],
    generalOptions: IGhGeneralOptions
  },
  allHost: {
    environmentName: IEnvrionmentNameState[]
  }
}


export interface IEnvrionmentNameState extends RibbonOptions {
  url: string,
  shape: "ribbon" | "triangle" | "line" | "square";
}

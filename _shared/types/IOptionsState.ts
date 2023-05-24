import { RibbonOptions } from "../../content-script/all-hosts/environment-name/ribbon-corner";

export interface IOptionsContextState {
  jira?: {
    organizationName?: string
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

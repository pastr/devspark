// TRy to do a workspace once there is no more error with svg
import JiraLogo from "../../../images/logo/jira.svg";
import GithubLogo from "../../../images/logo/github.svg";
import { ESupportedApps } from "@devspark/types/enums/ESupportedApps";

type Props = {
  title: string;
  icon?: ESupportedApps;
  iconClassName?: string;
}

export const LOGOS = {
  [ESupportedApps.GitHub]: GithubLogo,
  [ESupportedApps.Jira]: JiraLogo
};

export default function AppTitle({ title, icon, iconClassName }: Props) {
  return (
    <span className="flex items-center">
      {title}
      {icon && <img className={`${iconClassName}`} src={LOGOS[icon]} alt={`${title} logo`} />}
    </span>
  );
}

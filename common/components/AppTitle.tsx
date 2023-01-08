import JiraLogo from "../images/jira.png";
import GithubLogo from "../images/github.png";
import { ESupportedApps } from "../enums/ESupportedApps";

type Props = {
  title: string;
  icon?: ESupportedApps;
  iconClassName?: string;
}

const LOGOS = {
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
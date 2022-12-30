import JiraLogo from '../images/jira.png'
import GithubLogo from '../images/github.png'
import { ESupportedApps } from '../../common/enums/ESupportedApps';

type Props = {
  title: string;
  icon?: ESupportedApps
}

const LOGOS = {
  [ESupportedApps.GitHub]: GithubLogo,
  [ESupportedApps.Jira]: JiraLogo
}

export default function AppTitle({title, icon}: Props) {
  return (
    <div className="flex items-center">
        {title}
        {icon && <img className="h-5 ml-1" src={LOGOS[icon]} alt={`${title} logo`} />}
    </div>
  )
}
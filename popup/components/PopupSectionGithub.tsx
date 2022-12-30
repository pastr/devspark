import { ESupportedApps } from "../../common/enums/ESupportedApps";
import PopupSection from "./PopupSection";

type Props = {}

export default function PopupSectionGithub({}: Props) {
  return (
    <PopupSection title='Github' icon={ESupportedApps.GitHub}>
      <div>
        content
      </div>
  </PopupSection>
  )
}
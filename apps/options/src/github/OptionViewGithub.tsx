import { Outlet } from "react-router-dom";

import { ESupportedApps } from "@devspark/types/enums/ESupportedApps";

import OptionView from "../_shared/components/OptionView";


export default function OptionViewGithub() {
  return (
    <OptionView title="GitHub" icon={ESupportedApps.GitHub}>
      <Outlet />
    </OptionView>
  );
}

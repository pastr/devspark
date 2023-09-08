import GhOptionPageTitle from "../../components/GhOptionPageTitle";

import { GhPrColorsForm } from "./components/GhPrColorsForm";
import { GhPrColorsTable } from "./components/GhPrColorsTable";


export default function GhPrColors() {
  return (
    <div>
      <GhOptionPageTitle title="Customize Pull Requests Color" >
        <>
          <p>Change the colors of the pull requests in the pull request list page.</p>
          <p>The order matter, if a PR match two rules then only the latest one will be applied</p>
        </>
      </GhOptionPageTitle>

      <GhPrColorsForm />

      <div className="mt-4">
        <GhPrColorsTable />
      </div>
    </div>
  );
}

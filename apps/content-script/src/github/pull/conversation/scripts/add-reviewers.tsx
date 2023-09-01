import { Details } from "./details/Details";

export function addReviewersButton() {
  const devsparkSidebarSection = document.querySelector("#devspark-sidebar-section");
  if (!devsparkSidebarSection) return;

  const addReviewersButtonExist = document.querySelector("[data-dvs-add-reviewers]");
  if (addReviewersButtonExist) return;

  devsparkSidebarSection.appendChild(<ReviewersDetailsButton /> as Node);
}

function ReviewersDetailsButton() {

  function onGroupSelection(event: Event) {
    event.preventDefault();
    const formEl = event.target as HTMLFormElement;
    const formData = new FormData(formEl);
    const selectedGroup = formData.get("dvs-select-reviewer-group");
  }

  return (
    <Details dataDvs="add-reviewers" title="Add reviewers">
      <form class="mx-3 mb-3" onsubmit={onGroupSelection}>
        <dl class="form-group">
          <dt>
            <label for="dvs-select-reviewer-group">Select your group</label>
          </dt>

          <dd>
            <select name="dvs-select-reviewer-group" id="dvs-select-group" class="form-select form-control">
              <option value="pastr">pastr</option>
            </select>
          </dd>
        </dl>

        <button type="submit" class="btn btn-sm btn-primary">Select</button>
      </form>
    </Details>
  );

}

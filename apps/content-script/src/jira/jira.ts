const main = document.querySelector("#jira-frontend");
// const boardTitle = document.querySelector("[data-testid=\"software-board.header.title.container\"] [data-read-view-fit-container-width]");

const style = document.createElement("style");
style.innerHTML = `
  .dvs-fullscreen-button {
    padding: 0;
    border: none;
    background: none;
    display: flex;
    justify-content: center;
    margin-left: 10px;
    cursor: pointer;
  }

  .dvs-fullscreen-button:hover {
    background: #f4f5f7;
  }
`;
document.head.appendChild(style);


const observer = new MutationObserver(() => {
  let fullScreen = false;
  const boardTitle = document.querySelector("[data-testid=\"software-board.header.title.container\"]") as HTMLElement | null;
  const ghxHeader = document.querySelector("#ghx-header");
  const parentContainer = boardTitle ?? ghxHeader as HTMLElement | null;
  if (parentContainer && !parentContainer.dataset.dvsBoardTitle) {
    parentContainer.style.display = "flex";
    parentContainer.style.alignItems = "center";
    parentContainer.dataset.dvsBoardTitle = "true";

    const fullscreenButton = document.createElement("button");
    fullscreenButton.classList.add("dvs-fullscreen-button");
    fullscreenButton.innerHTML = fsButtonIcon;
    fullscreenButton.style.marginTop = parentContainer.id ? "" : "3px";


    fullscreenButton.addEventListener("click", () => {
      // Hide stuff using display none, and remove display grid of div  data-layout-container="true"
      fullScreen = !fullScreen;
      const breadcrumbsKanbanBoard = document.querySelector("[data-testid=\"rapidboard-breadcrumbs\"]");
      console.log("🚀 ~ file: jira.ts:47 ~ fullscreenButton.addEventListener ~ breadcrumbsKanbanBoard:", breadcrumbsKanbanBoard);
      const headerMenu = document.querySelector("#jira-frontend > div:nth-child(3) > div.css-1q41chj > div._1pby1fcb._kqswh2mm._154i1ter");
      const leftMenu = document.querySelector("#jira-frontend > div:nth-child(3) > div.css-1q41chj > div.css-1btht9s > div._kqswh2mm._1pbyg9ti._14c1glyw");
      const gridContainer = document.querySelector("#jira-frontend > div:nth-child(3) > div.css-1q41chj");
      headerMenu?.style.setProperty("display", fullScreen ? "none" : "flex", "important");
      leftMenu?.style.setProperty("display", fullScreen ? "none" : "flex", "important");
      gridContainer?.style.setProperty("display", fullScreen ? "block" : "grid", "important");
      // breadcrumbsKanbanBoard?.style.setProperty("display", fullScreen ? "none" : "block", "important");
      // parentContainer.style.setProperty("margin-top", fullScreen ? "10px" : "0px", "important");


      if (fullScreen) {
        fullscreenButton.innerHTML = exitFullScreenIcon;
      } else {
        fullscreenButton.innerHTML = fsButtonIcon;
      }

    });

    parentContainer.appendChild(fullscreenButton);
  }
});
observer.observe(main, { subtree: true, childList: true });


const fsButtonIcon = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" role=\"presentation\"><path d=\"M16.587 6.003H15A1 1 0 0115 4h3.9l.047.001a.975.975 0 01.736.285l.032.032c.2.2.296.47.284.736l.001.048v3.896a1 1 0 11-2 0V7.411l-3.309 3.308a.977.977 0 01-1.374-.005l-.032-.032a.976.976 0 01-.005-1.374l3.307-3.305zM7.413 17.997H9A1 1 0 019 20H5.1l-.047-.001a.975.975 0 01-.736-.285l-.032-.032A.977.977 0 014 18.946a1.12 1.12 0 010-.048v-3.896a1 1 0 112 0v1.587l3.309-3.308a.977.977 0 011.374.005l.032.032a.976.976 0 01.005 1.374l-3.307 3.305z\" fill=\"currentColor\" fill-rule=\"evenodd\"></path></svg>";
const exitFullScreenIcon = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" role=\"presentation\"><path d=\"M16.413 8.997H18A1 1 0 0118 11h-3.9l-.047-.001a.975.975 0 01-.736-.285l-.032-.032A.977.977 0 0113 9.946a1.12 1.12 0 010-.048V6.002a1 1 0 112 0v1.587l3.309-3.308a.977.977 0 011.374.005l.032.032a.976.976 0 01.005 1.374l-3.307 3.305zm-8.826 6.006H6A1 1 0 016 13h3.9l.047.001a.975.975 0 01.736.285l.032.032c.2.2.296.47.284.736l.001.048v3.896a1 1 0 11-2 0v-1.587l-3.309 3.308a.977.977 0 01-1.374-.005l-.032-.032a.976.976 0 01-.005-1.374l3.307-3.305z\" fill=\"currentColor\" fill-rule=\"evenodd\"></path></svg>";

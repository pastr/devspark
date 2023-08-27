
let isListenersAdded = false;
let isResizing = false;
let startWidth = 0;
let startX = 0;
let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
let mouseUpHandler: ((e: MouseEvent) => void) | null = null;

function handleMouseDown(e: MouseEvent) {
  isResizing = true;
  const sidebar = e.target?.parentElement;
  startWidth = sidebar.offsetWidth;
  startX = e.pageX;
}

export function addResizePropertyToSidebar() {
  const sidebar = document.querySelector(".Layout .Layout-sidebar") as HTMLDivElement;
  const originalSidebarWidth = sidebar.offsetWidth;
  const pullFilesPage = window.location.href.split("/").at(-1) === "files";

  if (!sidebar || !pullFilesPage) return;

  const searchInput = document.querySelector<HTMLInputElement>("#file-tree-filter-field");
  if (searchInput) {
    searchInput.style.borderBottomRightRadius = "0px";
  }

  sidebar.style.setProperty("resize", "horizontal");

  const oldHandle = sidebar.querySelector(".resize-handle") as HTMLDivElement;
  if (oldHandle) {
    oldHandle.removeEventListener("mousedown", handleMouseDown);
    oldHandle.remove();
  }

  const resizeHandle = document.createElement("div");
  resizeHandle.classList.add("resize-handle");
  sidebar.appendChild(resizeHandle);

  resizeHandle.addEventListener("mousedown", handleMouseDown);

  if (isListenersAdded) {
    window.removeEventListener("mousemove", mouseMoveHandler!);
    window.removeEventListener("mouseup", mouseUpHandler!);
  }

  mouseMoveHandler = (e: MouseEvent) => {
    const sidebar = document.querySelector(".Layout .Layout-sidebar") as HTMLDivElement;
    const diffX = e.pageX - startX;
    if (!isResizing || !sidebar || startWidth + diffX < originalSidebarWidth) return;
    sidebar.style.width = `${startWidth + diffX}px`;
  };

  mouseUpHandler = () => {
    isResizing = false;
  };

  window.addEventListener("mousemove", mouseMoveHandler);
  window.addEventListener("mouseup", mouseUpHandler);

  isListenersAdded = true;
}

// Todo: centralize the creation of all styles
const style = document.createElement("style");

style.textContent = `
.resize-handle {
  position: absolute;
  right: 0px;
  top: 32px;
  width: 7px;
  height: 100%;
  cursor: ew-resize;
  border-right: 1px solid var(--color-border-default);
  z-index: 10;
}`;

document.head.append(style);



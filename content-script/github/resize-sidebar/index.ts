
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
  const pullFilesPage = window.location.href.split("/").at(-1) === "files";
  console.log("🚀 ~ file: index.ts:19 ~ addResizePropertyToSidebar ~ pullFilesPage:", pullFilesPage);
  if (!sidebar || !pullFilesPage) return;

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
    if (!isResizing || !sidebar) return;
    const diffX = e.pageX - startX;
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
  right: 0;
  top: 0;
  width: 10px;
  height: 100%;
  cursor: ew-resize;
  background: rgba(0,0,0,0.15);
  z-index: 999;
}`;

document.head.append(style);




let isListenersAdded = false;
let isResizing = false;
let startWidth = 0;
let startX = 0;

function handleMouseDown(e: MouseEvent) {
  isResizing = true;
  const sidebar = e.target?.parentElement;
  startWidth = sidebar.offsetWidth;
  startX = e.pageX;
}

export function addResizePropertyToSidebar() {
  const sidebar = document.querySelector(".Layout .Layout-sidebar") as HTMLDivElement;
  if (!sidebar) return;

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

  if (!isListenersAdded) {
    window.addEventListener("mousemove", (e) => {
      if (!isResizing) return;
      const diffX = e.pageX - startX;
      sidebar.style.width = `${startWidth + diffX}px`;
    });

    window.addEventListener("mouseup", () => {
      isResizing = false;
    });

    isListenersAdded = true;
  }
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



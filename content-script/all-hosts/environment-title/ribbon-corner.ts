export type RibbonOptions = {
  position: string;
  backgroundColor: string;
  textColor: string;
  text: string
  fontSize: number;
  toCorner: number;
  height: number;
  horizontalAlign: "left" | "right"
}

// TODO: Add square corner option and just a colored line option with (height and text optional)

/**
 * @author gaoliang
 * @param {*} options: see defaults for detail
 * https://github.com/gaoliang/ribbon-corner
 */
export function ribbonCorner(userOptions: Partial<RibbonOptions> = {}) {
  const defaults: RibbonOptions = {
    backgroundColor: "#67C23A",
    toCorner: 100,
    height: 50,
    horizontalAlign: "left",
    text: "Ribbon Corner",
    textColor: "white",
    position: "fixed",
    fontSize: 15
  };

  const options = Object.assign({}, defaults, userOptions);
  const element = document.createElement("div");
  element.className = "ribbon-corner";
  element.style.zIndex = "10000";
  element.style.display = "flex";
  element.style.justifyContent = "center";
  element.style.alignItems = "center";
  element.style.transformOrigin = "center";
  element.style.position = options.position;
  element.style.backgroundColor = options.backgroundColor;
  element.style.color = options.textColor;
  element.style.fontSize = options.fontSize + "px";
  element.style.fontFamily = "\"PingFang SC\",\"Helvetica Neue\",\"Helvetica\",\"Hiragino Sans GB\",\"Microsoft YaHei\",\"Noto Sans CJK SC\",\"WenQuanYi Micro Hei\",\"Arial\",sans-serif";
  element.style.height = options.height + "px";
  element.innerText = options.text;

  const toTop = options.toCorner / Math.sqrt(2) - options.height / 2;
  const width = options.toCorner * 2 + options.height;
  const offset = options.toCorner / Math.sqrt(2) - width / 2;

  element.style.width = width + "px";
  element.style.top = toTop + "px";

  if (options.horizontalAlign === "left") {
    element.style.transform = "rotate(-45deg)";
    element.style.left = offset + "px";
  } else if (options.horizontalAlign === "right") {
    element.style.transform = "rotate(45deg)";
    element.style.right = offset + "px";
  }
  document.body.appendChild(element);

  return element;
}

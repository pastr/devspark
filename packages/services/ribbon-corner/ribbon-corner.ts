import { IEnvrionmentNameState } from "@devspark/types/interfaces/IOptionsState";

/**
 * Modified from
 * @author gaoliang
 * @param {*} options: see defaults for detail
 * https://github.com/gaoliang/ribbon-corner
 */
export function addRibbon(userOptions: IEnvrionmentNameState) {
  const element = getBaseElement();
  element.style.display = "flex";
  element.style.justifyContent = "center";
  element.style.alignItems = "center";
  element.style.transformOrigin = "center";
  element.style.height = userOptions.height + "px";
  element.style.fontSize = userOptions.fontSize + "px";
  element.style.backgroundColor = userOptions.backgroundColor;
  element.style.color = userOptions.textColor;
  element.innerText = userOptions.text;

  const toTop = userOptions.toCorner / Math.sqrt(2) - userOptions.height / 2;
  const width = userOptions.toCorner * 2 + userOptions.height;
  const offset = userOptions.toCorner / Math.sqrt(2) - width / 2;

  element.style.width = width + "px";
  element.style.top = toTop + "px";

  if (userOptions.horizontalAlign === "left") {
    element.style.transform = "rotate(-45deg)";
    element.style.left = offset + "px";
  } else if (userOptions.horizontalAlign === "right") {
    element.style.transform = "rotate(45deg)";
    element.style.right = offset + "px";
  }
  document.body.appendChild(element);

  return element;
}

export function addLine(userOptions: IEnvrionmentNameState) {
  const element = getBaseElement();
  element.style.height = "3px";
  element.style.backgroundColor = userOptions.backgroundColor;
  element.style.width = "100%";
  element.style.top = "0";
  document.body.appendChild(element);

  return element;
}

export function addSquare(userOptions: IEnvrionmentNameState) {
  const element = getBaseElement();
  element.style.display = "flex";
  element.style.justifyContent = "center";
  element.style.alignItems = "center";
  element.style.height = userOptions.height + "px";
  element.style.fontSize = userOptions.fontSize + "px";
  element.style.width = userOptions.height + "px";
  element.style.backgroundColor = userOptions.backgroundColor;
  element.style.color = userOptions.textColor;
  element.style.top = "0px";
  element.style.overflow = "hidden";
  element.style.fontWeight = "500";
  if (userOptions.horizontalAlign === "left") {
    element.style.left = "0px";
    element.style.borderBottomRightRadius = "5px";

  } else if (userOptions.horizontalAlign === "right") {
    element.style.right = "0px";
    element.style.borderBottomLeftRadius = "5px";
  }
  element.innerText = userOptions.text;
  document.body.appendChild(element);

  return element;
}

function getBaseElement() {
  const element = document.createElement("div");
  element.style.zIndex = "10000";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  element.style.fontFamily = "\"PingFang SC\",\"Helvetica Neue\",\"Helvetica\",\"Hiragino Sans GB\",\"Microsoft YaHei\",\"Noto Sans CJK SC\",\"WenQuanYi Micro Hei\",\"Arial\",sans-serif";

  return element;
}

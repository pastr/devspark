export class DatasetService {

  static prefix = "devspark";

  static addDataset<T extends HTMLElement>(element: T, name: string, value = ""): void {
    const nameWithPrefix = `${DatasetService.prefix}-${name}`;
    element.dataset[nameWithPrefix] = value;
  }

  static getElFromDataset<T extends HTMLElement>(dataset: string): T | null {
    return document.querySelector<T>(`[data-${DatasetService.prefix}-${dataset}]`);
  }

  static elExist() {

  }


}

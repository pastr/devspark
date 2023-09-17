export function conditionallyRunScript(bool: boolean, callback: () => void) {
  if (bool) {
    callback();
  }
}

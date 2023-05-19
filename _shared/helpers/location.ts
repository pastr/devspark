
export function isCorrectPage(targetPath: string): boolean {
  return window.location.pathname.includes(targetPath);
}

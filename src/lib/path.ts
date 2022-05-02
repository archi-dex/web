export const joinPath = (...elements: string[]): string =>
  elements.join("/").replace(/(\/){1,}$/, "/");

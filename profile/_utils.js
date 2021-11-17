export function insertIf(condition, ...elements) {
  return condition ? elements : [];
}

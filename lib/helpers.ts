export function capitalize(
  str = '',
  { autoLowerCase = true, eachWord = true } = {}
): string {
  if (autoLowerCase) str = str.toLowerCase()
  return str.replace(eachWord ? /(^|\s)\S/g : /^\S/g, v => v.toUpperCase())
}

export default function capitalize(str: string): string {
  return str.toLowerCase().replace(/(^|\s)\S/g, v => v.toUpperCase())
}

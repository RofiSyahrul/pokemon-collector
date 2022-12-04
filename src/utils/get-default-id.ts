let count = 0

export default function getDefaultID(offset = 0): number {
  count += 1
  return count + offset
}

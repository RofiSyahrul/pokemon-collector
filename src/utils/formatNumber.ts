export default function formatNumber(value: number): string {
  if (Number.isNaN(value)) return '0'
  return value.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })
}

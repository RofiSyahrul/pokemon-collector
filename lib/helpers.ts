export function capitalize(
  str = '',
  { autoLowerCase = true, eachWord = true } = {}
): string {
  if (autoLowerCase) str = str.toLowerCase()
  return str.replace(eachWord ? /(^|\s)\S/g : /^\S/g, v => v.toUpperCase())
}

export function cast(value: string): ReturnType<JSON['parse']> {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export function formatNumber(
  value: number | string = '',
  fallback = ''
): string {
  if (typeof value === 'string') value = parseFloat(value)
  if (Number.isNaN(value)) return fallback
  return value.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })
}

export function checkImageAvailability(src: string): Promise<boolean> {
  return new Promise(res => {
    const image = new Image()
    image.onload = () => res(true)
    image.onerror = () => res(false)
    image.src = src
  })
}

export const submitOnEnter = (onSubmit: () => void | Promise<void>) => async (
  e: React.KeyboardEvent<HTMLInputElement>
): Promise<void> => {
  if (e.key === 'Enter') {
    await onSubmit()
  }
}

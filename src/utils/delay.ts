let timeout: number

export function delay(duration = 1): Promise<void> {
  return new Promise(resolve => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(resolve, duration)
  })
}

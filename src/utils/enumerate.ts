export default function enumerate(...args: string[]): string {
  const { length } = args
  return args.reduce((result, arg, index) => {
    if (index === 0) return arg

    if (index === length - 1) {
      return `${result} and ${arg}`
    }

    return `${result}, ${arg}`
  }, '')
}

export function toNumber (val) {
  const type = typeof val
  if (type === 'string') {
    return isNaN(Number(val)) ? 0 : Number(val)
  } else {
    return val
  }
}
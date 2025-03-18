export const requiredRule = (value: string) => {
  if (value) return true
  return 'Value required'
}

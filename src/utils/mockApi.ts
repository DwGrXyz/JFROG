export const mockApi = () => {
  const timeout = Math.random() * 1e3
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

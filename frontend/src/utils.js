export function extractErrorMessage(error) {
  return error.response?.data?.message || error.message || error.toString()
}

export function createConfig(token) {
  return {
    headers: {
      authorization: `Bearer ${ token }`,
    },
  }
}

export const fetchData = (providedData) => {
  return new Promise(async (resolve) => {
    const response = await axios.get('')
    return response.data;
  }
  )
}

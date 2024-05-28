import axios from "axios";

const fetchAllProducts = (providedData) => {
  return new Promise(async (resolve) => {
    const response = await axios.get('http://localhost:3000/products')
    resolve({ data: response.data });
  }
  )
}

const fetchFilteredProducts = (filter) => {

  let query = []

  // {color:'red',rating:'4.3'}
  for (const field in filter) {
    if (Object.hasOwnProperty.call(filter, field)) {
      const value = filter[field];
      query.push(`${field}=${value}`)
    }
  }
  query = query.join('&')
  return new Promise(async (resolve) => {
    const response = await axios.get(`http://localhost:3000/products?${query}`)

    resolve({ data: response.data })
  }
  );
}

export {
  fetchFilteredProducts,
  fetchAllProducts
}


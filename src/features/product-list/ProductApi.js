import axios from "axios";

const fetchProducts = async (filter) => {
  console.log(filter);
  const response = await axios.get(`http://localhost:4000/api/v1/products/get-products${''}`)
  return response;
}

const fetchCategories = async () => {
  const response = await axios.get('http://localhost:4000/api/v1/products/category/get-categories')

  return response
}

const fetchProductDetails = async (id) => {

  const response = await axios.get(`http://localhost:4000/api/v1/products/get-product/${id}`)
  return response

}

const addNewProduct = async (productData) => {
  const response = await axios.post('http://localhost:4000/api/v1/products/addnew', productData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  console.log(response);
  return response
}


export {
  fetchProducts,
  fetchCategories,
  fetchProductDetails,
  addNewProduct
}


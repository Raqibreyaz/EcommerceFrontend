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

const deleteProduct = async (id) => {
  return await axios.delete(`http://localhost:4000/api/v1/products/delete-product/${id}`)
}

const addNewCategory = async (category) => {
  return await axios.post('http://localhost:4000/api/v1/products/category/add-category', {
    name: category
  }, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  })
}


export {
  fetchProducts,
  fetchCategories,
  fetchProductDetails,
  addNewProduct,
  deleteProduct,
  addNewCategory
}


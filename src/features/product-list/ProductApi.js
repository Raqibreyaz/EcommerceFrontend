import axios from "axios";
import { makeRequest } from '../../utils/Generics.js'

const fetchProducts = async (filter) => {
  return await makeRequest(
    {
      method: 'get',
      url: `/products/get-products?${filter}`,
      withCredentials: false
    }
  )
}


const fetchCategories = async () => {
  return await makeRequest({
    method: "get",
    url: '/products/category/get-categories',
    withCredentials: false
  })
}

const fetchProductDetails = async (id) => {
  return await makeRequest({
    method: 'get',
    url: `/products/get-product/${id}`,
    withCredentials: false
  })
}

const addNewProduct = async (productData) => {
  return await makeRequest({
    method: 'post',
    data: productData,
    url: '/products/addnew',
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const editProduct = async (data) => {
  return await makeRequest({
    method: 'put',
    url: '/products/edit-product',
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" }
  })
}


const deleteProduct = async (id) => {
  return await makeRequest(
    {
      method: 'delete',
      url: `/products/delete-product/${id}`,
      withCredentials: true,
    }
  )
}

const addNewCategory = async (category) => {
  return await makeRequest(
    {
      method: 'post',
      url: '/products/category/add-category',
      data: { name: category },
      withCredentials: true,
      headers: { "Content-Type": "application/json" }
    }
  )
}


export {
  fetchProducts,
  fetchCategories,
  fetchProductDetails,
  addNewProduct,
  deleteProduct,
  addNewCategory,
  editProduct,
}


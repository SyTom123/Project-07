import { del, get, patch, post } from "../utils/request";
export const getProducts = async (
  q = "",
  sort = "",
  order = "",
  page = "",
  limit = "",
  category = "",
  id = ""
) => {
  let params = {
    q: "",
    sort: "",
    order: "",
    page: "",
    limit: "",
    category: "",
    id: "",
  };
  if (q !== "") {
    params.q = `title_like=${q}`;
  }
  if (sort !== "") {
    params.sort = sort;
  }
  if (order !== "") {
    params.order = order;
  }
  if (page !== "") {
    params.page = page;
  }
  if (limit !== "") {
    params.limit = limit;
  }
  if (category !== "") {
    params.category = `&category=${category}`;
  }
  if (id !== "") {
    params.id = `&id=${id}`;
  }
  let api = `?${params.q}&_sort=${params.sort}&_order=${params.order}&_page=${params.page}&_limit=${params.limit}${params.category}${params.id}`;
  const result = get(`products${api}`);
  return result;
};

export const createProduct = async (options)=> {
  const result = await post ("products", options)
  return result
}

export const deleteProduct = async (id)=> {
  const result = await del (`products/${id}`)
  return result
}
export const editProduct = async (id,options)=> {
  const result = await patch (`products/${id}`, options)
  return result
}

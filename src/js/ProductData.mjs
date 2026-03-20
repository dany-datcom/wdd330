const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
}

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${baseURL}${endpoint}`);
    const data = await convertToJson(response);
    return data.Result;
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    return null;
  }
}

export default class ProductData {
  async getData(category) {
    return await fetchData(`products/search/${category}`);
  }

  async findProductById(id) {
    return await fetchData(`product/${id}`);
  }
}
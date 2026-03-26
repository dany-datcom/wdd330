const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw {
      name: 'servicesError',
      message: jsonResponse
    };
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

export default class ExternalServices {
  async getData(category) {
    return await fetchData(`products/search/${category}`);
  }

  async findProductById(id) {
    return await fetchData(`product/${id}`);
  }

  async checkout(payload) {
    const url = 'https://wdd330-backend.onrender.com/checkout';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    const response = await fetch(url, options);
    return await convertToJson(response);
  }
}
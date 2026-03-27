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

    // Maneja ambos casos: con Result o sin Result
    return data?.Result || data;
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

    try {
      const response = await fetch(url, options);
      return await convertToJson(response);
    } catch (error) {
      console.error('Checkout error:', error);
      throw error; // importante: lo mandamos hacia arriba
    }
  }
}
/**
 * Cliente HTTP optimizado para manejar timeouts y errores de conexión
 */

const API_TIMEOUT = 8000; // 8 segundos para Vercel gratuito
const MAX_RETRIES = 2;

class ApiClient {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL;
  }

  async request(url, options = {}, retryCount = 0) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      clearTimeout(timeoutId);

      // Si es un error de timeout o conexión, reintentar
      if ((error.name === 'AbortError' || error.message.includes('fetch')) && retryCount < MAX_RETRIES) {
        console.warn(`Reintentando petición (${retryCount + 1}/${MAX_RETRIES}):`, url);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Backoff exponencial
        return this.request(url, options, retryCount + 1);
      }

      // Error final
      throw new Error(error.message || 'Error de conexión con el servidor');
    }
  }

  async get(url, options = {}) {
    return this.request(url, {
      method: 'GET',
      cache: 'no-store',
      ...options,
    });
  }

  async post(url, data, options = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async put(url, data, options = {}) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete(url, options = {}) {
    return this.request(url, {
      method: 'DELETE',
      ...options,
    });
  }
}

export const apiClient = new ApiClient();

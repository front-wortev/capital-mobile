export const useFetch = async (path, headers, method, body, type) => {
  try {
      const options = {
          method: method,
          headers: headers,
          body: method !== 'GET' ? (type === 'formData' ? body : JSON.stringify(body)) : undefined
      };

      const response = await fetch(path, options);

      if (response.ok) {
          const result = await response.json();
          return result;
      } else {
          const errorData = await response.json();
          return errorData;
      }
  } catch (error) {
      console.log("Fetch error:", error);
      return { error: true, message: error.message || "Network or server error" };
  }
}

export const fetchCities = async () => {
  try {
    const response = await fetch(`/api/cities`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

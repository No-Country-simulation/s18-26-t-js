export const fetchRestaurantsByName = async (param: string) => {
  try {
    const response = await fetch(`/api/restaurant/search?name=${param}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

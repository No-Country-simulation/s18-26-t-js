export const fetchCategories = async () => {
  try {
    const response = await fetch(`/api/categories`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

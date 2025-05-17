const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      // UPDATE !!!
      // Default to 'a' if no search term is provided since API has changed
      searchTerm = searchTerm || 'a';
 
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};
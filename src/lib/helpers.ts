// Function to convert enum keys to a friendly format
export const formatLabel = (key: string) => {
  return key[0].toUpperCase() + key.slice(1).toLowerCase();
};

// Arrow function to remove accents (normalize Unicode characters)
const removeAccents = (str) =>
   str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

// Main normalization arrow function
const canonizeText = (input) =>
   removeAccents(input) // Remove accents
      .trim() // Remove leading/trailing spaces
      .toLowerCase() // Convert to lowercase
      .replace(/[^\w\s]/g, '') // Remove punctuation and special characters
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space

export default canonizeText

/**
 * Helper function to get the correct image path for production builds
 * This ensures images work correctly on GitHub Pages with the publicPath prefix
 */
export function getImagePath(imagePath) {
  if (!imagePath) return '';
  
  // If the path already starts with http:// or https://, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Get the base URL from environment (includes publicPath in production)
  const baseUrl = process.env.BASE_URL || '/';
  
  // If image path already starts with the base URL, return as is
  if (imagePath.startsWith(baseUrl)) {
    return imagePath;
  }
  
  // Remove leading slash from imagePath if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Combine baseUrl and imagePath
  return `${baseUrl}${cleanPath}`;
}


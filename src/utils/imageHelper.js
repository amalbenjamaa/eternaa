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
  
  // Detect if we're on GitHub Pages by checking the hostname
  const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
  
  if (isGitHubPages) {
    // Extract repository name from pathname
    // pathname will be like "/eternaa/" or "/eternaa/products"
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const repoName = pathParts[0] || 'eternaa';
    const baseUrl = `/${repoName}/`;
    
    // If image path already starts with the base URL, return as is
    if (imagePath.startsWith(baseUrl)) {
      return imagePath;
    }
    
    // Remove leading slash from imagePath if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    // Combine baseUrl and imagePath
    return `${baseUrl}${cleanPath}`;
  }
  
  // For local development, return path as is
  return imagePath;
}


/**
 * Centralized authentication utility for Bua Lagbe
 */

export const AUTH_KEYS = ["mock_logged_in", "userId", "userName", "userRole"];

/**
 * Clears all authentication-related data from local storage
 * and redirects to the homepage.
 * @param {Object} router - Next.js router instance
 */
export const logout = (router) => {
  if (typeof window !== "undefined") {
    AUTH_KEYS.forEach(key => localStorage.removeItem(key));
    
    // Optional: Clear everything if we want to be absolutely sure
    // localStorage.clear(); 
    
    // Clear session storage as well if used
    sessionStorage.clear();
    
    if (router) {
      router.push("/");
    } else {
      window.location.href = "/";
    }
  }
};

/**
 * Checks if the user is currently logged in based on localStorage
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("mock_logged_in") === "true" && !!localStorage.getItem("userId");
};

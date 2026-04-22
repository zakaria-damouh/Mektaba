export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
  },

  USER: {
    ME: "/users/me",
    UPDATE: "/users/me",
  },

  PRODUCT: {
    LIST: "/products",
    DETAIL: (id: string | number) => `/products/${id}`,
  },
} as const;
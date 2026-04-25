

export const ROUTES = {
    AUTH:{
        LOGIN:"/auth/login"
    },
    USER:{
        DASHBOARD:"/user/dashboard",
        PRODUCTS:"/user/products",
        PRODUCTS_DETAILS : ( id : number) => `/user/products/${id}`,
        CATEGORIES:"/user/categories"
    }
}
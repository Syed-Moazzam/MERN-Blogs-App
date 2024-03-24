const getBaseUrl = () => {
    if (import.meta.env.PROD) {
        return import.meta.env.VITE_API_PRODUCTION_URL;
    } else {
        return import.meta.env.VITE_API_LOCAL_URL;
    }
};

export default getBaseUrl;
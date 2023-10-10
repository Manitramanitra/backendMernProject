export const handleTokenReceivedAndSave = (newToken) => {
    localStorage.setItem('authToken', newToken);
};
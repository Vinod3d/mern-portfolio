export const baseUrl = import.meta.env.VITE_API_URL  === 'production'
? 'https://myportfoliosite-02yh.onrender.com'
: 'http://localhost:3000';


console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
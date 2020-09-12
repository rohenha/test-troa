const axios = require('axios');

export async function getApiContent(id: string) {
    try {
        const response = await axios.get('http://localhost:8888/test-troa/public/endpoint.php', {
            params: {
                id: id
            }
        });
        return new Promise(resolve => {
            resolve(JSON.parse(response.data));
        })
    } catch (error) {
        return {};
    }
};
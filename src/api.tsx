import { config } from './utils/config';

// Some HTTP helper methods
async function http(url: string, method: string, headers?: object, body?: object) {
    
    const { token } = JSON.parse(localStorage.getItem('user'));

    const response = await fetch(`${config.apiUrl}/${url}`, {
        method,
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    return await response.json();
}
async function GET(url: string, headers?: object) {
    return await http(url, 'GET', headers);
}
async function POST(url: string, headers?: object, body?: object) {
    return await http(url, 'POST', headers, body);
}
async function PUT(url: string, headers?: object, body?: object) {
    return await http(url, 'PUT', headers, body);
}
async function PATCH(url: string, headers?: object, body?: object) {
    return await http(url, 'PATCH', headers, body);
}
async function DELETE(url: string, headers?: object, body?: object) {
    return await http(url, 'DELETE', headers, body);
}

const api = {
    users: {
        list: async function() {
            return await GET('users');
        },
        get: async function(userId) {
            return await GET(`users/${userId}`);
        }
    },
    reports: {
        get: async function() {
            return await GET('reports');
        }
    },
    beeps: {
        get: async function() {
            return await GET('beeps');
        }
    },
    rides: {
        list: async function() {
            return await GET('rider/list');
        }
    }
};

export default api;

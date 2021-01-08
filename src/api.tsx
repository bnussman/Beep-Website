import { config } from './utils/config';

const DEFAULT_LIMIT = 25;

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
        list: async function(offset = 0, show = DEFAULT_LIMIT) {
            return await GET(`users?show=${show}&offset=${offset}`);
        },
        get: async function(userId) {
            return await GET(`users/${userId}`);
        },
        getRideHistory: async function(userId) {
            return await GET(`users/${userId}/history/rider`);
        },
        getBeepHistory: async function(userId) {
            return await GET(`users/${userId}/history/beeper`);
        },
        getQueue: async function(userId) {
            return await GET(`users/${userId}/queue`);
        },
        getLocation: async function(userId, offset = 0, show = DEFAULT_LIMIT) {
            return await GET(`users/${userId}/location?show=${show}&offset=${offset}`);
        },
        delete: async function(userId) {
            return await DELETE(`users/${userId}`);
        },
    },
    reports: {
        list: async function(offset = 0, show = DEFAULT_LIMIT) {
            const res = await GET(`reports?show=${show}&offset=${offset}`);
            console.log(res)
            // TODO: Reduce data on server side
            res.reports = res.reports.map(r => {
                return {
                    ...r.report,
                    reported: r.reported,
                    reporter: r.reporter
                };
            });
            return res;
        },
        get: async function(reportId) {
            return await GET(`reports/${reportId}`);
        },
        delete: async function(reportId) {
            return await DELETE(`reports/${reportId}`);
        },
    },
    beeps: {
        list: async function() {
            return await GET('beeps');
        },
        get: async function(beepId) {
            return await GET(`beeps/${beepId}`);
        }
    },
    beepers: {
        list: async function() {
            return await GET('rider/list');
        }
    }
};

export default api;

import { useAuthStore } from '@/store'

function authHeader(url) {
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    // return response.json()
    return response.json().then(json => {
        const data = json;
        if (!response.ok) {
            const { user, logout } = useAuthStore();
            if ([401, 403].includes(response.status) && user) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
            }

            const error = data || response.statusText;
            // console.log(error)
            if(error.errors) {
                let arr = [];

                error.errors.map(item => {
                    arr.push({
                        [item.path[1]]: item.message
                    })
                })

                console.log(arr)
                const dataError = {
                    message: response.statusText,
                    errors : arr
                }
                return Promise.reject(dataError);
            }else{
                return Promise.reject(data)
            }
        }

        return data;
    })
}

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };

        if(body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body)
        }
        return fetch(url, requestOptions).then(handleResponse)
    }
}

export const fetcWrapper = {
    get: request('GET'),
    post: request('POST'),
    patch: request('PATCH'),
    delete: request('DELETE')
}
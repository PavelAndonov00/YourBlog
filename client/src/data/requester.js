function request(method) {
    return async (url, data, options) => {
        let token = localStorage.getItem('token');
        let authHeader = token
            ? { "Authorization": `Bearer ${token}` }
            : {};
        var result = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...authHeader
            },
            body: data ? JSON.stringify(data) : undefined,
            ...options
        });

        return result.json();
    }
}

const get = request('get');
const post = request('post');
const put = request('put');
const remove = request('delete');

export { get, post, put, remove };
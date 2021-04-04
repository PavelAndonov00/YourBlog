function request(method) {
    return async (url, data, options) => {
        var result = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: data ? JSON.stringify(data) : undefined,
            ...options
        });
    
        return result.json();
    }
}

export const get = request('get');
export const post = request('post');
export const put = request('put');
export const remove = request('delete');
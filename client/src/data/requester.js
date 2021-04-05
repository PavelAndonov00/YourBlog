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

const get = request('get');
const post = request('post');
const put = request('put');
const remove = request('delete');

export {get, post, put, remove}
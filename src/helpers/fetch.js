let apiUrl = 'https://' + window.location.host;

if (window.location.host.indexOf('localhost') > -1) {
    apiUrl = 'https://localhost:1313';
}

const fetchObj = {
    get,
    post,
    delete: deleteFetch,
};

export default fetchObj;

async function get(url) {
    const response = await fetch(
        apiUrl + url,
        { ...getOptions() },
    );

    if (handleErrors(response)) {
        return;
    }

    return await parseBody(response);
}

async function post(url, data) {
    const response = await fetch(
        apiUrl + url,
        {
            ...getOptions(),
            method: 'POST',
            body: JSON.stringify(data || {}),
        },
    );

    if (handleErrors(response)) {
        return;
    }

    return await parseBody(response);
}

async function deleteFetch(url, data) {
    const response = await fetch(
        apiUrl + url,
        {
            ...getOptions(),
            method: 'DELETE',
            body: JSON.stringify(data || {}),
        },
    );

    if (handleErrors(response)) {
        return;
    }

    return await parseBody(response);
}

function handleErrors(response) {
    let error = false;

    for (const entry of response.headers.entries()) {
        if (entry[0] === 'location') {
            window.location.href = entry[1];
            error = true;
            break;
        }
    }

    console.log('response', response, response.status);

    if (response.status !== 200) {
        console.error('Looks like there was a problem. Status Code: ' + response.status);
    } else {
        return error;
    }
}

function getOptions(): object {
    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    };
}

async function parseBody(response) {
    const data = await response.json().catch((e) => {
        console.error('e', e);
    });

    return data;
}

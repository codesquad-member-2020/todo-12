export function fetchData(
    url,
    method,
    body,
) {
    return fetch(url, {
        method: method,
        mode: "cors",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem('token'),
        })
        .then((res) => {
            if (res.ok) {
                return res.json().then((data) => data);
            } else {
                console.error(res.statusText);
            }
        })
        .catch((err) => console.error(err));
}

export function fetchGetData(
    url,
) {
    return fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem('token'),
        })
        .then((res) => {
            if (res.ok) {
                return res.json().then((data) => data);
            } else {
                console.error(res.statusText);
            }
        })
        .catch((err) => console.error(err));
}

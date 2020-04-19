
export function _$(selector, target = document) {
  return target.querySelector(selector);
}

export function _a$(selector, target = document) {
  return target.querySelectorAll(selector);
}

export function _c(target) {
  return {
    add(className) {
      target.classList.add(className);
    },
    remove(className) {
      target.classList.remove(className);
    },
  };
}

export function _c$(element) {
  const target = _$(element);
  return {
    add(className) {
      target.classList.add(className);
    },
    remove(className) {
      target.classList.remove(className);
    },
  };
}

export function getChildIndex(child, parent) {
  const children = [...parent.children];
  return children.indexOf(child);
}

export function __$(element) {
  const target = _$(element);
  return {
    on(event, func) {
      target.addEventListener(event, func);
    },
    show(className = "on-block") {
      target.classList.add(className);
    },
    hide(className = "on-block") {
      target.classList.remove(className);
    },
    toggle(className = "on-block") {
      target.classList.toggle(className);
    },
    transition(target, property) {
      target.style.transition = property;
    },
  };
}

export function __(target) {
  return {
    on(event, func) {
      target.addEventListener(event, func);
    },
    show(className = "on-block") {
      target.classList.add(className);
    },
    toggle(className = "on-block") {
      target.classList.toggle(className);
    },
    hide(className = "on-block") {
      target.classList.remove(className);
    },
    transition(property) {
      target.style.transition = property;
    },
  };
}

export function filterNumber(str) {
  return parseInt(str.trim().replace(/[^0-9]/g, ""));
}

export function fetchData(
  url,
  method,
  body,
  requestOption = {
    method: method,
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem('token')
    }
  }
) {
  return fetch(url, requestOption)
    .then((res) => {
      if (res.ok) {
        return res.json().then((data) => data);
      } else {
        console.error(res.statusText);
      }
    })
    .catch((err) => console.error(err));
}

export function fetchResponse(
  url,
  method,
  body,
  requestOption = {
    method: method,
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem('token')
    }
  }
) {
  return fetch(url, requestOption)
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        console.error(res.statusText);
      }
    })
    .catch((err) => console.error(err));
}

export function fetchToken(
  url,
  method,
  body,
  requestOption = {
    method: method,
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    }
  }
) {
  return fetch(url, requestOption)
    .then((res) => {
      if (res.ok) {
        return res.json().then((data) => data);
      } else {
        console.error(res.statusText);
      }
    })
    .catch((err) => console.error(err));
}

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
  return str.trim().replace(/[^0-9]/g, "");
}

export function fetchData(
  url,
  method,
  body,
  requestOption = {
    method: method,
    mode: "cors",
    //바디에 원하는 값 설정법, string으로 보내야하는지 ,
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
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

export function fetchGetData(url) {
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json().then((data) => data);
      } else {
        console.error(res.statusText);
      }
    })
    .catch((err) => console.error(err));
}

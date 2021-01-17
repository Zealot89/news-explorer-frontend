const BASE_URL = "http://www.api.zealot.students.nomoreparties.co";
//метод авторизации
export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },

    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else return Promise.reject(res.statusText);
    })
    .then((data) => {
      if (data.token) {
        console.log(data);
        localStorage.setItem("token", data.token);
        return data;
      }
    });
};
//метод регистрации
export const registration = (email, name, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },

    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else return Promise.reject(res.statusText);
  });
}; //
//метод получения пользователя
export const getUser = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      else return Promise.reject(res.statusText);
    })
    .then((data) => data);
};

export const getArticles = (token) => {
  return fetch(`${BASE_URL}/articles`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) return res.json();
    else return Promise.reject(res.statusText);
  });
};

export const deleteArticle = (article_id, token) => {
  return fetch(`${BASE_URL}/articles/${article_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      else return Promise.reject(res.statusText);
    })
    .then((data) => data);
};

export const createArticle = (article, token) => {
  const { keyword, title, text, date, source, link, image } = article;

  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      keyword,
      title,
      text,
      date,
      source: source.name,
      link,
      image,
    }),
  }).then((res) => {
    if (res.ok) return res.json();
    else return Promise.reject(res.statusText);
  });
};
export default {
  createArticle,
  deleteArticle,
  getArticles,
  getUser,
  registration,
  authorization,
};

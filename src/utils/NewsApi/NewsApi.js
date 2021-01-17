class NewsApi {
  constructor(daysAgo, baseUrl, apiKey) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
    this._date = new Date();
    this._today = this._getDate(this._date);
    this._dateDaysAgo = this._setDate(daysAgo);
    this._daysAgo = this._getDate(this._dateDaysAgo);
  }

  _setDate(daysAgo) {
    this._date.setDate(this._date.getDate() - daysAgo);
    return this._date;
  }

  _getDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  _fetch(theme, options) {
    return fetch(
      `${this._baseUrl}q=${theme}&from=${this._daysAgo}&to=${this._today}&language=ru&pageSize-100&apiKey=${this._apiKey}`,
      options
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(res.statusText);
    });
  }

  get(theme) {
    return this._fetch(theme, { method: "GET" });
  }
}

const newsApi = new NewsApi(
  7,
  "https://nomoreparties.co/news/v2/everything?",
  "1f3abd645aad460b87e41f189cae816e"
);
export default newsApi;

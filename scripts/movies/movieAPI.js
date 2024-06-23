const URL_MOVIES = "http://localhost:3000/movies";

class MovieApi {
  getAllMovies() {
    return fetch(`${URL_MOVIES}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((e) => console.error(e));
  }

  getById(id) {
    return fetch(`${URL_MOVIES}/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((e) => console.error(e));
  }

  addMovie(movie) {
    return fetch(`${URL_MOVIES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => data)
      .catch((e) => console.error(e));
  }

  updateMoviePut(id, movie) {
    return fetch(`${URL_MOVIES}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((e) => console.error(e));
  }

  updateMoviePatch(id, movie) {
    return fetch(`${URL_MOVIES}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => data)
      .catch((e) => console.error(e));
  }

  deleteMovie(id) {
    return fetch(`${URL_MOVIES}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => data)
      .catch((e) => console.error(e));
  }
}

class MovieApi2 {
  async getAllMovies() {
    try {
      const res = await fetch(`${URL_MOVIES}`);

      if (!res.ok) {
        return console.log("some error");
      }

      if (res.status === "401") {
        return console.error("не авторизований");
      }

      const parsedData = await res.json();
      return parsedData;
    } catch (e) {
      console.error(e);
    }
  }

  async getById2(id) {
    try {
      const res = await fetch(`${URL_MOVIES}/${id}`);
      const parsedData = await res.json();
      return parsedData;
    } catch (e) {
      console.error(e);
    }
  }

  async addMovie(movie) {
    try {
      const answer = await fetch(`${URL_MOVIES}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      const parsedData = await answer.json();
      return parsedData;
    } catch (e) {
      console.error(e);
    }
  }

  async updateMoviePut(id, movie) {
    try {
      const result = await fetch(`${URL_MOVIES}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });
      const data = await result.json();

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async updateMoviePatch(id, movie) {
    try {
      const data = await fetch(`${URL_MOVIES}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      const movieData = await data.json();
      return movieData;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteMovie(id) {
    try {
      const res = await fetch(`${URL_MOVIES}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      return await res.json();
    } catch (e) {
      console.error(e);
    }
  }
}

const movieApi = new MovieApi();

export default movieApi;

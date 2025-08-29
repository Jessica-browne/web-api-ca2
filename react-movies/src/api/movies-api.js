export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};
 
export const addToFavourites = async (username, movieId) => {
    const response = await fetch("http://localhost:8080/api/users/favourites", {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: 'put',
        body: JSON.stringify({username, favourites:movieId })
    });
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
}

export const addToWatchlist = async (username, movieId) => {
    const response = await fetch("http://localhost:8080/api/users/watchlist", {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: 'put',
        body: JSON.stringify({username, watchlist:movieId })
    });
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
}

export const getUserFavourites = async (username) => {
  return fetch(
    `http://localhost:8080/api/users/${username}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};
  
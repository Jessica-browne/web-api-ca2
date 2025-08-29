import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [watchlist, setWatchlist] = useState( [] ) 


  const addToFavorites = (movieId) => {
    let newFavorites = [];
    if (!favorites.includes(movieId.id)){
      newFavorites = [...favorites, movieId.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  
  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);s


  const addToWatchlist = (movie) => {
    if (!watchlist.includes(movie.id)) {
      setWatchlist((Watchlist) => [...Watchlist, movie.id]);
    }
  };

  const removeFromWatchlist = (movie) => {
    setWatchlist((Watchlist) =>
      Watchlist.filter((mId) => mId !== movie.id)
    );
  };

 return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  )
}
export default MoviesContextProvider;
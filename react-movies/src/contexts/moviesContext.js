import React, { useState, useContext } from "react";
import { getUserFavourites } from "../api/movies-api";
import { AuthContext } from "./authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] );
  const [myReviews, setMyReviews] = useState( {} ); 
  const [watchlist, setWatchlist] = useState( [] ); 
  const { username } = useContext(AuthContext);

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


    const getGetFavourites = async () => {
      try {
        const favorites  = await getUserFavourites(username);
        setFavorites(favorites);
      } catch (error) {
        console.error("errpr getting favourites");
      }
      setFavorites([]);
    }
  

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
        getGetFavourites,
        
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  )
}
export default MoviesContextProvider;
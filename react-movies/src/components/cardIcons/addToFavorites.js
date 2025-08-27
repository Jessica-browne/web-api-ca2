import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToFavourites as apiAddToFavourites } from "../../api/movies-api";
import { AuthContext } from "../../contexts/authContext"

const AddToFavoritesIcon = ({ movie }) => {
  const {userName, isAuthenticated} = useContext(AuthContext);
  const {addToFavourites} = useContext(MoviesContext);

  const handleAddToFavorites = async (e) => {
    e.preventDefault();

    if(!isAuthenticated || !userName) {
      console.error("user not logged in");
      return;
    }
    try{
    await apiAddToFavourites(userName, movie.id);
    addToFavourites(movie.id);
    console.log("added");
    } catch (error) {
      console.error("not added")
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;
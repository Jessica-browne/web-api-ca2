import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { AuthContext } from "../../contexts/authContext";
import { addToWatchlist as apiAddToWatchlist } from "../../api/movies-api";

const AddToWatchlistIcon = ({ movie }) => {
    const {userName, isAuthenticated} = useContext(AuthContext);
    const {addtoWatchlist} = useContext(MoviesContext);

    const handleAddToWatchlist = async (e) => {
    e.preventDefault();

    if(!isAuthenticated || !userName) {
      console.error("user not logged in");
      return;
    }
    try{
    await apiAddToWatchlist(userName, movie.id);
    console.log("added");
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <IconButton aria-label="add to Watchlist" onClick={handleAddToWatchlist}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchlistIcon;
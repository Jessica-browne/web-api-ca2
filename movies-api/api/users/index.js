import express from 'express';
import User from './userModel.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler (async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
            } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update a user
/*
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
}); */

router.put("/favourites", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { username, favourites } = req.body;
    const movieId = parseInt(favourites, 10);
    const result = await User.findOneAndUpdate(
      { username },               
      { $push: { favourites: movieId } },
      { new: true }                         
    );

  if (result) {
      res.status(200).json({ success: true, msg: "Favourites updated", user: result });
    } else {
      res.status(404).json({ success: false, msg: "User not found" });
    }
  } catch (error) {
    console.error("FAVOURITES ROUTE ERROR:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
});


router.put("/watchlist", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { username, watchlist } = req.body;
    const movieId = parseInt(watchlist, 10);
    const result = await User.findOneAndUpdate(
      { username },               
      { $push: { watchlist: movieId } },
      { new: true }                         
    );

  if (result) {
      res.status(200).json({ success: true, msg: "watchlist updated", user: result });
    } else {
      res.status(404).json({ success: false, msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
});


//get a persons info by id 
router.get("/:id", async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({success: false,msg: "user not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    } 
});

//get a persons info by username 
router.get("/username/:username", async(req, res, next) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if(!user) {
            return res.status(404).json({success: false,msg: "user not found"});
        }
        res.status(200).json(user);
    } catch (error) {
         next(error);
    } 
});

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}




export default router;

const
    express = require('express'),
    router = express.Router();
    Place = require('../controllers/place');

    //Place Router
    router.get('/', Place.index);
    router.post('/', Place.create);
    router.get('/:place_id', Place.show);
    router.put('/:place_id', Place.update);
    router.delete('/:place_id', Place.delete);

    // Post Router
    router.post('/:place_id/posts', Place.createPost);
    router.get('/:place_id/posts/:id', Place.showPost );
    router.put('/:place_id/posts/:id', Place.updatePost);
    router.delete('/:place_id/posts/:id', Place.deletePost);
    
    module.exports = router;





    // router.get('/', (req, res) => {
//     // Place needs to have a city, a picture, a country, and a referenced user_id.
//     // The form submits the picture, city, and country.
//     let { user } = req;
//     let body = { city: "Los Angeles", picture: "ENTER URL", country: "USA" };
//     // places.posts.push({...body, author: user._id})
//     res.json({ user })
// })


    

const
    express = require('express'),
    router = express.Router();
    const Place = require('../controllers/placesController')

    router.get('/', Place.index);
    router.post('/', Place.create);
    //show place
    router.get('/:id', Place.show);
    //update place.
    router.put('/:id', Place.update);

    module.exports = router;





    // router.get('/', (req, res) => {
//     // Place needs to have a city, a picture, a country, and a referenced user_id.
//     // The form submits the picture, city, and country.
//     let { user } = req;
//     let body = { city: "Los Angeles", picture: "ENTER URL", country: "USA" };
//     // places.posts.push({...body, author: user._id})
//     res.json({ user })
// })


    

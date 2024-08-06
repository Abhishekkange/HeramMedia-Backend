const express = require('express');
const router = express.Router();
const Swipe = require('../models/swipe');
const Match = require('../models/match');

const getId = (JWTToken)=>{

    return id;
}

router.post('/swipe',async(req,res)=>{

    const swiper = getId(req.body.swiper);
    const swiped = req.body.swiped;
    const isRightSwipe = req.body.isRightSwipe;

    if(isRightSwipe)
    {
        //check the swipe data 
        const reciprocalSwipe = Swipe.find({

            swiper:swiped,
            swiped:swiper
        });
        if(reciprocalSwipe)
        {
            //create a match
            const match = new Match({
                user1:swiper,
                user2:swiped
            });

            await match.save()
        }
    }

    const swipe = new Swipe({

        swiper: swiper,
        swiped: swiped,
        isRightSwipe: isRightSwipe
    });
    await swipe.save();

});


module.exports = router;
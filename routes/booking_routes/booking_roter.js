const ModelBooking = require('../models/booking_model.js');


router.get('getBookings',(req,res) =>{
    try {
        const data = ModelBooking.find();

      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({message : error.message})
    }
})
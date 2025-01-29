const ModelBooking = require('../../models/booking_model.js');
const router = require('express').Router()

router.get('getBookings',(req,res) =>{
    try {
        const data = ModelBooking.find();

      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({message : error.message})
    }
});

router.get('/getFreeRooms', async (req, res) => {
  try {
    
    
  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
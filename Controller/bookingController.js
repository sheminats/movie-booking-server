const bookings = require("../Models/bookingModel");

exports.createBooking = async (req, res) => {
  // console.log("inside create booking");
  try {
      const { moviename,bookingDate, seatNumber, showTime } = req.body;
      const users_id=req.payload
      const movies_id=req.params.pid
console.log("booking details",moviename,users_id ,movies_id,bookingDate, seatNumber, showTime );
    // new booking
      const booking = new bookings({
      moviename,
          users_id,
          movies_id,
          bookingDate:new Date(bookingDate),
          seatNumber,
          showTime,
          status: 'booked' 
      });


      await booking.save();

      res.status(200).json({ message: 'Booking created successfully', booking });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
};



exports.getUserBookings=async(req,res)=>{
  console.log("booking api");
  // console.log(`${req.headers}`);
  const userId=req.payload
  console.log(userId);
  try{
const userBookings=await bookings.find({users_id:userId})
console.log(userBookings);
res.status(200).json(userBookings)
  }catch(err){
      res.status(401).json(err)
  }
}



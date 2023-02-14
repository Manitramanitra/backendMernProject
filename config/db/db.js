const mongoose = require("mongoose");

mongoose.connect(
   "mongodb://localhost:27017/Test",
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   },
   (error) => {
      if (error) console.log("erreur :" + error);
      else console.log("mongodb connected");
   }
)
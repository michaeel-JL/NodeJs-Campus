const mongoose = require('mongoose');
const { mongodb } = require('./keys');
// const url = `mongodb+srv://mike:1234@cluster0.u3az1.mongodb.net/test?retryWrites=true&w=majority`;

// const connectDB = async()=> {
//   await mongoose.connect(URI);
//   console.log('db connect..!');

// }

mongoose.set('useFindAndModify', false);

mongoose.connect(mongodb.URI, {
  useNewUrlParser: true, useUnifiedTopology: true 
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));

  // const connectionParams={
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //     useUnifiedTopology: true 
  // }
  // mongoose.connect(url,connectionParams)
  //     .then( () => {
  //         console.log('Connected to database ')
  //     })
  //     .catch( (err) => {
  //         console.error(`Error connecting to the database. \n${err}`);
  //     })

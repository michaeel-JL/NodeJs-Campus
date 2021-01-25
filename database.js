const mongoose = require('mongoose');
const { mongodb } = require('./keys');
const url = `mongodb+srv://mike:1234@cluster0.u3az1.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.set('useFindAndModify', false);

mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true 
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));

  const connectionParams={
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true 
  }
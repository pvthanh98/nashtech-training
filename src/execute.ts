const mongoose = require("mongoose");

const URI = 'mongodb://localhost:27017/nashtech-training';

mongoose.connect(URI,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);

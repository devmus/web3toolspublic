import mongoose from 'mongoose';

const runlogSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: [true, 'Index required'],
      },
      date: {
        type: String,
        required: [true, 'Date required'],
      },
      time: {
        type: String,
        required: [true, 'Time required'],
      },
      token: {
        type: String,
        required: [true, 'Token required'],
      },
      gains: {
        type: String,
        required: [true, 'Tokens gained required'],
      },
      energy: {
        type: String,
        required: [true, 'Energy spent required'],
      },
});

export default mongoose.model('RunLog', runlogSchema);
import mongoose from 'mongoose';

const tierSchema = mongoose.Schema({
  tier1: {
    type: Number,
  },
  tier2: {
    type: Number,
  },
  tier3: {
    type: Number,
  },
  tier4: {
    type: Number,
  },
  tier5: {
    type: Number,
  },
  tier6: {
    type: Number,
  },
  tier7: {
    type: Number,
  },
  tier8: {
    type: Number,
  },
});

const rewardSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: [true, 'Index required'],
  },
  ca: {
    type: String,
    required: [true, 'Token Address required'],
  },
  ticker: {
    type: String,
    required: [true, 'Ticker required'],
  },
  rewardAmount: {
    type: tierSchema,
    required: [true, 'Reward amount required'],
  },
  boosted: {
    type: Boolean,
    required: [true, 'Boosted required'],
  },
  active: {
    type: Boolean,
    required: [true, 'Active required'],
  },
  price: {
    type: Number,
    required: [true, 'Price required'],
  },
  url: {
    type: String,
    required: [true, 'Url required'],
  },
});

export default mongoose.model('SwapReward', rewardSchema);

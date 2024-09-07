import { asyncHandler } from '../middleware/asyncHandler.mjs';
import SwapReward from '../models/RewardSchema.mjs';
import axios from 'axios';

export const createRewardToken = asyncHandler(async (req, res, next) => {

  const { index, ca, ticker, rewardAmount, active, boosted } = req.body;

  const price = await getPrice(ca);
  const url = `https://birdeye.so/token/${ca}?chain=solana`;

  const SwapRewardToken = await SwapReward.create({
    index,
    ca,
    ticker,
    rewardAmount,
    active,
    boosted,
    url,
    price,
  });

  await SwapRewardToken.save();

  res.status(201).json({
    success: true,
    statusCode: 201,
    data: SwapRewardToken,
  });
});

export const deleteRewardToken = asyncHandler(async (req, res, next) => {
  const token = await SwapReward.findByIdAndDelete(req.params.id);

  if (token) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Token deleted successfully',
    });
  } else {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Token not found',
    });
  }
});

export const getRewardTokens = asyncHandler(async (req, res, next) => {
  const tokens = await SwapReward.find();

  res.status(200).json({ success: true, statusCode: 200, data: tokens });
});

export const updateTokenBoost = asyncHandler(async (req, res, next) => {
  const token = await getToken(req.params.id);

  if (token) {
    if (token.boosted === true) {
      token.boosted = false;
    } else {
      token.boosted = true;
    }

    await token.save();
  }

  res.status(204).end();
});

export const updateTokenActive = asyncHandler(async (req, res, next) => {
  const token = await getToken(req.params.id);

  if (token) {
    if (token.active === true) {
      token.active = false;
    } else {
      token.active = true;
    }

    await token.save();
  }

  res.status(204).end();
});

export const updateRewardToken = asyncHandler(async (req, res, next) => {
  const token = await getToken(req.params.id);

  const rewardAmount = req.body.rewardAmount

  if (token) {
    token.index = req.body.index ?? token.index;
    token.ca = req.body.ca ?? token.ca;
    token.ticker = req.body.ticker ?? token.ticker;
    token.rewardAmount.tier1 = rewardAmount.tier1 ?? token.rewardAmount.tier1 ?? 0;
    token.rewardAmount.tier2 = rewardAmount.tier2 ?? token.rewardAmount.tier2 ?? 0;
    token.rewardAmount.tier3 = rewardAmount.tier3 ?? token.rewardAmount.tier3 ?? 0;
    token.rewardAmount.tier4 = rewardAmount.tier4 ?? token.rewardAmount.tier4 ?? 0;
    token.rewardAmount.tier5 = rewardAmount.tier5 ?? token.rewardAmount.tier5 ?? 0;
    token.rewardAmount.tier6 = rewardAmount.tier6 ?? token.rewardAmount.tier6 ?? 0;
    token.rewardAmount.tier7 = rewardAmount.tier7 ?? token.rewardAmount.tier7 ?? 0;
    token.rewardAmount.tier8 = rewardAmount.tier8 ?? token.rewardAmount.tier8 ?? 0;
    
    token.active = req.body.active ?? token.active;

    token.url = `https://birdeye.so/token/${token.ca}?chain=solana`;

    const price = await getPrice(token.ca);
    token.price = price;

    await token.save();
  }

  res.status(204).end();
});

export const updateAllTokenPrice = asyncHandler(async (req, res, next) => {
  const tokens = await SwapReward.find();

  for (const token of tokens) {
    const price = await getPrice(token.ca);
    token.price = price;
    await token.save();
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'All token prices updated successfully',
  });
});

const getToken = async (id) => {
  try {
    const token = await SwapReward.findById(id);
    if (!token) {
      console.log('Could not find the token');
      return null;
    }
    return token;
  } catch (error) {
    console.log('Error fetching token:', error);
    return null;
  }
};

const getPrice = async (ca) => {
  try {
    const response = await axios.get(
      `https://public-api.birdeye.so/defi/price?address=${ca}`,
      {
        headers: { 'X-API-KEY': process.env.API_KEY },
      }
    );

    return response.data.data.value;
  } catch (error) {
    console.log(error);
  }
};
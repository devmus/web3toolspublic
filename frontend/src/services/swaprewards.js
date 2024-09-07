import axios from 'axios';

export const createRewardToken = async (data) => {

  try {
    const response = await axios.post(
      'http://localhost:5001/api/v1/assetdash/reward/create',
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteRewardToken = async (id) => {

  try {
    const response = await axios.delete(
      `http://localhost:5001/api/v1/assetdash/reward/delete/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getRewardTokens = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5001/api/v1/assetdash/reward/list`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateBoostedToken = async (tokenIndex) => {
  try {
    const response = await axios.patch(
      `http://localhost:5001/api/v1/assetdash/reward/boost/${tokenIndex}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateActiveToken = async (tokenIndex) => {
  try {
    const response = await axios.patch(
      `http://localhost:5001/api/v1/assetdash/reward/active/${tokenIndex}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateRewardTokens = async (tokenIndex, data) => {
  try {
    const response = await axios.put(
      `http://localhost:5001/api/v1/assetdash/reward/token/${tokenIndex}`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateAllPrices = async () => {
  try {
    const response = await axios.patch(
      'http://localhost:5001/api/v1/assetdash/reward/refresh/'
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

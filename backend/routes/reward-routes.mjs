import express from 'express';
import {
  createRewardToken,
  deleteRewardToken,
  getRewardTokens,
  updateAllTokenPrice,
  updateRewardToken,
  updateTokenActive,
  updateTokenBoost,
} from '../controllers/reward-controller.mjs';

const router = express.Router();

router.get('/list', getRewardTokens);
router.post('/create', createRewardToken);
router.put('/token/:id', updateRewardToken);
router.patch('/boost/:id', updateTokenBoost);
router.patch('/active/:id', updateTokenActive);
router.patch('/refresh', updateAllTokenPrice);
router.delete('/delete/:id', deleteRewardToken);

export default router;

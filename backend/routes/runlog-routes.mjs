import express from 'express';
import { createRun, getRuns, updateRun, getTokenPrice } from '../controllers/runlog-controller.mjs';


const router = express.Router();

router.get('/list', getRuns);
router.post('/create', createRun);
router.put('/run/:id', updateRun);
router.get('/token/:id', getTokenPrice);

export default router;
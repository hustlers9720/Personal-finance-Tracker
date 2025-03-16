import express from 'express'
import { addTransaction, readTransaction, updateTransaction, deleteTransaction, monthlySummary } from '../controller/transactionsControllers.js';

const router = express.Router();

router.post('/add', addTransaction)
router.get('/get', readTransaction)
router.put('/update/:id', updateTransaction)
router.delete('/delete/:id', deleteTransaction)
router.get('/monthly-summary', monthlySummary)

export default router;
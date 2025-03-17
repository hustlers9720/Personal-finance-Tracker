import express from 'express'
import { addBudget, deleteBudget, getBudget ,actualBudget} from '../controller/budgetCategoryController.js';

const budgetRouter = express.Router();

budgetRouter.post('/add', addBudget)
budgetRouter.get('/getBudget', getBudget)
budgetRouter.delete('/delete/:id', deleteBudget)
budgetRouter.get('/actual', actualBudget)

export default budgetRouter;
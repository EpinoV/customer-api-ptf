import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { 
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer 
} from '../controllers/customer.controller.js';

const router = Router();

router.use(authenticateToken);

router.route('/')
  .get(getCustomers)
  .post(createCustomer);

router.route('/:id')
  .get(getCustomerById)
  .put(updateCustomer)
  .delete(deleteCustomer);

export default router;
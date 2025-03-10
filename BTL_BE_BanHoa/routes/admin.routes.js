import express from 'express';
var router = express.Router();
import adminController from '../controllers/admin.controller';

router.get('/', adminController.getAll);
router.get('/:id', adminController.getById);
router.post('/', adminController.insert);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.delete);

export default router;

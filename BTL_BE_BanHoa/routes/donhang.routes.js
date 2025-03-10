import express from 'express';
var router = express.Router();
import donhangController from '../controllers/donhang.controller';

router.get('/', donhangController.getAll);
router.get('/:id', donhangController.getById);
router.post('/', donhangController.insert);
router.put('/:id', donhangController.update);
router.delete('/:id', donhangController.delete);

export default router;

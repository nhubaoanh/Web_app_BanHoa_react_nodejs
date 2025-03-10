import express from 'express';
var router = express.Router();
import khachhangController from '../controllers/khachhang.controller';

router.get('/', khachhangController.getAll);
router.get('/:id', khachhangController.getById);
router.post('/', khachhangController.insert);
router.put('/:id', khachhangController.update);
router.delete('/:id', khachhangController.delete);

export default router;

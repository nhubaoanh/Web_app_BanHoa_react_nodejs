import express from 'express';
var router = express.Router();
import sanphamController from '../controllers/sanpham.controller';

router.get('/', sanphamController.getAll);
router.get('/:id', sanphamController.getById);
router.post('/', sanphamController.insert);
router.put('/:id', sanphamController.update);
router.delete('/:id', sanphamController.delete);

export default router;

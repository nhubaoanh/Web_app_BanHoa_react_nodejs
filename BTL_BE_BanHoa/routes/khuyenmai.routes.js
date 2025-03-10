import express from 'express';
var router = express.Router();
import khuyenmaiController from '../controllers/khuyenmai.controller';

router.get('/', khuyenmaiController.getAll);
router.get('/:id', khuyenmaiController.getById);
router.post('/', khuyenmaiController.insert);
router.put('/:id', khuyenmaiController.update);
router.delete('/:id', khuyenmaiController.delete);

export default router;

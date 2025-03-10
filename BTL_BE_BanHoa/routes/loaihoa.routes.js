import express from 'express';
var router = express.Router();
import loaihoaController from '../controllers/loaihoa.controller';

router.get('/', loaihoaController.getAll);
router.get('/:id', loaihoaController.getById);
router.post('/', loaihoaController.insert);
router.put('/:id', loaihoaController.update);
router.delete('/:id', loaihoaController.delete);

export default router;

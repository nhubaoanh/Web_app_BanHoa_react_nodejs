import express from 'express';
var router = express.Router();
import nhanvienController from '../controllers/nhanvien.controller';

router.get('/', nhanvienController.getAll);
router.get('/:id', nhanvienController.getById);
router.post('/', nhanvienController.insert);
router.put('/:id', nhanvienController.update);
router.delete('/:id', nhanvienController.delete);

export default router;

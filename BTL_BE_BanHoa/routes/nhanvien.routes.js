import express from 'express';
var router = express.Router();
import nhanvienController from '../controllers/nhanvien.controller';

router.get('/', nhanvienController.getAll);
router.get('/:id', nhanvienController.getById);
router.post('/', nhanvienController.insert);
router.put('/:id', nhanvienController.update);
router.delete('/:id', nhanvienController.delete);
router.post('/create-saff-of-admin', nhanvienController.insertSaffOfAdmin);

export default router;

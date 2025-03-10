import express from 'express';
var router = express.Router();
import chitietdonhangnhapController from '../controllers/chitietdonhangnhap.controller';

router.get('/', chitietdonhangnhapController.getAll);
router.get('/:id', chitietdonhangnhapController.getById);
router.post('/', chitietdonhangnhapController.insert);
router.put('/:id', chitietdonhangnhapController.update);
router.delete('/:id', chitietdonhangnhapController.delete);

export default router;

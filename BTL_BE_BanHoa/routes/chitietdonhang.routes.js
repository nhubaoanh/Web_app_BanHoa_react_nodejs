import express from 'express';
var router = express.Router();
import chitietdonhangController from '../controllers/chitietdonhang.controller';

router.get('/', chitietdonhangController.getAll);
router.get('/:id', chitietdonhangController.getById);
router.post('/', chitietdonhangController.insert);
router.put('/:id', chitietdonhangController.update);
router.delete('/:id', chitietdonhangController.delete);

export default router;

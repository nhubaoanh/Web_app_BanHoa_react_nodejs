import express from 'express';
var router = express.Router();
import donhangnhapController from '../controllers/donhangnhap.controller';

router.get('/', donhangnhapController.getAll);
router.get('/:id', donhangnhapController.getById);
router.post('/', donhangnhapController.insert);
router.put('/:id', donhangnhapController.update);
router.delete('/:id', donhangnhapController.delete);
router.post('/create-with-detailss', donhangnhapController.insertWithDetails);
export default router;

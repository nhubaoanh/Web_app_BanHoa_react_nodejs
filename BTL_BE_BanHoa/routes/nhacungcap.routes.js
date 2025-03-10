import express from 'express';
var router = express.Router();
import nhacungcapController from '../controllers/nhacungcap.controller';

router.get('/', nhacungcapController.getAll);
router.get('/:id', nhacungcapController.getById);
router.post('/', nhacungcapController.insert);
router.put('/:id', nhacungcapController.update);
router.delete('/:id', nhacungcapController.delete);

export default router;

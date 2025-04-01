import express from 'express';
var router = express.Router();
import adminController from '../controllers/admin.controller';

router.get('/', adminController.getAll);
router.get('/:id', adminController.getById);
router.post('/', adminController.insert);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.delete);
router.post('/login', adminController.login);
router.post('/logout', adminController.logout); // Thêm route cho API đăng xuất
router.get('/check-status', adminController.checkStatus);
export default router;

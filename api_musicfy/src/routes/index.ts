// @Vendors
import express from 'express';
const router = express.Router();
import albumRoutes from '@apis/album/album.routes';

// @Modules
router.use('/albums', albumRoutes);

export default router;

import express from 'express';
import { deleteChip, getAllChips, patchChip, postChip } from './chip.controller';
import { verifyToken } from '../../auth/middleware/authentication.middleware';
import joiValidationMiddleware from '../../auth/middleware/joiValidationMiddleware';
import chipSchema from './chip.schema';

const router = express.Router();

router.use(verifyToken);

router.get('/', getAllChips)
    .post('/', joiValidationMiddleware(chipSchema), postChip)
    .patch('/:id', patchChip)
    .delete('/:id', deleteChip);

export default router

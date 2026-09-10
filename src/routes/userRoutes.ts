import { Router } from 'express';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '#controllers';
import { validateBody } from '#middleware';
import { userSchema } from '#schemas';

const router = Router();

router.get('/', getUsers);
router.post('/', validateBody(userSchema), createUser);
router.get('/:id', getUserById);
router.put('/:id', validateBody(userSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;

// const userRoutes = Router();

// userRoutes.route('/').get(getUsers).post(validateBody(userSchema), createUser);
// userRoutes
//   .route('/:id')
//   .get(getUserById)
//   .put(validateBody(userSchema), updateUser)
//   .delete(deleteUser);

// export default userRoutes;

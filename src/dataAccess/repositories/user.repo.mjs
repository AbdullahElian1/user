import { UserModel } from '../models/index.mjs';
import { PasswordHelper, JwtHelper } from '../../helpers/index.mjs';

import { StatusCode, UserAttributes } from '../../constants/index.mjs';

export const UserRepo = {
  login: async claim => {
    const user = await UserModel.findOne({
      where: { email: claim.email.toLowerCase() },
    });

    if (user === null) return undefined;
    const verify = await PasswordHelper.verify(claim.password, user.passwordHash);
    if (!verify) return undefined;

    const { passwordHash, ...rest } = { ...user.dataValues };

    const signUser = {
      id: user.id,
      ...rest,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    const token = await JwtHelper.sign(signUser);

    return {
      userId: user.id,
      token,
    };
  },
  create: async data => {
    const { password, ...rest } = data;
    const filter = { email: data.email };
    const user = await UserModel.findOne({ where: filter });

    if (user !== null) return StatusCode.CONFLICT;

    const hash = await PasswordHelper.hash(password);

    const dataToInsert = {
      passwordHash: hash,
      ...rest,
    };

    return await UserModel.create(dataToInsert);
  },

  update: async (data, userId) => {
    const user = await UserModel.findByPk(userId);

    if (data.email) {
      const emailAlreadyExist = await UserModel.findOne({ where: { email: data.email } });

      if (emailAlreadyExist !== null) return StatusCode.CONFLICT;
    }

    const dataToUpdate = {
      email: data.email,
      ...data,
    };

    if (data.oldPassword && data.newPassword) {
      const verify = await PasswordHelper.verify(data.oldPassword, user.passwordHash);
      if (!verify) return StatusCode.CONFLICT;

      const hashedPassword = await PasswordHelper.hash(data.newPassword);

      dataToUpdate.password = hashedPassword;
    }

    return user.update(dataToUpdate);
  },

  delete: async userId =>
    UserModel.destroy({
      where: {
        id: userId,
      },
    }),

  get: async userId => UserModel.findByPk(userId, { attributes: UserAttributes }),
};

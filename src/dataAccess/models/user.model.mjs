import { DBConnector } from '../connectors/index.mjs';
import { UserSchema } from '../schema/index.mjs';

export const UserModel = DBConnector.define('users', UserSchema, { timestamps: true, underscored: true });

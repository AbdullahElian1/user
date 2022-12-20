import { UserSchema } from '../dataAccess/schema/index.mjs';

export async function up(queryInterface) {
  await queryInterface.createTable('users', { ...UserSchema });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('users');
}

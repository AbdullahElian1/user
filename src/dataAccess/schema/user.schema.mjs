import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;

export const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.TEXT,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.TEXT,
    field: 'password_hash',
  },
  firstName: {
    type: DataTypes.STRING,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name',
  },
  username: {
    type: DataTypes.TEXT,
    field: 'username',
    unique: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
  },
};

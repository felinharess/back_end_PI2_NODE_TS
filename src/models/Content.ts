import { DataTypes } from "sequelize";
import { database } from "../Database/database";
import { User } from "./User";
export const Content = database.define('contents', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,

    },
    url: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: true
})
Content.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Content, { foreignKey: 'user_id' });
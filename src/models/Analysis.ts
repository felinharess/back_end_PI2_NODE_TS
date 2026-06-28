import { DataTypes } from "sequelize";
import { database } from '../Database/database';
import { Content } from "./Content";
export const Analysis = database.define('analyses', {
    content_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Content,
            key: 'id'
        }
    },
    ai_percentage: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fake_percentage: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    classification: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confidence_level: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
}, {
    timestamps: true
})
Analysis.belongsTo(Content, { foreignKey: 'content_id', as: 'Content' })
Content.hasOne(Analysis, { foreignKey: 'content_id', as: 'Analysis' })
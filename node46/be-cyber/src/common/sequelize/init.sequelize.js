import { Sequelize } from "sequelize";
import initModels from "../../models/init-models.js";




// kết nối sequelize 
export const sequelize = new Sequelize('mysql://root:1234@localhost:3307/db_cyber_media')
const models = initModels(sequelize);

sequelize.authenticate().then(() => {
    console.log(`KẾT NỐI VỚI DB THÀNH CÔNG`)
}).catch(() => {
    console.log(`KẾT NỐI VỚI DB KHÔNG THÀNH CÔNG`)
})

export default models
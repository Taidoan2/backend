import express from 'express';
import { Sequelize } from 'sequelize'; // import sequelize
import initModels from './src/models/init-models.js';

const app = express();

app.use(express.json())

app.get(`/`, (request,response, next) => {
    console.log(`first`);

    response.json(`taidoan`)
})

// -----------
app.get(`/query`,(request,response,next) => {
    console.log(request.query)

    const {email, password} = request.query
    console.log(email,password)

    response.json(`Query Parameter`)
})
// ---------------------

app.get(`/path/:id`,(request,response,next) => {
    console.log(request.params)
    response.json(`Path prameter`)
})
// ------------------------

app.get(`/headers`,(request,response,next) => {
    console.log(request.headers);
    response.json(`headers`)
})

// --------------------------
app.post(`/body`,(request,response,next) => {
    console.log(request.body);
    response.json(`body`)
})

// kết nối sequelize trên phần listen
// @localhost để local hoặc 127.0.0.1
// kết nối cổng bên tay trái bên docker khi kết nối nó tự chuyền sang 3306
const sequelize = new Sequelize('mysql://root:1234@localhost:3307/db_cyber_media')

// kiểm tra kết nối với cơ sở dữ liệu
// thêm vào then catch callback function khi thành công thì chạy then thất lại catch
sequelize.authenticate().then(() => {
    console.log(`KẾT NỐI VỚI DB THÀNH CÔNG`)
}).catch(() => {
    console.log(`KẾT NỐI VỚI DB KHÔNG THÀNH CÔNG`)
})

// const cars = await sequelize.query(`select * from cars`);
// console.log({cars});
// console.log(`car-1`,cars[0]);
// console.log(`car-2`,cars[1])
// console.log(`cars`)



// tạo api để trả dữ liệu lên fontend
//api này là logic lấy danh sách cars
app.get(`/cars`,async(req, res, next) => {
    const cars = await sequelize.query(`select * from cars`);
console.log({cars});
console.log(`car-1`,cars[0]);
console.log(`car-2`,cars[1]);
// trả dữ liệu về
res.json(cars[0])
})





// code first: viết code tự động tạo ra database 



// database first : là vào gõ câu lệnh sql tạo ra table
// -tạo table bằng câu lệnh sql
// -cài thư viện : sequelize-auto thư viện này là để vào db đọc tất cả dữ liệu rồi kéo vào trong code của mình
// npx sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -t [tableName]
// // npx sequelize-auto -h localhost -d db_cyber_media -u root -x 1234 -p 3307  --dialect mysql -o src/models -a
const models = initModels(sequelize)
app.get(`/videos`,async(req, res, next) => {
   const videos = await models.videos.findAll({raw:true})

// trả dữ liệu về
res.json(videos)
})

app.listen(3069,() => {
    console.log(`server online at port 3069`)
})
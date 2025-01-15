import express from 'express'

import Cars from '../models/Cars.model.js';





const carRouter = express.Router()

carRouter.get(`/cars`,async(req, res, next) => {
    const carss = await Cars.findAll({raw: true})
console.log({carss});

// trả dữ liệu về
res.json(carss)
 })

 export default carRouter
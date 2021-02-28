import express from 'express'


const router = express.Router()

router.get('/', getProducts)

export default router
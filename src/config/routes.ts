import express from 'express'
import { HomeController } from '../controllers/home'

const router = express.Router()

const homeController = new HomeController()

// list route

router.get('/', homeController.index)

export default router

const express=require('express')
const router=express.Router()
const{getcrypto}=require('../controller/dataController')

// ===============get crypto=================
router.get('/assets',getcrypto)

module.exports=router
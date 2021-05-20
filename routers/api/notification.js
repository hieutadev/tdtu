const express = require('express')
const router = express.Router()

const User = require('../../models/userModel')
const Notification = require('../../models/notificationModel')

router.post('/', async (req, res) =>{
    Notification(req.body).save()
    .then(async (noti)=>{
        noti.postedBy = await req.user
        // console.log(noti.postedBy)
        return res.status(200).send(noti)
    })
})

router.get('/', async (req, res) => {
    var allNoti = await Notification.find().populate('postedBy')
    return res.status(200).send(allNoti)
})

// router.get('/',  async (req, res) =>{
//     var data = await User.find({role: 'faculty'})
//     return res.status(200).send(data)
// })
// router.put('/:id',  async (req, res) =>{
//     var user = await User.findByIdAndUpdate(req.params.id, {"$set": req.body}, {new: true})
//     return res.sendStatus(200)
    
// })
// router.delete('/:id',  async (req, res) =>{
//     var user = await User.findByIdAndDelete(req.params.id)
//     return res.sendStatus(200)
    
// })
// router.get('/:id', async (req,res)=>{
//     User.findById(req.params.id).then((user) =>{
//         return res.status(200).send(user)
//     })
// })
module.exports = router
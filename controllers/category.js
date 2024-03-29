const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')
const Position = require('../models/Position')


module.exports.getAll = async function(req, res) {
  try{
    const categories = await Category.find({
      user: req.user.id
    })

    res.status(200).json(categories)
  }catch(e){
    errorHandler(res,e)
  }
}

module.exports.getById = async function(req, res) {
  try{
    const category = await Category.findById(req.params.id)

    res.status(200).json(category)
  }catch(e){
    errorHandler(res,e)
  }
}

module.exports.remove = async function(req, res) {
  try{
    await Category.remove({_id: req.params.id})
    await Position.remove({category: req.params.id})
    res.status(200).json({
      message: 'Категория удалена'
    })
  }catch(e){
    errorHandler(res,e)
  }
}

module.exports.create = async function(req, res) {
  console.log(req.user)
  const category = new Category({
    name: req.body.name,
    imageSrc: req.file ? req.file.path : '',
    user: req.user.id
  })
  try{
    await category.save()
    res.status(201).json(category)
  }catch(e){
    errorHandler(res,e)
  }
}

module.exports.update = async function(req, res) {
  const updated = {
    name: req.body.name
  }

  if(req.file){
    updated.imageSrc = req.file.path
  }
  try{
    const category = await Category.findByIdAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(category)
  }catch(e){
    errorHandler(res,e)
  }
}
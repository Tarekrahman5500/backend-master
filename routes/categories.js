const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList);
})
router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();
    if (!category) return res.status(404).send('The category can not be created');
    res.status(200).send(category);
})

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(500).json({message: 'The category ' + req.params.id + ' is not found'});
    res.status(200).send(category);

})

router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon ,
            color: req.body.color
        },
        {new: true}
    )
    if (!category) return res.status(404).send('The category can not be update');
    res.send(category);
})

router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({success: true, message: 'The category is remove'})
        } else {
            return res.status(404).json({success: false, message: 'The category not found'})
        }
    }).catch(err => {
        return res.status(404).json({success: false, error: err})
    })
})
module.exports = router;

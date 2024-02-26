const route = require('express').Router()
const {create,getApartment,editApartment, deletApartment}= require('../controller/apartment.controller')

route.post('',create)
route.get('',getApartment)
route.put('/:id',editApartment)
route.delete('/:id',deletApartment)

module.exports = route;
const route = require('express').Router()
const {create,getApartment,editApartment, deleteApartment, getChartStat, getApartmentByNumApp}= require('../controller/apartment.controller')

route.post('/apartments',create)
route.get('/apartments',getApartment)
route.put('/apartments/:id',editApartment)
route.delete('/apartments/:id',deleteApartment)
route.get('/stat/apartment',getChartStat)
route.get('/apartments/:id',getApartmentByNumApp)

module.exports = route;
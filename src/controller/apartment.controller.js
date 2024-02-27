const apartmentModel = require('../model/apartment.model')

exports.create = async(req,res)=>{
    try{
        const{design,rent} = req.body
        const apartment = new apartmentModel({
            design,
            rent
        })
        await  apartment.save()
        res
            .status(200)
            .json({message: "apartment created successfully"})
    }catch (e){
        res
            .status(500)
            .json({message: e.message})
    }
}
exports.getApartment = async (req,res)=>{
    try {
        let apartment={}
        const size = req.query.size
        if(size){
            apartment = await  apartmentModel.find()
                .sort({_id: -1})
                .limit(size)
        }else{
            apartment = await  apartmentModel.find()
        }
        res
            .status(200)
            .json({_embedded: {apartments:apartment}})
    }catch (e){
        res
            .status(500)
            .json({message: e.message})
    }
}

exports.editApartment = async (req,res)=>{
    try{
        const apartmentId = req.params['id']
        const {design,rent} = req.body
        const condition ={numApp: apartmentId}
        const newInformation = {
            design,
            rent
        }
        await apartmentModel.updateOne(condition,{$set:newInformation})
        res
            .status(200)
            .json({message: "apartment updated successfully"})
    }catch (e){
        res
            .status(500)
            .json({message: e.message})
    }
}
exports.deleteApartment = async (req,res)=>{
    try{
        const apartmentId = req.params['id']
        const deletedApartment = await apartmentModel.deleteOne({numApp: apartmentId})
        if(deletedApartment.deletedCount === 1) {
            return res
                .status(200)
                .json({message: "Materiel deleted successfully!"})
        } else{
        return res
            .status(500)
            .json({message: "Eror! Something went wrong"})
        }
    }catch (e){
        res
            .status(500)
            .json({message: e.message})
    }
}
exports.getChartStat=async (req,res)=>{
    try {
        const stats = await apartmentModel.aggregate([
            {
                $group: {
                    _id: null,
                    minRent: { $min: "$rent" },
                    maxRent: { $max: "$rent" },
                    totalRent: { $sum: "$rent" }
                }
            }
        ]);
        const { minRent, maxRent, totalRent } = stats[0];
        return res
            .status(200)
            .json({min:minRent,max:maxRent,total:totalRent})
    }catch (e){
        res
            .status(500)
            .json({message: e.message})
    }
}
exports.getApartmentByNumApp = async (req,res)=>{
    try {
        const apartmentId = req.params['id']
        console.log(apartmentId)
        const apartment = await  apartmentModel.findOne({numApp: apartmentId})
        console.log(apartment)
        res
            .status(200)
            .json({design:apartment.design,numApp: apartment.numApp,rent:apartment.rent})
    }catch (e){
        res
            .status(500)
            .json({message: e.message})
    }
}
exports.getRecentApartment = async(req,res)=>{
    try{
        const size = req.query.size
        const apartment = await  apartmentModel.find()
            .sort({_id: -1})
            .limit(size)
        res
            .status(200)
            .json({apartment})

    }catch (e){
        res
            .status(500)
            .json({message: e.message})
    }
}
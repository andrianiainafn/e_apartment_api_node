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
        const apartment = await  apartmentModel.find()
        res
            .status(200)
            .json({apartment})
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
exports.deletApartment = async (req,res)=>{
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
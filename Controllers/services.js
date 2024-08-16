import { CompanyModel } from "../Models/services.js";
import servSchema from "../Schema/services.js";

export const createService = async (req, res, next) => {
    try {
      const {error, value} = servSchema.validate({...req.body, image: req?.file?.filename
      }); 
      if (error){
        return res.status(400).send(error.details[0].message);
      }
      const addService = await CompanyModel.create(value);
      res.status(201).json({ addService, message: 'Created Successfully'})
    } catch (error) {
       next(error) 
    }
};

export const updateService = async (req, res, next) =>{
    try {
        const {error, value} = servSchema.validate({
            ...req.body,
            image: req?.file?.filename,
          })
        if(error){
            return res.status(404).send(error.details[0].message)
        }  
        const update = await CompanyModel.findByIdAndUpdate(req.params.id,value, { new: true});
        if(!update){
            return res.status(404).send("Service Not Found");
        }
        res.status(200).json({message:"Service Updated Successfully", update});
    } catch (error) { 
    next(error)
    }
};

export const getServices = async(req, res, next) => {
    try {
      const {limit = 0, skip = 0, filter="{}", sort="{}" } = req.query;
      const allService = await CompanyModel
      .find(JSON.parse(filter))
      .limit(JSON.parse(limit))
      .skip(JSON.parse(skip))
      .sort(JSON.parse(sort))
       res.status(200).json(allService)
    } catch (error) {
       next(error) 
    }
}

export const getService = async(req, res, next) => {
    try {
   const getAService = await CompanyModel.findById(req.params.id);
   res.status(200).json(getAService);
    } catch (error) {
        next(error);
    }
};

export const deleteService = async(req, res, next) => {
    try {
// Delete recipe by id
        const company = await CompanyModel.findByIdAndDelete(req.params.id);
        if(!company){
            return res.status(404).send(" Company not found");
         }
        // Return response
        res.status(200).json({company, message: 'Deleted Successfully'});
    }
       catch (error) {
        next(error)
    }
};


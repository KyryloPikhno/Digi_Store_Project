const {brandService} = require("../services");


module.exports = {
    getAll: async (req, res, next) => {
        try {
            res.status(200).json(req.brands);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            res.status(200).json(req.brand);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const brand = await brandService.create({name: req.body.brand});

            res.status(201).json(brand)
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            res.status(201).json(req.brand)
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            await brandService.deleteOne(req.params.brandId)

            res.status(204)
        } catch (e) {
            next(e);
        }
    },
};
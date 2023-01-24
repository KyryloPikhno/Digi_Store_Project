const {authService, userService} = require("../services");
const {Auth} = require("../models");


module.exports = {
    registration: async (req, res, next) => {
        try {
            const hashPassword = await authService.hashPassword(req.body.password);

            const user = await userService.create({...req.body, password: hashPassword})

            // const order = await Order.create({_user_id: user._id});

            res.status(201).json(user);
        } catch (e) {
            next(e)
        }
    },

    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await authService.comparePasswords(user.password, body.password);

            const tokenPair = authService.generateAccessTokenPair({id: user._id});

            await Auth.create({...tokenPair, _user_id: user._id})

            res.status(200).json({user, ...tokenPair})
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id} = req.tokenInfo

            await Auth.deleteOne({refreshToken})

            const tokenPair = authService.generateAccessTokenPair({id: _user_id});

            await Auth.create({...tokenPair, _user_id})

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    account: async (req, res, next) => {
        try {
            const user = await userService.findOneByParams({_id: req.userInfo.id});

            res.status(200).json(user)
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const {_user_id} = req.tokenInfo

            await Auth.deleteMany({_user_id})

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};
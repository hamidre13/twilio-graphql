"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../user/user.model");
exports.authController = {};
exports.authCheck = (req, res, next) => {
    if (process.env.NODE_ENV !== "production") {
        next();
    }
    else {
        if (!req.user) {
            console.log("no USer");
            res.status(401).send("unAuthorized");
        }
        else {
            next();
        }
    }
};
/**
 * @param {object} req - request object
 * @return {boolean} - It will return true if uses is authenticated and athorized otherwise it will return false
 */
exports.authCheckGraph = async (req, role) => {
    if (process.env.NODE_ENV === "production") {
        if (!req.user) {
            return false;
        }
        else {
            if (!req.session.role) {
                const userRole = await user_model_1.userMeta.findOne({
                    userId: req.user.id,
                    metaKey: "role"
                });
                if (userRole) {
                    req.session.role = userRole.metaValue;
                }
            }
            /** This means that the role required to access the area is higher than the user role */
            if (role > req.session.role) {
                return false;
            }
        }
    }
    else {
        // console.log(
        //   "Some functionalities like making phone calls does not work without logging in!"
        // );
        return true;
    }
};
//# sourceMappingURL=auth.controller.js.map
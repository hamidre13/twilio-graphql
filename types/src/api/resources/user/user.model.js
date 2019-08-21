"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userMetaShema = new mongoose_1.Schema({
    metaKey: {
        type: String,
        required: true
    },
    metaValue: String,
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true });
userMetaShema.index({ userId: 1, metaKey: 1 }, { unique: true, dropDups: true });
exports.userMeta = mongoose_1.default.model("userMeta", userMetaShema);
exports.validateEmail = function (v) {
    const regx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regx.test(v);
};
exports.validatePassword = function (k) {
    // const mediumRegex = new RegExp(
    //   '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    // );
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    return strongRegex.test(k);
};
const userSchema = new mongoose_1.Schema({
    userEmail: {
        type: String,
        unique: true,
        required: [true, "You have to supply a valid email"],
        validate: [exports.validateEmail, "Please provide valid email address"]
    },
    userActivationKey: {
        type: String
    },
    userName: {
        type: String,
        unique: [true, "this user name is already exist"],
        required: [true, "username is nessary"],
        message: "This email is already exsit in our system. if you forgot your password please use password revovery tool"
    },
    password: {
        type: String,
        validate: [
            exports.validatePassword,
            "Your password should be at leas 8 charachter containg one lower case,one upper case,one number and one special character"
        ]
    },
    googleId: {
        type: String
    },
    fbId: {
        type: String
    }
}, { timestamps: true });
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = this.hashPassword(this.password);
    next();
});
userSchema.post("save", (error, doc, next) => {
    if (error.name === "MongoError" && error.code === 11000) {
        next(new Error("This email alreay exists in the system"));
    }
    else {
        next(error);
    }
});
userSchema.methods = {
    authenticate(plainTextPassword) {
        const val = bcryptjs_1.default.compareSync(plainTextPassword, this.password);
        return val;
    },
    hashPassword(plainTextPassword) {
        if (!plainTextPassword) {
            throw new Error("Could not save user");
        }
        const salt = bcryptjs_1.default.genSaltSync(10);
        return bcryptjs_1.default.hashSync(plainTextPassword, salt);
    }
};
exports.userModel = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=user.model.js.map
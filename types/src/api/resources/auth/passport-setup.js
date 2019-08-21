"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const gStrategy = __importStar(require("passport-google-oauth2"));
const local_startegy = __importStar(require("passport-local"));
const fbStrategy = __importStar(require("passport-facebook"));
const config_1 = __importDefault(require("../../../config"));
const user_model_1 = require("../user/user.model");
const GoogleStrategy = gStrategy.Strategy;
const LocalStartegy = local_startegy.Strategy;
const FacebookStrategy = fbStrategy.Strategy;
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => {
    user_model_1.userModel.findById(id).then(user => {
        done(null, user);
    });
});
passport_1.default.use(new GoogleStrategy({
    clientID: config_1.default.accounts.GOOGLE_CLIENT_ID,
    clientSecret: config_1.default.secrets.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
    user_model_1.userModel.findOne({ googleId: profile.id }, async (user, err) => {
        if (err) {
            done(err, null);
        }
        //TODO: we have to check the email before creating a new user!!
        if (user) {
            // We have our user just log her in
            done(null, user);
        }
        else {
            // It is a new user create him and log him in
            const emailUser = await user_model_1.userModel.findOne({
                userEmail: profile.email
            });
            if (emailUser) {
                //The user already registered with that email, but not with google so let's update him
                user_model_1.userModel.findByIdAndUpdate(emailUser._id, { $set: { googleId: profile.id } }, { new: true }, (err, usr) => {
                    if (err)
                        done(err, null);
                    done(null, emailUser);
                });
            }
            else {
                const newUser = await user_model_1.userModel.create({
                    userEmail: profile.email,
                    userName: profile.email,
                    googleId: profile.id
                });
                if (profile._json.domain &&
                    profile._json.domain === "seodapop.com") {
                    user_model_1.userMeta.create([
                        {
                            metaKey: "role",
                            metaValue: 4,
                            userId: newUser.id
                        }
                    ]);
                    request.session.role = 4;
                }
                else {
                    user_model_1.userMeta.create([
                        {
                            metaKey: "role",
                            metaValue: 1,
                            userId: newUser.id
                        }
                    ]);
                    request.session.role = 1;
                }
                if (profile._json.gender) {
                    user_model_1.userMeta.create([
                        {
                            metaKey: "gender",
                            metaValue: profile._json.gender,
                            userId: newUser.id
                        }
                    ]);
                }
                user_model_1.userMeta.create([
                    {
                        metaKey: "familyName",
                        metaValue: profile.name.familyName,
                        userId: newUser.id
                    },
                    {
                        metaKey: "givenName",
                        metaValue: profile.name.givenName,
                        userId: newUser.id
                    },
                    {
                        metaKey: "image",
                        metaValue: profile.photos[0].value,
                        userId: newUser.id
                    }
                ]);
                done(null, newUser);
            }
        }
    });
}));
passport_1.default.use(new FacebookStrategy({
    clientID: config_1.default.accounts.FACEBOOK_APP_ID,
    clientSecret: config_1.default.secrets.FACEBOOK_APP_SECRET,
    callbackURL: config_1.default.siteUrl + "/api/auth/fb/callback",
    profileFields: [
        "id",
        "displayName",
        "email",
        "birthday",
        "friends",
        "first_name",
        "last_name",
        "middle_name",
        "gender",
        "link"
    ]
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    user_model_1.userModel.findOne({ fbId: profile.id }, function (err, user) {
        if (err) {
            done(err);
        }
        if (user) {
            done(null, user);
        }
        else {
            //fb profile not found, but we have to check for email too
            if (profile._json.email && profile._json.email !== "undefined") {
                user_model_1.userModel
                    .findOne({ userEmail: profile._json.email })
                    .then(async (emailUser) => {
                    if (emailUser) {
                        user_model_1.userModel.findByIdAndUpdate(emailUser._id, { $set: { fbId: profile.id } }, { new: true }, (err, usr) => {
                            if (err)
                                done(err, null);
                            done(null, emailUser);
                        });
                    }
                    else {
                        const newUser = await user_model_1.userModel.create({
                            userEmail: profile._json.email,
                            userName: profile._json.email,
                            fbId: profile.id
                        });
                        user_model_1.userMeta.create([
                            {
                                metaKey: "familyName",
                                metaValue: profile.name.familyName,
                                userId: newUser.id
                            },
                            {
                                metaKey: "givenName",
                                metaValue: profile.name.givenName,
                                userId: newUser.id
                            },
                            {
                                metaKey: "role",
                                metaValue: 1,
                                userId: newUser.id
                            }
                        ]);
                        done(null, newUser);
                    }
                });
            }
            else {
                done(new Error("email not supllied"), {
                    message: "We cannot access your email.Please try to login with another platform"
                });
            }
        }
    });
}));
passport_1.default.use(new LocalStartegy(function (username, password, done) {
    user_model_1.userModel.findOne({ userName: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: "incorrect username and/or password"
            });
        }
        if (!user.authenticate(password)) {
            return done(null, false, {
                message: "incorrect username and/or password"
            });
        }
        return done(null, user);
    });
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport-setup.js.map
import jwt, { decode } from 'jsonwebtoken'
import { UserModel } from "../models/user.model.js"
import { UserVerifyModel } from '../models/userVerifyOtp.model.js'
import sendMail from '../utils/mailer.js'

// TO Register User
const userRegister = async (req ,res) => {
    const { name, username, password , email, avatar, passion  }= req.body

    try{
        const newUser = new UserModel({
            name: name,
            username: username,
            password: password,
            email: email, 
            avatar: avatar,
            passion: passion,
        })

        const getUser = await newUser.save()
        res.send(getUser)
    }
    catch(err){
        res.send(err)
    }
}


// To Check Exist Email for Registration
const checkUser = async (req, res) => {
    try{
        const findExistUser = await UserModel.findOne({email: req.query.email})
        if(findExistUser.email){
            return res.status(404).send({
                succes: false
            })
        }
    }
    catch(err){
        res.status(200).send({
            succes: true
        })
    }
}


// To Check Existed Username for Registration 
const checkUserName = async (req, res) => {
    try{
        const findExistUserName = await UserModel.findOne({username: req.query.username})
        if(findExistUserName.username){
            return res.status(404).send({
                succes: false
            })
        }
    }
    catch(err){
        res.status(200).send({
            succes: true
        })
    }
}

// Account Verification Requested
const createAccountVerification = async (req, res) => {

    const { email } = req.body

    try{
        const otpDigit6 = Math.floor(100000 + Math.random() * 900000)
        const tokenOtp = jwt.sign({email: email, otp: otpDigit6}, process.env.JWT_SECRET, {expiresIn: '5m'})

        const newOtpToken = await UserVerifyModel.findOneAndUpdate(
            {email: email},
            {$set: {
                email: email,
                token: tokenOtp
            }},
            {new: true, upsert: true}
        )

        const optSend = await sendMail({
            to: email, 
            subject: "Account Verification Otp",
            text: "Registration Otp",
            html: `
                <h1>${otpDigit6}<h1/>
            `, 
        })

        res.send({
            succes: true
        })

    }
    catch(err){
        res.status(404).send({
            succes: false,
            err
        })
    }
}


// Otp Check 
const checkOtp = async (req, res) => {
    const { email, otp } = req.query;

    try {
        const findOtp = await UserVerifyModel.findOne({ email });

        if (!findOtp || !findOtp.token) {
            return res.status(404).send({ error: 'no-otp-found', success: false });
        }

        jwt.verify(findOtp.token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(400).send({ error: 'otp-is-expired', success: false });
            }

            if (decode.otp === parseInt(otp)) {
                return res.status(200).send({ msg: 'otp-verify-success', success: true });
            } else {
                return res.status(400).send({ error: 'invalid-otp', success: false });
            }
        });
    } catch (err) {
        return res.status(500).send({ error: 'something-went-wrong', success: false });
    }
};


export { userRegister, checkUser, checkUserName, createAccountVerification, checkOtp }
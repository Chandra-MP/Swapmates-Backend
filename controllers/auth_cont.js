import { db } from "../db.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import cookie from 'cookie-parser'



export const register = (req, res) => {
    //CHECK EXISTING USER

    const q = "SELECT * FROM user WHERE Email =? OR user_name =?"

    db.query(q, [req.body.name, req.body.email], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User Already Exists!")

        //Encrypt password using bcryptjs library
        //Hash to password and create a user

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Password is hashed now to add it to out DB

        const q = "INSERT INTO user(first_name, Email, user_name, password) VALUES(?)"
        const values = [
            req.body.name,
            req.body.email,
            req.body.username,
            hash,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            console.log(data);
            return res.status(200).json("User has been Created!");
        })

    });
}




export const login = (req, res) => {

    // Check if the user exists
    const q = "SELECT * FROM user WHERE user_name = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        //Check the password for the user by comparing to the hashed password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)
        //check if the password is correct -
        if (!isPasswordCorrect) return res.status(400).json("Wrong username or Password!")

        //Extracting the password from the payload for the access_token cookie
        const { password, ...other } = data[0]

        //Creating a unique token for a user
        const token = jwt.sign({id: data[0].user_id}, "jwtkey");
        
        console.log("The token is: ", token)
        
       //sending the cookies to the frontend
        res.status(200).send({...other, token: token});
    });
}

export const logout = (req, res) => {

}
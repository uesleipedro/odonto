import { Request, Response, NextFunction } from 'express'
// import jwt, { Secret, JwtPayload } from 'jsonwebtoken'

// interface CustomRequest extends Request {
//     token: string | JwtPayload;
// }


// const auth = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req.header('Authorization')?.replace('Bearer ', '');

//         if (!token) {
//             throw new Error();
//         }
//         const SECRET_KEY: Secret = 'your-secret-key-here';
//         const decoded = jwt.verify(token, SECRET_KEY);
//         (req as CustomRequest).token = decoded;

//         next();
//     } catch (err) {
//         res.status(401).send('Please authenticate');
//     }
// }

// export default auth;
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { UserController } from "../controllers/userController";
const User = new UserController()

type optionsType = {
    expiresIn: string;
}

async function validateToken(req: Request, res: Response, next: NextFunction) {

    // console.log('VVVVVVV ', req.body)
    // return

    const auhorizationHeader = req.headers.authorization;
    let result: any;

    if (!auhorizationHeader) {
        return res.status(401).json({
            error: true,
            message: "Access token is missing",
        });
    }

    const token: any = req?.headers?.authorization?.split(" ")[1];

    const options: any = {
        expiresIn: "24h",
    };

    try {
        let user: any = await User.loginOne(req, res);

        if (!user) {
            result = {
                error: true,
                message: "Authorization error",
            };

            return res.status(403).json(result);
        }

        result = jwt.verify(token, 'your-secret-key-here', options);

        if (!user?.user?.foundUser.email === result.email) {
            result = {
                error: true,
                message: "Invalid token",
            };

            return res.status(401).json(result);
        }

        // req.decoded = result;

        next();
    } catch (error: any) {
        console.error(error);

        if (error.name === "TokenExpiredError") {
            return res.status(403).json({
                error: true,
                message: "Token expired",
            });
        }

        return res.status(403).json({
            error: true,
            message: "Authentication error",
        });
    }
}

export default validateToken;
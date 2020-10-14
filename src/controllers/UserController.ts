import { Request, Response } from 'express'
import crypto from 'crypto'

import connection from '../database/connection'


class User {
    async create(request: Request, response: Response) {
        const { name } = request.body

        const crypt = crypto.randomBytes(8).toString('hex')
        
        try {
            const user = await connection('users').insert({
                id: crypt,
                name
            })
            
            return response.json(user)

        } catch (error) {
            return response.status(400).json(`ERROR - It was not possible to register the user! ${error}`)
        }
    }
}


export default User

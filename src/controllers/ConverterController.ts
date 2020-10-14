import { Request, Response } from 'express'
import connection from '../database/connection'


class Converter {
    async create(request: Request, response: Response) {
        const { 
            source_currency, 
            source_value,
            target_currency,
            conversion_rate
        } = request.body

        const { user_id } = request.headers

        const converter = {
            source_currency, 
            source_value,
            target_currency,
            conversion_rate,
            user_id
        }

        try {
            await connection('converters').insert(converter)
            
            return response.json(converter)

        } catch (error) {
            return response.status(400).json(`ERROR - It was not possible to register conversions! ${error}`)
        }
    }

    async index(request: Request, response: Response) {
        const { id } = request.params

        try {
            const converter = await connection('converters').where('user_id', id).select('*')

            if(!converter){
                return response.status(404).json('ERROR - Conversions not found!')
            }

            return response.json(converter)

        } catch (error) {
            return response.status(400).json(`ERROR - conversion data could not be returned! ${error}`)
        }
    }
}

export default Converter
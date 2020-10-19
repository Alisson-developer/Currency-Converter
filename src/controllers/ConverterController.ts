import { Request, Response } from 'express'
import axios from 'axios'
import crypto from 'crypto'

import connection from '../database/connection'


type Converters = 
    [
        {
            source_currency: string
            source_value: number
            target_currency: string
            target_value: number
            conversion_rate: string
            conversion_date: string
            user_id: string | Array<string>
        }
    ]


// Class for adding values ​​and listing the conversions in the 
// conversion table
class Converter {
    
    // Method for registering conversions
    async create(request: Request, response: Response) {

        const { 
            source_currency, 
            source_value,
            target_currency
        } = request.body
        
        const { user_id } = request.headers
        

        function multiplyValuesCurrency(origin: number, rate: number) {
            const result = origin * rate
            return result
        }
        
        try {
            
            const conversion = await axios.get(`https://api.exchangeratesapi.io/latest?base=${source_currency}`)
            const date = conversion.data.date
            const rate: Array<number> = conversion.data.rates
            
            const generatedId = crypto.randomBytes(8).toString('hex')  
            
            const targetValue = multiplyValuesCurrency(source_value, rate[target_currency])
            
            const converter: Converters = 
            [
                {
                    user_id: user_id ? user_id : generatedId,
                    source_currency, 
                    source_value,
                    target_currency,
                    target_value: Number(targetValue.toFixed(2)),
                    conversion_rate: source_currency,
                    conversion_date: date,
                }
            ]

            const [id] = await connection('converters').insert(converter)
            
            return response.json({id, converter})
            
        } catch (error) {
            return response.status(400).json(`ERROR - It was not possible to register conversions! ${error}`)

        }
    }
    

    // Conversion listing method by user
    async index(request: Request, response: Response) {
        const { id } = request.params
        
        try {
            
            const converters = await connection('converters')
            .where('user_id', id)
            .select(
                'id',
                'user_id',
                'source_currency', 
                'source_value',
                'target_currency',
                'target_value',
                'conversion_rate'
                )
                
            if(!converters){
                return response.status(404).json('ERROR - Conversions not found!')
            }
            
            return response.json(converters)        
                
        } catch (error) {
            return response.status(400).json(`ERROR - conversion data could not be returned! ${error}`)

        }
    }
}

export default Converter

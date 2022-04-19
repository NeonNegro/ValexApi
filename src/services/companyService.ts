import * as companyRepository from '../repositories/companyRepository.js';


export async function validateApiKey(apiKey: string) {
    const company = await companyRepository.findByApiKey(apiKey);
    if(!company)
            throw {message: 'Invalid ApiKey'}
}
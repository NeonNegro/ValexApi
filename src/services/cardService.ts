    import * as cardRepository from '../repositories/cardRepository.js';

    export async function createCard (card: any){
            cardRepository.insert(card);
    }
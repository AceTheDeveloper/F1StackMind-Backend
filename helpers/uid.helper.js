import crypto from 'crypto'

export function generateUid(){
    return crypto.randomUUID();
}
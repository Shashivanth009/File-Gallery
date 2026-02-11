import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Constructed from nslookup results
const directUri = 'mongodb://vj08655:chandhu%40seshi09@ac-pycyfay-shard-00-00.v0jdi11.mongodb.net:27017,ac-pycyfay-shard-00-01.v0jdi11.mongodb.net:27017,ac-pycyfay-shard-00-02.v0jdi11.mongodb.net:27017/filegallery?ssl=true&authSource=admin';

const maskedUri = directUri.replace(/:([^:@]{1,})@/, ':****@');

console.log('Testing connection to (DIRECT):', maskedUri);

mongoose.connect(directUri, { family: 4 })
    .then(() => {
        console.log('SUCCESS: MongoDB Connected!');
        process.exit(0);
    })
    .catch(err => {
        console.error('ERROR: MongoDB Connection Failed!');
        console.error(err);
        process.exit(1);
    });

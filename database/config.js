const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        
        const uris = process.env.MONGODB_ATLAS; 

        await mongoose.connect( uris, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('DB Conectado!');

    } catch (error) {
        console.log( error );
        // throw new Error('Error en la base de datos');
        throw new Error( error );
    }

}

module.exports = {
    dbConnection
}
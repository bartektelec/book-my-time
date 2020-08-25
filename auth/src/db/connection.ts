import { connect } from 'mongoose'

function connectWithMongoDb(): void {
    const { MONGO_DB_HOST, MONGO_DB_NAME, MONGO_DB_USERNAME, MONGO_DB_PASSWORD } = process.env
    const connstring: string = `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:27017/${MONGO_DB_NAME}?authSource=admin`

    try {
        connect(connstring,
            {
                useNewUrlParser: true,
                // useUnifiedTopology: true
            }
        ).then(() => {
            return console.info(`Successfully connected to mongo`);
        })
            .catch((error: Error) => {
                console.error('Error connecting to database: ', error);
            });

    }
    catch (error) {
        console.error('connectWithMongoDb', error)
    }

}


export default connectWithMongoDb

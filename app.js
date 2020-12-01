const express = require( 'express' );
const mysql = require( 'mysql' );
const dotenv = require( 'dotenv' );
const path = require( 'path' );

dotenv.config({ path: './.env' });

const app = express();

// Creating connection to db ( MySQL )
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});



// css files directory
const publicDirectory = path.join( __dirname, './public' );
app.use( express.static( publicDirectory ));

app.set( 'view engine', 'hbs' );



// Connecting to db ( MySQL )
db.connect(( error ) => {
    if( error ){
        console.log( error );
    } else {
        console.log( 'MySQL Connected. ;)' );
    }
});



// Define routes
app.use( '/', require( './routes/pages' ));
app.use( '/register', require( './routes/pages' ));
app.use( 'login', require( './routes/pages') );




app.listen( 3000, () => {
    console.log( 'Server started on port 3000' );
});
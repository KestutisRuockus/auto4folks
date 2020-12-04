const express = require( 'express' );
const mysql = require( 'mysql' );
const dotenv = require( 'dotenv' );
const path = require( 'path' );
const cokieParser = require( 'cookie-parser' );

dotenv.config({ path: './.env' });

const app = express();

// Creating connection to db ( MySQL )
const db = mysql.createConnection({
    host:       process.env.DATABASE_HOST,
    user:       process.env.DATABASE_USER,
    password:   process.env.DATABASE_PASSWORD,
    database:   process.env.DATABASE
});



// css files directory
const publicDirectory = path.join( __dirname, './public' );
app.use( express.static( publicDirectory ));



// parse URL-encoded bodies ( as sent by HTML forms )
app.use( express.urlencoded({ extended: false }));

// parse JSON bodies ( as sent by API clients )
app.use( express.json() );
app.use( cokieParser() );

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
app.use( '/auth', require( './routes/auth' ));




app.listen( 3000, () => {
    console.log( 'Server started on port 3000' );
});
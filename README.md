# ip-detection-api

## About
This is a REST API which has a single 

## Setup
1. Git clone this project
    
        git clone https://github.com/mandros1/ip-detection-api.git

2. Setup a PostgreSQL database and create .env file with it's credentials, also include wanted port an host for the API

        # environmental data for the REST API
        API_PORT=
        API_HOST=
        # environmental data for connecting to local postgres database
        DB_USERNAME=
        DB_HOST=
        DB_NAME=
        DB_PASSWORD=
        DB_PORT=


3. Go to the directory where the project has been cloned and run
      
        npm install

    to install all the neccessary packages
    
  
4. After the installation is done we need to run migrations and seeds to create data in the database
    
    First we migrate
           
        knex migrate:latest
        
    or run the created npm script
    
        npm run db:migrate
    
    Secondly we run seeds to populate the tables
    
        knex seed:run
    
    or run the created npm script
    
        npm run db:seed
        
5. Now that we have our data inside our tables we need to build app to transpile the typescript code 

        npm run build
        
5. Finally start the application by running 

        npm start
        
## Testing
    
In order to test this application locally the ngrok package is required, it can be downloaded [here](https://ngrok.com/download). 
Once we have ngrok installed and our application is running at a certain port (lets say 3000) we need to expose it 
with ngrok by running 

        ngrok http 3100

Note that 3100 is the port on which your application is made to run (defined in .env file)

Once it starts up it will look something like this

        Session Status                online
        Session Expires               6 hours, 34 minutes
        Version                       2.3.35
        Region                        United States (us)
        Web Interface                 http://127.0.0.1:4040
        Forwarding                    http://95272645.ngrok.io -> http://localhost:3150
        Forwarding                    https://95272645.ngrok.io -> http://localhost:3150

We need the forwarding address to make a request on our API and since our API has only 1 route which is a GET on /info
the GET request we need to make (in postman or any other tool capable of making http requests) to http://95272645.ngrok.io/info

**Note** this address is different every time we run the ngrok command, so it will not be the same as mine 

Finally last thing as we prepare the GET request to the API we need to add header **Content-Type** to the request with
values either **text/csv** OR **application/json**.

If none of the 2 mentioned types is provided you will not be able to get any data.  

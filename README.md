# simple-messaging
A simple two-service messaging system made up of a consumer and a producer.

### Consumer
The consumer accepts requests from consumers to '/', and if passed a query of the form
'A+B=' where A and B are integers, then will evaluate the sum of A and B and return the sum to the consumer.
Otherwise, it will respond with 'hello'.

### Producer
The producer generates requests to a consumer at specified hostname and port at a fixed
time interval a set number of times.

The requests consist of a query string that is a simple integer addition statement. The integers are
addition statement is generated randomly.

The consumer will return the solution of the addition statement to the producer.

### Running
1. Pull the repo to your local machine or server.

2. Install node.js if not installed. [Node.JS Installation](https://nodejs.org/download/)

3. cd to the repo directory from the command line.

4. Run `npm install` to install dependencies.

5. Run services.
    * To run the Consumer, enter `node consumer.js` at the command line.
        * Port defaults to 3000
        * To manually set the port, add a environment variable to the command:
            `PORT=3000 node consumer.js`

    * To run the Producer, enter `node producer.js` at the command line.
        * Host and port of Consumer defaults to 'localhost:3000'. 
        * To manually set the host port, add environment variables to the command:
            `HOST=localhost PORT=3000 node consumer.js`
        * By default, the Producer issues 10 total requests at 1 request per 100ms.
        * To change the interval and cycles, add command line arguments as follows:
            `node consumer.js --interval=1000 --reps=120`
            which would issue a total of 120 requests at 1 request per 1000ms (1 second).

### Tests

1. cd to the repo directory.

2. Run `npm install` if you have not previously.

3. Run `npm test`.

### Activity Diagram

![Simple Messaging Activity Diagram](https://drive.google.com/file/d/0B1hbYzUU-UW8WjYxUVFWVVRvZTQ/view?usp=sharing)








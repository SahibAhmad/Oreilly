const fs = require('fs');

const requestHandler = (req,res)=> {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter the message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        console.log("Recieving data from request \n");
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log('Received message:', message); // Log the received message
            // fs.writeFileSync('message.txt', message);

            fs.writeFile('message.txt',message, (err)=> {
          
                    res.statusCode = 302; // Redirection
                    res.setHeader('Location', '/');
                    res.end();
            });


            
        });
       
        return; // Ensure no further processing occurs for this request
    }

    // For all other routes, or if no specific match is found
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body>hello</body>');
    res.write('</html>');
    res.end();
}


module.exports = 
{
    handler : requestHandler,
    someText: 'some hard coded',
}
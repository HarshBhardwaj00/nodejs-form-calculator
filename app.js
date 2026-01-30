const http = require('http');
const requestHandler  = require('./handler');

const x = http.createServer(requestHandler);

const PORT = 3003;
x.listen(PORT,()=>{
  console.log(`server is running on address  http://localhost:${PORT}`);                           
});
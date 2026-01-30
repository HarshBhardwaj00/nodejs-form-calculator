const add = require("./addition");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      `<html>
<head><title>Practise set</title></head>
<body>
<h1>Welcome to calculator</h1>
<a href="/calculator">Go to calculator</a>
</body>
</html>
`,
    );
    return res.end();
  }

  else if(req.url==="/calculator"){
    res.setHeader("Content-Type", "text/html");
    res.write(
      `<html lang="en">
<head>
  <title>Document</title>
</head>
<body>
  <form action="/calculate-result" method="POST">
    <input type="number" name="num1" placeholder="Enter first number">
    <input type="number" name="num2" placeholder="Enter second number">
    <button type="submit">SUBMIT</button>

  </form>
</body>
</html>
`);
return res.end();

  }
  else if(req.url==="/calculate-result" && req.method=="POST"){ //HERE post is present as it this page is getting a post request from calculator page
      const body = [];
      req.on("data",(chunk)=>{
      body.push(chunk);
      });
      req.on("end",()=>{
        const parsedData = Buffer.concat(body).toString();
        const params = new URLSearchParams(parsedData);
        const num1 = Number(params.get("num1"));
        const num2 = Number(params.get("num2"));
        const result = add(num1,num2);

        res.write(
            
    `<head>
      
     <title>Document</title>
    </head>
    <body>
      <h1>Result</h1>
      <p>Sum of ${num1} and ${num2} is ${result}</p>
      <a href="/calculator"> BACK </a>
      
    </body>
    </html>`
    
        );
        return res.end();

      }
      
    );

      
  }

else{


  res.setHeader("Content-Type", "text/html");
  res.write(
    `<html>
<head><title>Practise set</title></head>
<body>
<h1>404 Page doesnot exist.</h1>
<a href="/">Go to Home</a>
</body>
</html>
`,
  );
};
}
//exports.requestHandelor = requestHandelor;

module.exports = requestHandler;

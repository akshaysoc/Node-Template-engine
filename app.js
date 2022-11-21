const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const flight = require('./data/flight');
const Handlebars = require('handlebars');

registerPartials();
const server = http.createServer((req,res)=>{
    const link = url.parse(req.url, true);
    const query = link.query;
    const page = link.pathname;

    if(page == "/"){
        flight.getAll((err, result)=>{
            // console.table();
            var context = {data: result};
            var template = renderTemplate("index", context);
            res.end(template);
        })
        
    }
    else if (page == "/flight/create" && req.method == "GET"){
        let template = renderTemplate('create', {});
        res.end(template);
    }
    else if(page == "/flight/create" && req.method == "POST"){
        let formData="";
        req.on('data', function(data){
            formData += data.toString();
        });
        req.on('end', function(){
            let userData = qs.parse(formData);
            // console.log(userData);
            flight.addOne(userData.nam, userData.des, userData.cap, (err, result)=>{
                var context = {
                    result:{
                        sucess: true,
                        errors: []
                    }  
                };

                if(err){
                    console.log(err)
                    context.result.sucess = false;
                }
                let t = renderTemplate('create', context);
                    res.end(t);
            });

        });
    }
});

server.listen(80);

function renderTemplate(name, data){
    var filePath = path.join(__dirname, "templates", name+".hbs");
    let templateText = fs.readFileSync(filePath, "utf8");
    let template = Handlebars.compile(templateText);
    return template(data);
}

function registerPartials(){
    var filePath = path.join(__dirname, "templates","partials", "navbar.hbs");
    let templateText = fs.readFileSync(filePath, "utf8");
    Handlebars.registerPartial("navbar",templateText)
}

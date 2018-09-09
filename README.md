# appdrag-datasource-filemaker

<br/>

Node.js Wrapper for Filemaker API 17+ created and maintained by AppDrag

[AppDrag](https://appdrag.com "AppDrag") is a Cloud CMS & Backend made for web professionals and hosted on Amazon AWS. With AppDrag produce 5 times faster websites, blog e-commerce, Databases & API's.


### Installing with NPM
Simply type the following into a terminal window:

`$ npm install appdrag-datasource-filemaker`
<br/><br/>

### Installing with CloudBackend
If your are inside a cloud function in CloudBackend, click on the "Open library manager" button then search for "appdrag-datasource-filemaker", click on the "+" button then save.

![CloudBackend API Dashboard](https://cf.appdrag.com/cloudbackend/assets/AppDrag-Cloudbackend-API-NPM-Manager.jpg "CloudBackend NPM Manager")

<br/><br/>

## Initialization
```
var filemaker = require('appdrag-datasource-filemaker');
filemaker.init('https://yourdomain.com', 'dbname', 'username', 'password');
```

<br/>

## RECORDS
### List Records (layoutName, rowLimit) 
```
var records = JSON.parse(await filemaker.List("your_layout_name", 50));
callback(null, filemaker.ConvertToDataSource(records) );
```

### Find Records (layoutName, query)
```
var dataQuery = {
    "query": [{
        "Nom": "Jobs"
    }],
    "sort": [
        {"fieldName": "Prenom", "sortOrder": "ascend"},
        {"fieldName": "Nom","sortOrder": "ascend"}
    ]
};
var records = await filemaker.Find("your_layout_name", dataQuery);
callback(null, filemaker.ConvertToDataSource(records));
```

### Get Record by id (layoutName, recordId) 
```
var records = JSON.parse(await filemaker.Get("your_layout_name", 1));
callback(null, filemaker.ConvertToDataSource(records) );
```


### Create Record (layoutName, data) 
```
var data = {
    "fieldData": {
        "Prenom": "Jean",
        "Nom": "Dupont"
    }
};
var response = await filemaker.Create("your_layout_name", data);
callback(null, response);
```

### Edit Record (layoutName, data) 
```
var data = {
    "fieldData": {
        "Titre": "Professeur",
        "Societe": "IBM", 
        "Nom": "Dupond2"
    }
};
var response = await filemaker.Edit("your_layout_name", 8, data);
callback(null, response);
```

### Delete Record (layoutName, recordId) 
```
var records = JSON.parse(await filemaker.Delete("your_layout_name", 1));
callback(null, response); 
```


### Execute Script (layoutName, query)
```
var query = {
    "fieldData": {
    },
    "script.prerequest": "YourScriptName1",
    "script.presort": "YourScriptName2",
    "script": "YourScriptName3"
};
var response = await filemaker.Execute("your_layout_name", query);
callback(null, response);
```


### GetToken()
```
var token = await filemaker.GetToken();
callback(null, response);
```


<br/>



# Support
Post your issues or suggestions here on Github
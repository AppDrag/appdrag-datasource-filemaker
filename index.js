var request = require('request');

var rootUrl = 'https://xxxxxxxx.com';
var dbName = 'DBNameHere';
var username = 'yourUserName';
var password = 'yourPassword';
var filemakerAPIUrl = rootUrl + "/fmi/data/v1/databases/" + dbName;

exports.init = function(_rootUrl, _dbname, _username, _password) {
  rootUrl = _rootUrl;
  username = _username;
  password = _password;
  filemakerAPIUrl = _rootUrl + "/fmi/data/v1/databases/" + _dbname;       
}


function GetToken() {
    return new Promise(function(resolve, reject) {
        request.post({
            url: filemakerAPIUrl + "/sessions",
            headers: {
                'content-type': 'application/json',
                'Authorization': "Basic " + new Buffer(username + ":" + password).toString("base64")
            },
            method: 'POST'
        }, function(error, response, body) {

            if ( error )
            {
                return resolve(error);
            }

            //callback(null, body); // Return response from the server
            //return; // stop execution

            var token = "";
            try {
                token = JSON.parse(body).response.token;
                console.log("token: " + token);
                return resolve(token);
            } catch (ex) {
                return resolve(ex + " - " + body);
            }

        });

    });
} 
exports.GetToken = GetToken;



async function ListRecords(layoutName, limit) {
    var token = await GetToken();
    return new Promise(function(resolve, reject) {
        request.get({
            url: filemakerAPIUrl + "/layouts/" + layoutName + "/records?_limit=" + limit,
            headers: {
                'Authorization': "Bearer " + token
            },
            method: 'GET'
        }, function(error, response, body) {
        
            if ( error )
            {
                return resolve(error);
            }
            return resolve(body);
        });

    });
}
exports.List = ListRecords;


async function FindRecords(layoutName, data) {
    var token = await GetToken();
    return new Promise(function(resolve, reject) {
        request.post({
            url: filemakerAPIUrl + "/layouts/" + layoutName + "/_find",
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            json: data
        }, function(error, response, body) {
        
            if ( error )
            {
                return resolve(error);
            }
            return resolve(body);
        });

    });
}
exports.Find = FindRecords;

async function GetRecord(layoutName, id) {
    var token = await GetToken();
    return new Promise(function(resolve, reject) {
        request.get({
            url: filemakerAPIUrl + "/layouts/" + layoutName + "/records/" + id,
            headers: {
                'Authorization': "Bearer " + token
            },
            method: 'GET'
        }, function(error, response, body) {
        
            if ( error )
            {
                return resolve(error);
            }
            return resolve(body);
        });

    });
}
exports.Get = GetRecord;

async function CreateRecord(layoutName, data) {
    var token = await GetToken();
    return new Promise(function(resolve, reject) {
        request.post({
            url: filemakerAPIUrl + "/layouts/" + layoutName + "/records",
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            json: data
        }, function(error, response, body) {
            if ( error )
            {
                return resolve(error);
            }
            return resolve(body);
        });

    });
}
exports.Create = CreateRecord;

async function DeleteRecord(layoutName, id) {
    var token = await GetToken();
    return new Promise(function(resolve, reject) {
        request.delete({
            url: filemakerAPIUrl + "/layouts/" + layoutName + "/records/" + id,
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        }, function(error, response, body) {
        
            if ( error )
            {
                return resolve(error);
            }
            return resolve(body);
        });

    });
}
exports.Delete = DeleteRecord;

async function EditRecord(layoutName, id, data) {
    var token = await GetToken();
    return new Promise(function(resolve, reject) {
        request.patch({
            url: filemakerAPIUrl + "/layouts/" + layoutName + "/records/" + id,
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            json: data
        }, function(error, response, body) {
        
            if ( error )
            {
                return resolve(error);
            }
            return resolve(body);
        });

    });
}
exports.Edit = EditRecord;

async function ExecuteScript(layoutName, data) {
    var token = await GetToken();
    return new Promise(function(resolve, reject) {
        request.post({
            url: filemakerAPIUrl + "/layouts/" + layoutName + "/records",
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            json: data
        }, function(error, response, body) {
        
            if ( error )
            {
                return resolve(error);
            }
            return resolve(body);
        });

    });
}
exports.Execute = ExecuteScript;

function ConvertToDataSource(records) {
    var datasource = new Object();
    datasource.Table = [];

    try
    {
          var rows = records.response.data;
          for (i = 0; i < rows.length; i++) {
              var newLine = new Object();
              newLine.recordId = rows[i].recordId;
              newLine.modId = rows[i].modId;
              for (key in rows[i].fieldData) {
                  newLine[key] = rows[i].fieldData[key];
              }
              newLine.portalData = rows[i].portalData;
      
              datasource.Table.push(newLine);
              return datasource;
          }
    }
    catch(ex)
    {
          return records;
    }
    
    

    
}
exports.ConvertToDataSource = ConvertToDataSource;


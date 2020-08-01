(function() {
 
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback) {
        var cols = [
            
            {id:"deaths", alias: "Fatalidades", dataType: tableau.dataTypeEnum.float},
            
            
            
           
        ];

  
        var tableSchema = {
            id: "Covid_19",
            alias: "covid19",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {  
        function getAllData(url) {  
          $.getJSON(url, function(resp) {  
            var feat = resp.results,  
              next = resp.next;  
      
          
      
            for (var i = 1, len = feat.length; i < len; i++) {  
              tableData.push({  
       
                "deaths": feat[i].deaths,
                
              });  
            }  
   
            if (next !== null) {  
              getAllData(next);  
            } else {  
              table.appendRows(tableData);  
              doneCallback();  
            }  
          });  
        }  
      
        var tableData = [];  
        var url = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json";  
        getAllData(url);  
          
      }; 

 
    tableau.registerConnector(myConnector);


    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "covid19"; 
            tableau.submit(); 
        });
    });
})();
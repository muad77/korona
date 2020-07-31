(function() {
    // Create the connector object

    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "dataRep",
            alias:"Data",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "day",
            alias: "Stan",
            dataType: tableau.dataTypeEnum.string
        }, {
           id: "month",
           alias: "Zarażeni",
           dataType: tableau.dataTypeEnum.int
        },
        {
            id: "year",
            alias:"Intensywna terapia",
            dataType: tableau.dataTypeEnum.int
        },
        {
           id: "cases",
           alias:"Ogółem hospitalizowani",
          dataType: tableau.dataTypeEnum.int
      },
    {
          id: "deaths",
          alias:"Izolacja domowa",
          dataType: tableau.dataTypeEnum.int
    },
    {
           id: "countriesAndTerritories",
           alias:"Ogółem zarażeni",
           dataType: tableau.dataTypeEnum.int
  },
  {
          id: "geoID",
           alias:"geoID",
          dataType: tableau.dataTypeEnum.int
},
{
         id: "countryterritoryCode",
         alias:"Kod kraju",
          dataType: tableau.dataTypeEnum.int
},
{
          id: "dopData2019",
          alias:"opData2019i",
          dataType: tableau.dataTypeEnum.int
}, {
          id: "continentExp",
          alias:"kontynent",
         dataType: tableau.dataTypeEnum.int
},
 {
         id: "Cumulative_number_for_14_days_of_COVID-19_cases_per_100000",
          alias:"14 dni per 100k",
          dataType: tableau.dataTypeEnum.int
}, ];
        var tableSchema = {
            id: "OpenPuglia",
            alias: "Dane dotyczące COVID-19",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://opendata.ecdc.europa.eu/covid19/casedistribution/json/", function(data) {
            //var list = data.json(),       // what method to call? .feature .ts .list..
            var  tableData = [];
          console.log(data)
            // Iterate over the JSON object
            for (var i = 0; i < data.length; i++) {
                tableData.push({
                    "dataRep":data[i]["dataRep"],  // metti in data la response al campo "data"
                    "day":data[i]["stato"],
                    "month":data[i]["ricoverati con sintomi"],
                    "years":data[i]["terapia intensiva"],
                    "cases":data[i]["totale ospedalizzati"],
                    "countriesAndTerritories":data[i]["isolamento domiciliare"],
                    "geoID":data[i]["totale positivi"],
                    "countryterritoryCode":data[i]["variazione totale positivi"],
                    "popData2019":data[i]["nuovi positivi"],
                    "continentExp":data[i]["dimessi guariti"],
                    "Cumulative_number_for_14_days_of_COVID-19_cases_per_100000":data[i]["deceduti"],
                    
                });
            }
   console.log(tableData)
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "OpenPuglia"; // This will be the data source name in Tableau
            tableau.submit();                     // This sends the connector object to Tableau
        });
    });
})();

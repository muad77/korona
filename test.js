(function() {
  // Create the connector object
  var myConnector = tableau.makeConnector();

  // Define the schema
  myConnector.getSchema = function(schemaCallback) {
      var cols = [{
          id: "dataRep",
          alias: "Data",
          dataType: tableau.dataTypeEnum.date
      }];

      var tableSchema = {
          id: "covid19",
          alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
          columns: cols
      };

      schemaCallback([tableSchema]);
  };

  // Download the data
  myConnector.getData = function(table, doneCallback) {
      $.getJSON("https://opendata.ecdc.europa.eu/covid19/casedistribution/json", function(resp) {
          var feat = resp.features,
              tableData = [];

          // Iterate over the JSON object
          for (var i = 0, len = feat.length; i < len; i++) {
              tableData.push({
                  "dataRep":data[i].dataRep,
              });
          }

          table.appendRows(tableData);
          doneCallback();
      });
  };

  tableau.registerConnector(myConnector);

  // Create event listeners for when the user submits the form
  $(document).ready(function() {
      $("#submitButton").click(function() {
          tableau.connectionName = "Covid19"; // This will be the data source name in Tableau
          tableau.submit(); // This sends the connector object to Tableau
      });
  });
})();

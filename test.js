(function() {
    // Create the connector object

   var myConnector = tableau.makeConnector();

    // Define the schema
   myConnector.getSchema = function(schemaCallback) {
      var cols = [{
          id: "dataRep",
          alias:"Data",
          dataType: tableau.dataTypeEnum.date
      }, ];
      var tableSchema = {
          id: "covid19",
          alias: "covid19",
          columns: cols
      };

      schemaCallback([tableSchema]);
  };



   $.getJSON("https://opendata.ecdc.europa.eu/covid19/casedistribution/json/", function(data) {
      //var list = data.json(),       // what method to call? .feature .ts .list..
   var  tableData = {};
      console.log(data)
}
);



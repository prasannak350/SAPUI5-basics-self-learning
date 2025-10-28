sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/ui/core/Fragment"
],
function (Controller, Fragment) {
    "use strict";

    return Controller.extend("sap.com.jsonmodeltablebinding.controller.View1", {
        onInit: function () {
           // trying to bind the data for the second table cells using bind aggregation methond in controller
           var oData = {
                people:[
                    {name: "pp", age:"25"},
                    {name: "whduwgd", age:"45"},
                    {name: "tyeehwef", age:"72"}
                ]
           };
           var oModel = new sap.ui.model.json.JSONModel(oData);
           this.getView().setModel(oModel);

           var oTable = this.getView().byId("newTable");
           var aFilterArray =[];
           var oFilter1 = new sap.ui.model.Filter({
            path:"age",
            value1:"25",
            operator: sap.ui.model.FilterOperator.EQ
           });
           aFilterArray.push(oFilter1);
           var oFilter2 = new sap.ui.model.Filter({
            path:"age",
            value1:"45",
            operator: sap.ui.model.FilterOperator.EQ
           });
           aFilterArray.push(oFilter2);

           var oSorter = new sap.ui.model.Sorter("age", true);
           oTable.bindAggregation("items",{
                path:"/people",
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({text: "{name}"}),
                        new sap.m.Text({text: "{age}"})
                    ]
                }),
                filters: [aFilterArray],
                sorter: [oSorter]
           });
        },

        // Extra 
        // we can also add new properties to the existing json model and read that data in this way
        getJsonModel: function(){
            var oModel = this.getOwnerComponent().getModel("ProductModel");
            oModel.setProperty("/SampleProperty",{Name: "Prasanna", Age: 25, Gender: "Female"});
            // this.getView().setModel(oModel);
            this.getView().setModel(oModel,"DetailsModel");
            if(!this.oDialog){
                this.loadFragment({
                    name:"sap.com.jsonmodeltablebinding.fragments.dialog"
                }).then(function(odialog){
                    this.oDialog = odialog;
                    this.oDialog.open();
                }.bind(this))
            }else{
                this.oDialog.open(); 
            }
        },

        handleCloseDialog: function(){
            this.oDialog.close();
        },

        onLiveSearchTableData: function(oEvent){
            var sValue= oEvent.getParameter("newValue");
            var aFilter=[];
            if(sValue){
                aFilter.push(new sap.ui.model.Filter({
                    path:"SupplierName",
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1:sValue
                }));
                aFilter.push(new sap.ui.model.Filter({
                    path:"ProductName",
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1:sValue
                }));
                var oFinalFilter = new sap.ui.model.Filter({
                    filters: aFilter
                });
                this.getView().byId("idTable").getBinding("items").filter(oFinalFilter);
            }
            // If we don't add else condition then when we clear the data in the search field then the table data will not be refreshed 
            else{
                this.getView().byId("idTable").getBinding("items").filter();
            }
        }
    });
});

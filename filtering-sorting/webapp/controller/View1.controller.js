sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/FilterOperator"
],
function (Controller,MessageBox,FilterOperator) {
    "use strict";

    return Controller.extend("sap.com.filteringsorting.controller.View1", {
        onInit: function () {
            this.onReadDataFromProduct();
        },
        onReadDataFromProduct: function(){
            var oDataModel = this.getOwnerComponent().getModel();
            var oFilter = new sap.ui.model.Filter({
                path: "ProductID",
                operator: sap.ui.model.FilterOperator.EQ,
                value1:1
            });
            var oSorters = new sap.ui.model.Sorter("ProductID", true);
            oDataModel.read("/Products",{
                filters:[oFilter],
                // sorters: [oSorters],
                urlParameters:{
                    "$expand": "Category,Supplier"
                },
                success: function(oresponse){
                    var oModel = new sap.ui.model.json.JSONModel();
                    oModel.setProperty("/Products", oresponse.results);
                    this.getView().setModel(oModel, "oProductJsonModel");
                }.bind(this),
                error:function(oerror){
                    MessageBox.error(JSON.parse(oerror.responseText).error.message.value);
                }.bind(this)
            })
        },


        // to read a single record 
        // onReadDataFromProduct: function(){
        //     var oDataModel = this.getOwnerComponent().getModel();
        //     var sProdId = 10;
        //     oDataModel.read("/Products("+ sProdId +")",{
        //         urlParameters:{
        //             "$expand": "Category,Supplier"
        //         },
        //         success: function(oresponse){
        //             var oModel = new sap.ui.model.json.JSONModel();
        //             oModel.setProperty("/Products", [oresponse]);
        //             this.getView().setModel(oModel, "oProductJsonModel");
        //         }.bind(this),
        //         error:function(oerror){
        //             MessageBox.error(JSON.parse(oerror.responseText).error.message.value);
        //         }.bind(this)
        //     })
        // },



        // to pass more than one filter
        // onReadDataFromProduct: function(){
        //     var oDataModel = this.getOwnerComponent().getModel();
        //     var Filters =[];
        //     Filters.push(new sap.ui.model.Filter("ProductID", FilterOperator.EQ, 1));
        //     Filters.push(new sap.ui.model.Filter("ProductID", FilterOperator.EQ, 2));
        //     Filters.push(new sap.ui.model.Filter("ProductID", FilterOperator.EQ, 3));
        //     Filters.push(new sap.ui.model.Filter("ProductID", FilterOperator.EQ, 4));
        //     var oSorters = new sap.ui.model.Sorter("ProductID", true);
        //     oDataModel.read("/Products",{
        //         filters:[Filters],
        //         // sorters: [oSorters],
        //         urlParameters:{
        //             "$expand": "Category,Supplier"
        //         },
        //         success: function(oresponse){
        //             var oModel = new sap.ui.model.json.JSONModel();
        //             oModel.setProperty("/Products", oresponse.results);
        //             this.getView().setModel(oModel, "oProductJsonModel");
        //         }.bind(this),
        //         error:function(oerror){
        //             MessageBox.error(JSON.parse(oerror.responseText).error.message.value);
        //         }.bind(this)
        //     })
        // }
    });
});

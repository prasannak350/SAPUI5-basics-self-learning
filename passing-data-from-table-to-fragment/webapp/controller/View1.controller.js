sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
function (Controller,MessageBox) {
    "use strict";

    return Controller.extend("sap.com.passingdatafromtabletofragment.controller.View1", {
        onInit: function () {
            this.onReadDataFromProduct();
        },

        onReadDataFromProduct: function(){
            var oDataModel = this.getOwnerComponent().getModel();
            oDataModel.read("/Products",{
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

        onRowClick: function(oEvent){
            var oPath = oEvent.getSource().getBindingContext("oProductJsonModel").getPath();
            if(!this.oDialog){
                this.loadFragment({
                    name:"sap.com.passingdatafromtabletofragment.fragments.dialog"
                }).then(function(odialog){
                    this.oDialog = odialog;
                    this.oDialog.open();
                    this.oDialog.bindElement({
                        path: oPath,
                        model: "oProductJsonModel"
                    });
                }.bind(this))
            }else{
                this.oDialog.open(); 
                this.oDialog.bindElement({
                    path: oPath,
                    model: "oProductJsonModel"
                });
            }
        },

        handleCloseDialog: function(){
            this.oDialog.close();
        }
    });
});

sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("sap.com.tablebindingodata.controller.View1", {
        onInit: function () {
            this.onReadEmpData();
        },
        onReadEmpData: function(){
            var oModel = this.getOwnerComponent().getModel();
            var oJSONModel = new sap.ui.model.json.JSONModel;
            var oBusyDialog = new sap.m.BusyDialog({
                title:"Loading Data",
                text:"Please wait......."
            });
            oBusyDialog.open();
            oModel.read("/Employees",{
                success:function(response){
                    oBusyDialog.close();
                    oJSONModel.setData(response.results);
                    this.getView().setModel(oJSONModel,"EmployeeDataModel");
                }.bind(this),
                error:function(error){
                    oBusyDialog.close();
                }
            })
        }
    });
});

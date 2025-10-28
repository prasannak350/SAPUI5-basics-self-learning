sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("sap.com.smartcontrols.controller.DetailPage", {
        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("DetailPage").attachPatternMatched(this.objectMatched, this);
        },
        objectMatched:function(oEvent){
            this.EmployeeID = oEvent.getParameter('arguments').EmployeeID;
            this.getView().bindElement("/Employees(" + this.EmployeeID +")");
        },
        onNavPress: function(){
            this.getOwnerComponent().getRouter().navTo("RouteMainPage");
        }
    });
});
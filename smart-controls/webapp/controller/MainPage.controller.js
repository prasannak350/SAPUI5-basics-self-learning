sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("sap.com.smartcontrols.controller.MainPage", {
        onInit: function () {

        },
        onRowPress: function(){
            var oTable= this.getView().byId("oTable");
            var EmpId = oTable.getSelectedItem().getBindingContext().getProperty("EmployeeID");
            this.getOwnerComponent().getRouter().navTo("DetailPage", {
                EmployeeID:EmpId
            });
        }
    });
});

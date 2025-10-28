sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("sap.com.dynamicparametersinresourcemodel.controller.View1", {
        onInit: function () {
            var sPONum = "900745";
            var sMsg = "First record saved successfully"
            var ResourceModelText = this.getOwnerComponent().getModel('i18n').getResourceBundle().getText("msg",[sPONum,sMsg]);
            var jsonModel = new sap.ui.model.json.JSONModel();
            jsonModel.setData(ResourceModelText);
            this.getView().setModel(jsonModel,"POData");
        },
        handleSave: function(){
            var sPONum = "900745";
            var sMsg = "First record saved successfully"
            var oResourceBundle = this.getOwnerComponent().getModel('i18n');
            var message= oResourceBundle.getResourceBundle().getText("msg",[sPONum,sMsg]);
            sap.m.MessageToast.show(message);
        }
    });
});

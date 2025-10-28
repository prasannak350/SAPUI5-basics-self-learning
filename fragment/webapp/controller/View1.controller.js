sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
function (Controller, Fragment) {
    "use strict";

    return Controller.extend("sap.com.fragment.controller.View1", {
        onInit: function () {

        },
        onOpenDialog: function(){
            var oView = this.getView();
            if(!this.byId('dialogId')){
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.com.fragment.fragment.dialog",
                    controller: this
                }).then(function(oDialog){
                    oView.addDependent(oDialog);    // to add the dialog to the view
                    oDialog.open();
                });
            }
            else{
                this.byId('dialogId').open();
            }
        },
        onCloseDialog: function(){
            this.byId('dialogId').close();
        }
    });
});

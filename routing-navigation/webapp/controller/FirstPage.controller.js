sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("sap.com.routingnavigation.controller.FirstPage", {
        onInit: function () {

        },
        handleNavigation: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("SecondPage", {
                name:"Suresh"       //passing the value to second page
            });
        }
    });
});

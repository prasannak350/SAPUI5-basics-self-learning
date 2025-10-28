sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("sap.com.routingnavigation.controller.SecondPage", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("SecondPage").attachPatternMatched(this._onRouteMatched, this);   // this _onRouteMatched function will trigger when the pattern changes in the url
        },

        _onRouteMatched: function(oEvent){
            debugger;
            var data= oEvent.getParameter('arguments').name;
            sap.m.MessageToast.show(data);
        }
    });
});
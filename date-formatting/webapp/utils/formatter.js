sap.ui.define([
    "sap/ui/core/format/DateFormat"
],
function (DateFormat) {
    "use strict";

    return {
        formatDateSale: function(dateOfSale){
            if(dateOfSale){
                var oDateFormat = DateFormat.getDateInstance({
                    patterm: "dd-MMM-YYYY"
                });
                var oDate = new Date(dateOfSale);
                return oDateFormat.format(oDate);
            }
        }
    };
});

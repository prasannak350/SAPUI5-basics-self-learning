sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("sap.com.expressionbinding.controller.View1", {
        onInit: function () {
            var empObject = {
                "Employees": [
                    {
                        "EmpNo": 1,
                        "Name": "Alex",
                        "Gender": "Male",
                        "Country": "US",
                        "Age": 15
                    },
                    {
                        "EmpNo": 2,
                        "Name": "John",
                        "Gender": "Male",
                        "Country": "India",
                        "Age": 25
                    },
                    {
                        "EmpNo": 3,
                        "Name": "Sara",
                        "Gender": "Female",
                        "Country": "Brazil",
                        "Age": 35
                    }
                ]
            };
            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData(empObject);
            this.getView().setModel(oModel, "EmployeeModel");
        }
    });
});

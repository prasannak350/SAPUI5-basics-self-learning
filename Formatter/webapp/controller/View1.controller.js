sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/com/Formatter/model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter) {
        "use strict";

        return Controller.extend("sap.com.Formatter.controller.View1", {
            formatter: formatter,
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

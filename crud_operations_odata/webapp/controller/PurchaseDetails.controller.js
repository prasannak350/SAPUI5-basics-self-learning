sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library"
],
    function (Controller, MessageBox, Export, ExportTypeCSV, Spreadsheet, exportLibrary) {
        "use strict";
        var EdmType = exportLibrary.EdmType;
        return Controller.extend("com.sap.crudoperationsodata.controller.PurchaseDetails", {
            onInit: function () {
                this.onReadData();
            },

            onReadData: function () {
                var oDataModel = this.getOwnerComponent().getModel();
                var oJsonModel = new sap.ui.model.json.JSONModel();
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "loading data",
                    text: "please wait..."
                });
                var oFilters = new sap.ui.model.Filter({
                    path: "OrderID",
                    operator: "BT",
                    value1: "10250",
                    value2: "10263"
                });
                oBusyDialog.open();
                oDataModel.read('/Orders', {
                    filters: [oFilters],
                    urlParameters: {
                        // '$skip': 0,
                        // '$top': 5,
                        '$expand': "Customer, Employee"
                    },
                    success: function (oresponse) {
                        oJsonModel.setProperty("/OrdersData", oresponse.results);
                        this.getView().setModel(oJsonModel, "OrdersDataModel");
                        oBusyDialog.close();
                    }.bind(this),
                    error: function (oerror) {
                        oBusyDialog.close();
                    }.bind(this)
                });
            },

            onDeleteRecord: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext("OrdersDataModel").getObject();
                MessageBox.confirm("Are you sure you want to delete this record?", {
                    title: "Confrim",
                    onClose: function (sAction) {
                        if (sAction === "OK") {
                            this.onDeleteSpecificRecord(oContext);
                        }
                    }.bind(this),
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    emphasizedAction: sap.m.MessageBox.Action.OK
                });
            },

            onDeleteSpecificRecord: function (oRecord) {
                var oDataModel = this.getOwnerComponent().getModel();
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Deleting Record",
                    text: "please wait..."
                });
                oBusyDialog.open();
                oDataModel.remove("/Orders(" + oRecord.OrderID + ")", {
                    success: function (oresponse) {
                        oBusyDialog.close();
                        this.onReadData();
                        MessageBox.success("Deleted data");

                    }.bind(this),
                    error: function (oerror) {
                        oBusyDialog.close();
                        MessageBox.error("Deletion failed");
                    }.bind(this)
                });
            },

            onUpdateRecord: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext("OrdersDataModel").getObject();
                // var oPayload = {
                //     "OrderID": oContext.OrderID,
                //     "ShipName": oContext.ShipName,
                //     "ShipAddress": oContext.ShipAddress,
                //     "ShipRegion": oContext.ShipRegion,
                //     "OrderDate": oContext.OrderDate
                // };
                this.getView().setModel(new sap.ui.model.json.JSONModel({
                    "Payload": oContext
                }), "PayloadModel");
                if (!this.oDialog) {
                    this.loadFragment({
                        name: "com.sap.crudoperationsodata.fragments.UpdateDialog"
                    }).then(function (oDialog) {
                        this.oDialog = oDialog;
                        this.oDialog.open();
                    }.bind(this));
                }
                else {
                    this.oDialog.open();
                }
            },

            onSaveRecord: function () {
                var oDataModel = this.getOwnerComponent().getModel();
                var oRecord = this.getView().getModel("PayloadModel").getProperty("/Payload");
                // delete oRecord.Customer, oRecord.Employee, oRecord.Order_Details, oRecord.Shipper; // delete Navigation property from oject
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Updating Record",
                    text: "please wait..."
                });
                oBusyDialog.open();
                oDataModel.update("/Orders(" + oRecord.OrderID + ")", oRecord, {
                    success: function (oresponse) {
                        oBusyDialog.close();
                        this.oDialog.close();
                        this.onReadData();
                        MessageBox.success("Successfully Updated");

                    }.bind(this),
                    error: function (oerror) {
                        oBusyDialog.close();
                        MessageBox.error("Error while updating the data");
                    }.bind(this)
                });
            },

            onCancelRecord: function () {
                this.oDialog.close();
            },

            onAddNewRecord: function () {
                var oDataModel = this.getOwnerComponent().getModel();
                var oRecord = {
                    "OrderID": 10025,
                    "ShipName": "xyz",
                    "ShipAddress": "abc",
                    "ShipRegion": "RJ",
                    "OrderDate": "Mon Jul 08 1996 05:30:00 GMT+0530 (India Standard Time)"
                };
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Creating Record",
                    text: "please wait..."
                });
                oBusyDialog.open();
                oDataModel.create("/Orders", oRecord, {
                    success: function (oresponse) {
                        oBusyDialog.close();
                        this.onReadData();
                        MessageBox.success("Successfully created a new record");

                    }.bind(this),
                    error: function (oerror) {
                        oBusyDialog.close();
                        MessageBox.error("Error while creating the record");
                    }.bind(this)
                });
            },



            // EXTRA
            // downloading the table data in csv format 

            // onDataExport: function (oEvent) {

            //     var oExport = new Export({

            //         // Type that will be used to generate the content. Own ExportType's can be created to support other formats
            //         exportType: new ExportTypeCSV({
            //             separatorChar: ";"
            //         }),

            //         // Pass in the model created above
            //         models: this.getView().getModel("OrdersDataModel"),

            //         // binding information for the rows aggregation
            //         rows: {
            //             path: "/OrdersData"
            //         },

            //         // column definitions with column name and binding info for the content

            //         columns: [{
            //             name: "Order ID",
            //             template: {
            //                 content: "{OrderID}"
            //             }
            //         }, {
            //             name: "Ship Name",
            //             template: {
            //                 content: "{ShipName}"
            //             }
            //         }, {
            //             name: "Ship Address",
            //             template: {
            //                 content: "{ShipAddress}"
            //             }
            //         }, {
            //             name: "Ship Region",
            //             template: {
            //                 content: "{ShipRegion}"
            //             }
            //         }, {
            //             name: "Order Date",
            //             template: {
            //                 content: "{OrderDate}"
            //             }
            //         }]
            //     });

                // download exported file
                // oExport.saveFile().catch(function (oError) {
                //     MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
                // }).then(function () {
                //     oExport.destroy();
                // });
            // },


            // downloading the table data in excel sheet format 

            createColumnConfig: function() {
                var aCols = [];
    
                aCols.push({
                    label: 'Order ID',
                    property: 'OrderID',
                    type: EdmType.Int32,
                });
    
                aCols.push({
                    label: 'Ship Name',
                    type: EdmType.String,
                    property: 'ShipName',
                    scale: 0
                });

                aCols.push({
                    label: 'Ship Address',
                    type: EdmType.String,
                    property: 'ShipAddress',
                    scale: 0
                });

                aCols.push({
                    label: 'Ship Region',
                    type: EdmType.String,
                    property: 'ShipRegion',
                    scale: 0
                });

                aCols.push({
                    label: 'Order Date',
                    type: EdmType.DateTimeOffset,
                    property: 'OrderDate',
                    scale: 0
                });

                return aCols;
            },


            // onDataExport: function() {
            //     var aCols, oRowBinding, oSettings, oSheet, oTable;
    
            //     if (!this._oTable) {
            //         this._oTable = this.byId('idExportTable');
            //     }
    
            //     oTable = this._oTable;
            //     oRowBinding = oTable.getBinding('items');
            //     aCols = this.createColumnConfig();
    
            //     oSettings = {
            //         workbook: {
            //             columns: aCols,
            //             hierarchyLevel: 'Level'
            //         },
            //         dataSource: oRowBinding,
            //         fileName: 'Table export sample.xlsx',
            //         worker: false // We need to disable worker because we are using a MockServer as OData Service
            //     };
    
            //     oSheet = new Spreadsheet(oSettings);
            //     oSheet.build().finally(function() {
            //         oSheet.destroy();
            //     });
            // },


            // downloading the table data in excel sheet format- another method

            // onDataExport:function(oEvent) {
            //     var oTable = this.byId("idExportTable");
            //     var oModel = oTable.getModel("OrdersDataModel");
            //     var aData = oModel.getProperty("/OrdersData");
            //     var aExportData = aData.map(function (item) {
            //         return {
            //             "Order ID": item.OrderID,
            //             "Ship Name": item.ShipName,
            //             "Ship Address": item.ShipAddress,
            //             "Ship Region": item.ShipRegion,
            //             "Order Date": item.OrderDate
            //         };
            //     });
            //     var wb = XLSX.utils.book_new();
            //     var ws = XLSX.utils.json_to_sheet(aExportData);
            //     XLSX.utils.book_append_sheet(wb, ws, "DataSyncExport");
            //     XLSX.writeFile(wb, "DataSyncExport.xlsx");
            // },



            // to append more than one sheets to the excel
            onDataExport:function(oEvent) {
                var oTable = this.byId("idExportTable");
                var oModel = oTable.getModel("OrdersDataModel");
                var aData = oModel.getProperty("/OrdersData");
                var aExportData = aData.map(function (item) {
                    return {
                        "Order ID": item.OrderID,
                        "Ship Name": item.ShipName,
                        "Ship Address": item.ShipAddress
                    };
                });
                var aExportData2 = aData.map(function (item) {
                    return {
                        "Ship Region": item.ShipRegion,
                        "Order Date": item.OrderDate
                    };
                });
                var wb = XLSX.utils.book_new();
                var ws = XLSX.utils.json_to_sheet(aExportData);
                XLSX.utils.book_append_sheet(wb, ws, "DataSyncExport");

                var ws2 = XLSX.utils.json_to_sheet(aExportData2);
                XLSX.utils.book_append_sheet(wb, ws2, "DataSyncExport2");

                XLSX.writeFile(wb, "TableExport.xlsx");
            }
        });
    });

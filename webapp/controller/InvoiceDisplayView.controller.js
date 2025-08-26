sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/m/MessagePopover",
  "sap/m/MessageItem",
  "sap/ui/core/library",
  "sap/ui/core/UIComponent",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/core/util/Export",
  "sap/ui/core/util/ExportTypeCSV",
  "sap/ui/model/Sorter"
], function (Controller, JSONModel, MessageToast, MessageBox, MessagePopover, MessageItem, coreLibrary, UIComponent, Filter, FilterOperator, Export, ExportTypeCSV, Sorter) {
  "use strict";

  // Shortcut for sap.ui.core.MessageType
  var MessageType = coreLibrary.MessageType;

  /**
   * @name converted.invoicedisplayview.controller.InvoiceDisplayView
   * @class Controller for the Invoice Display view.
   * @extends sap.ui.core.mvc.Controller
   */
  return Controller.extend("converted.invoicedisplayview.controller.InvoiceDisplayView", {
    /**
     * Initializes the view.
     * @public
     */
    onInit: function () {
      // Load invoice header data from mock data
      var oInvoiceHeaderModel = new JSONModel({
        invoiceType: "F2",
        invoiceNumber: "90005190",
        payerId: "1002",
        payerDetails: "Omega Soft-Hardware Markt / Gustav-Jung-Strasse 425 / ...",
        billingDate: "28.01.1997",
        netValue: "19991.00",
        currency: "DEM"
      });
      this.getView().setModel(oInvoiceHeaderModel, "invoiceHeader");

      // Load invoice items data from mock data. Added sample data to avoid "No data" message.
      var oInvoiceItemsModel = new JSONModel({
        invoiceItems: [
          {
            itemSelected: false,
            itemNumber: "10",
            description: "Flatscreen LE 50 P",
            billedQuantity: "4",
            unit: "PC",
            netValue: "3240.00",
            materialId: "M-05",
            taxAmount: "486.00"
          },
          {
            itemSelected: false,
            itemNumber: "20",
            description: "Flatscreen MS 1460 P",
            billedQuantity: "3",
            unit: "PC",
            netValue: "4497.00",
            materialId: "M-06",
            taxAmount: "674.55"
          },
          {
            itemSelected: false,
            itemNumber: "30",
            description: "Flatscreen LE 64P",
            billedQuantity: "5",
            unit: "PC",
            netValue: "6110.00",
            materialId: "M-07",
            taxAmount: "916.50"
          },
          {
            itemSelected: false,
            itemNumber: "40",
            description: "Flatscreen MS 1575P",
            billedQuantity: "3",
            unit: "PC",
            netValue: "6144.00",
            materialId: "M-08",
            taxAmount: "921.60"
          }
        ]
      });
      this.getView().setModel(oInvoiceItemsModel, "invoiceItems");

      // Load customer data from mock data
      var oCustomerModel = new JSONModel();
      oCustomerModel.loadData("model/mockData/customers.json");
      this.getView().setModel(oCustomerModel, "customers");

      // Load product data from mock data
      var oProductModel = new JSONModel();
      oProductModel.loadData("model/mockData/products.json");
      this.getView().setModel(oProductModel, "products");

      // Initialize message model for MessageArea/MessagePopover
      var oMessageModel = new JSONModel({
        messages: [
          {
            type: MessageType.Information,
            title: "System Information",
            description: "Application converted successfully. Use AI optimize for better result.",
            subtitle: "Conversion complete",
            counter: 1
          }
        ]
      });
      this.getView().setModel(oMessageModel, "messages");

      // Set initial filter and sort settings
      this._mViewSettingsDialogs = {};

      // Converted from WebDynpro: 2025-08-26T07:02:15.527Z
    },

    /**
     * Called before the view is rendered.
     * @public
     */
    onBeforeRendering: function () {
      // Prepare data before rendering
    },

    /**
     * Called after the view has been rendered.
     * @public
     */
    onAfterRendering: function () {
      // Adjust UI after rendering
    },

    /**
     * Navigates back in the browser history.
     * @public
     */
    onActionBack: function () {
      history.go(-1);
    },

    /**
     * Adds the current item to favorites.
     * @public
     */
    onActionAddFavorite: function () {
      MessageToast.show("Added to favorites");
    },

    /**
     * Shares the current item.
     * @public
     */
    onActionShare: function () {
      MessageToast.show("Shared");
    },

    /**
     * Opens the settings dialog.
     * @public
     */
    onActionSettings: function () {
      MessageToast.show("Settings opened");
    },

    /**
     * Opens the help dialog.
     * @public
     */
    onActionHelp: function () {
      MessageToast.show("Help opened");
    },

    /**
     * Exits the application.
     * @public
     */
    onActionExit: function () {
      // Close the current window or tab
      window.close();
    },

    /**
     * Checks the invoice.
     * @public
     */
    onActionCheck: function () {
      MessageToast.show("Invoice checked");
    },

    /**
     * Handles the selection of an action from the dropdown.
     * @param {sap.ui.base.Event} oEvent The selection event.
     * @public
     */
    onActionDropdownSelect: function (oEvent) {
      var sKey = oEvent.getParameter("selectedItem").getKey();
      MessageToast.show("Action selected: " + sKey);
    },

    /**
     * Shows the history of the invoice.
     * @public
     */
    onActionHistory: function () {
      MessageToast.show("History shown");
    },

    /**
     * Navigates to the accounting document.
     * @public
     */
    onActionAccounting: function () {
      MessageToast.show("Navigating to accounting document");
    },

    /**
     * Navigates to the billing documents.
     * @public
     */
    onActionBillingDocuments: function () {
      MessageToast.show("Navigating to billing documents");
    },

    /**
     * Cancels the current action.
     * @public
     */
    onActionCancel: function () {
      MessageToast.show("Action cancelled");
    },

    /**
     * Saves the invoice as a new file.
     * @public
     */
    onActionSaveAs: function () {
      MessageToast.show("Invoice saved as");
    },

    /**
     * Moves the item up in the list.
     * @public
     */
    onActionMoveUp: function () {
      MessageToast.show("Item moved up");
    },

    /**
     * Moves the item down in the list.
     * @public
     */
    onActionMoveDown: function () {
      MessageToast.show("Item moved down");
    },

    /**
     * Prints the invoice.
     * @public
     */
    onActionPrint: function () {
      MessageToast.show("Invoice printed");
    },

    /**
     * Shows the payer details.
     * @public
     */
    onActionShowPayerDetails: function () {
      MessageToast.show("Payer details shown");
    },

    /**
     * Deletes selected items from the table.
     * @public
     */
    onActionDeleteItems: function () {
      MessageToast.show("Selected items deleted");
    },

    /**
     * Views the item details.
     * @param {sap.ui.base.Event} oEvent The item press event.
     * @public
     */
    onActionViewItem: function (oEvent) {
      var oItem = oEvent.getSource();
      var oCtx = oItem.getBindingContext("invoiceItems");
      var sPath = oCtx.getPath();
      var oInvoiceItem = oCtx.getModel().getProperty(sPath);
      MessageToast.show("Viewing item details for item number: " + oInvoiceItem.itemNumber);
    },

    /**
     * Views the description details.
     * @param {sap.ui.base.Event} oEvent The description press event.
     * @public
     */
    onActionViewDescription: function (oEvent) {
      var oItem = oEvent.getSource();
      var oCtx = oItem.getBindingContext("invoiceItems");
      var sPath = oCtx.getPath();
      var oInvoiceItem = oCtx.getModel().getProperty(sPath);
      MessageToast.show("Viewing description details for item: " + oInvoiceItem.description);
    },

    /**
     * Views the unit details.
     * @param {sap.ui.base.Event} oEvent The unit press event.
     * @public
     */
    onActionViewUnit: function (oEvent) {
      var oItem = oEvent.getSource();
      var oCtx = oItem.getBindingContext("invoiceItems");
      var sPath = oCtx.getPath();
      var oInvoiceItem = oCtx.getModel().getProperty(sPath);
      MessageToast.show("Viewing unit details for unit: " + oInvoiceItem.unit);
    },

    /**
     * Filters the table data.
     * @public
     */
    onActionFilter: function () {
      this.createViewSettingsDialog("converted.invoicedisplayview.view.FilterDialog").open();
    },

    /**
     * Changes the table layout.
     * @public
     */
    onActionChangeLayout: function () {
      MessageToast.show("Changing table layout");
    },

    /**
     * Opens the table settings dialog.
     * @public
     */
    onActionTableSettings: function () {
      MessageToast.show("Opening table settings");
    },

    /**
     * Exports the table data to Excel.
     * @public
     */
    onActionExportToExcel: function () {
      var oTable = this.byId("billingItemsTable");
      var oExport = new Export({
        exportType: new ExportTypeCSV({
          fileExtension: "xlsx",
          mimeType: "application/vnd.ms-excel"
        }),
        models: this.getView().getModel("invoiceItems"),
        rows: {
          path: "/invoiceItems" // Correct path here
        },
        columns: this._getExportColumns()
      });
      oExport.saveFile("Invoice_Items").catch(function (oError) {
        MessageBox.error("Error generating Excel: " + oError);
      }).then(function () {
        oExport.destroy();
      });
    },

    /**
     * Defines the columns for the export.
     * @private
     * @returns {Array} An array of column definitions.
     */
    _getExportColumns: function () {
      return [
        {
          name: "Item",
          template: {
            content: "{invoiceItems>itemNumber}"
          }
        },
        {
          name: "Description",
          template: {
            content: "{invoiceItems>description}"
          }
        },
        {
          name: "Billed Quantity",
          template: {
            content: "{invoiceItems>billedQuantity}"
          }
        },
        {
          name: "SU",
          template: {
            content: "{invoiceItems>unit}"
          }
        },
        {
          name: "Net Value",
          template: {
            content: "{invoiceItems>netValue}"
          }
        },
        {
          name: "Material",
          template: {
            content: "{invoiceItems>materialId}"
          }
        },
        {
          name: "Tax Amount",
          template: {
            content: "{invoiceItems>taxAmount}"
          }
        }
      ];
    },

    /**
     * Handles the search event.
     * @param {sap.ui.base.Event} oEvent The search event.
     * @public
     */
    onSearch: function (oEvent) {
      var sQuery = oEvent.getParameter("newValue") || oEvent.getParameter("query");
      var aFilters = [];

      if (sQuery) {
        aFilters.push(new Filter({
          filters: [
            new Filter("itemNumber", FilterOperator.Contains, sQuery),
            new Filter("description", FilterOperator.Contains, sQuery),
            new Filter("materialId", FilterOperator.Contains, sQuery)
          ],
          and: false
        }));
      }

      var oTable = this.byId("billingItemsTable");
      var oBinding = oTable.getBinding("items");
      oBinding.filter(aFilters);
    },

    /**
     * Opens the ViewSettingsDialog for sorting and filtering.
     * @param {string} sDialogFragmentName The name of the dialog fragment.
     * @returns {sap.ui.xmlfragment} The ViewSettingsDialog.
     * @public
     */
    createViewSettingsDialog: function (sDialogFragmentName) {
      var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];

      if (!oDialog) {
        oDialog = sap.ui.xmlfragment(sDialogFragmentName, this);
        this._mViewSettingsDialogs[sDialogFragmentName] = oDialog;

        if (sap.ui.Device.system.desktop) {
          oDialog.addStyleClass("sapUiSizeCompact");
        }
      }
      return oDialog;
    },

    /**
     * Handles the confirm event of the filter dialog.
     * @param {sap.ui.base.Event} oEvent The confirm event.
     * @public
     */
    onConfirmFilter: function (oEvent) {
      var aFilterItems = oEvent.getParameter("filterItems");
      var aFilters = [];

      aFilterItems.forEach(function (oItem) {
        var sPath = oItem.getKey();
        var sValue = oItem.getText();
        aFilters.push(new Filter(sPath, FilterOperator.EQ, sValue));
      });

      var oTable = this.byId("billingItemsTable");
      var oBinding = oTable.getBinding("items");
      oBinding.filter(aFilters);
    },

    /**
     * Opens the sort dialog.
     * @public
     */
    onSortPress: function () {
      this.createViewSettingsDialog("converted.invoicedisplayview.view.SortDialog").open();
    },

    /**
     * Handles the confirm event of the sort dialog.
     * @param {sap.ui.base.Event} oEvent The confirm event.
     * @public
     */
    onConfirmSort: function (oEvent) {
      var sSortPath = oEvent.getParameter("sortItem").getKey();
      var bDescending = oEvent.getParameter("sortDescending");
      var oSorter = new Sorter(sSortPath, bDescending);

      var oTable = this.byId("billingItemsTable");
      var oBinding = oTable.getBinding("items");
      oBinding.sort(oSorter);
    },

    /**
     * Generic event handler for value help requests.
     * @param {sap.ui.base.Event} oEvent The event object.
     * @public
     */
    handleValueHelp: function (oEvent) {
      var oSource = oEvent.getSource();

      // Create value help dialog if it doesn't exist
      if (!this._valueHelpDialog) {
        this._valueHelpDialog = new sap.m.SelectDialog({
          title: "Select Value",
          confirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
              oSource.setValue(oSelectedItem.getTitle());
            }
          },
          cancel: function () {
            this.close();
          }
        });

        // Sample items - would be filled with actual data in a real app
        var oDialogModel = new JSONModel({
          items: [
            {
              title: "Item 1",
              description: "Description 1"
            },
            {
              title: "Item 2",
              description: "Description 2"
            },
            {
              title: "Item 3",
              description: "Description 3"
            }
          ]
        });

        this._valueHelpDialog.setModel(oDialogModel);
        this._valueHelpDialog.bindAggregation("items", {
          path: "/items",
          template: new sap.m.StandardListItem({
            title: "{title}",
            description: "{description}"
          })
        });
      }

      // Open the dialog
      this._valueHelpDialog.open();
    },

    /**
     * Generic event handler for file download requests.
     * @param {sap.ui.base.Event} oEvent The event object.
     * @public
     */
    onFileDownload: function (oEvent) {
      MessageToast.show("File download initiated");
    },

    /**
     * Opens the message popover.
     * @param {sap.ui.base.Event} oEvent The event object.
     * @public
     */
    handleMessagePopoverPress: function (oEvent) {
      if (!this._messagePopover) {
        this._messagePopover = new MessagePopover({
          items: {
            path: "messages>/messages",
            template: new MessageItem({
              type: "{messages>type}",
              title: "{messages>title}",
              description: "{messages>description}",
              subtitle: "{messages>subtitle}",
              counter: "{messages>counter}"
            })
          }
        });

        this.getView().byId("messagePopoverBtn").addDependent(this._messagePopover);
      }

      this._messagePopover.toggle(oEvent.getSource());
    },

    /**
     * Handles navigation link press events.
     * @param {sap.ui.base.Event} oEvent The event object.
     * @public
     */
    onNavigationLinkPress: function (oEvent) {
      var oSource = oEvent.getSource();
      var sHref = oSource.getHref();

      if (sHref) {
        return;
      }

      var sNavTarget = oSource.data("navTarget");
      if (sNavTarget) {
        MessageToast.show("Navigating to: " + sNavTarget);
      }
    },

    /**
     * Handles office control rendering.
     * @param {sap.ui.base.Event} oEvent The event object.
     * @public
     */
    onOfficeControlRendered: function (oEvent) {
      console.log("Office control container rendered");

      var oSource = oEvent.getSource();
      var sDomRef = oSource.getDomRef();
      if (sDomRef) {
        sDomRef.innerHTML = '<div class="sapUiMediumMargin">' + '<div class="sapUiMediumMarginBottom">' + '<span class="sapUiIcon sapUiIconMirrorInRTL" style="font-family:SAP-icons;color:#0854a0;font-size:2.5rem">&#xe0ef;</span>' + '</div>' + '<div class="sapMText">' + '<p>Office document integration would be configured here.</p>' + '<p>In SAPUI5, this typically uses OData services with MS Graph API integration.</p>' + '</div>' + '</div>';
      }
    },

    /**
     * Opens a dialog.
     * @param {sap.ui.base.Event} oEvent The event object.
     * @public
     */
    openDialog: function (oEvent) {
      var oSource = oEvent.getSource();
      var sDialogId = oSource.data("dialogId") || "confirmDialog";

      var oDialog = this.getView().byId(sDialogId);
      if (oDialog) {
        oDialog.open();
      } else {
        MessageToast.show("Dialog with ID '" + sDialogId + "' not found");
      }
    },

    /**
     * Closes a dialog.
     * @param {sap.ui.base.Event} oEvent The event object.
     * @public
     */
    closeDialog: function (oEvent) {
      var oDialog = oEvent.getSource().getParent();
      oDialog.close();
    },

    /**
     * Handles the confirmation event of a dialog.
     * @param {sap.ui.base.Event} oEvent The event object.
     * @public
     */
    onDialogConfirm: function (oEvent) {
      MessageToast.show("Dialog confirmed");
      this.closeDialog(oEvent);
    },

    /**
     * Handles the cancellation event of a dialog.
     * @param {sap.ui.base.Event} oEvent The event object.
     * @public
     */
    onDialogCancel: function (oEvent) {
      this.closeDialog(oEvent);
    },

    /**
     * Navigates to the second view.
     * @public
     */
    onNextPress: function () {
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo("second");
    },

    /**
     * Navigates back to the main view.
     * @public
     */
    onBackPress: function () {
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo("main");
    },

    /**
     * Navigates to a specific route.
     * @param {string} sRoute The route to navigate to.
     * @public
     */
    navTo: function (sRoute) {
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo(sRoute);
    }
  });
});


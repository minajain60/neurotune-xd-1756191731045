sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
  "use strict";

  /**
   * @name converted.invoicedisplayview.controller.App
   * @class The main application controller.
   * @extends sap.ui.core.mvc.Controller
   */
  return Controller.extend("converted.invoicedisplayview.controller.App", {
    /**
     * Called when the app controller is initialized.
     * @public
     */
    onInit: function () {
      // Log initialization for debugging purposes
      console.log("App controller initialized");

      // Get the router instance for navigation
      var oRouter = UIComponent.getRouterFor(this);

      // Check if the router is available
      if (oRouter) {
        // Log that the router was found
        console.log("Router found, initializing navigation");

        // Attach error handling for routing
        oRouter.attachBypassed(function (oEvent) {
          // Log when a route is bypassed
          console.log("Route bypassed:", oEvent.getParameter("hash"));
        });

        // Navigate to the main route if no hash is present
        if (!window.location.hash || window.location.hash === "#") {
          // Log that navigation to the main route is occurring
          console.log("No hash found, navigating to main route");

          // Use a timeout to ensure the router is fully initialized
          setTimeout(function () {
            oRouter.navTo("main"); // Navigate to the 'main' route
          }, 100);
        }
      } else {
        // Log an error if the router is not found
        console.error("Router not found in App controller");
      }
    }
  });
});

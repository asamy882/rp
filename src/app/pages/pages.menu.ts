export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'prePurchaseOrder',
        data: {
          menu: {
            title: 'Pre-Purchase Order',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'prePurchaseOrder',
            data: {
              menu: {
                title: 'Add Pre-Purchase Order',
              }
            }
          },
          {
            path: 'searchPrePurchaseOrder',
            data: {
              menu: {
                title: 'Search Pre-Purchase Order',
              }
            }
          }
        ]
      }
      ,
      {
        path: 'purchaseOrder',
        data: {
          menu: {
            title: 'Purchase Order',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'purchaseOrder',
            data: {
              menu: {
                title: 'Add Purchase Order',
              }
            }
          },
          {
            path: 'searchPurchaseOrder',
            data: {
              menu: {
                title: 'Search Purchase Order',
              }
            }
          }
        ]
      },
      {
        path: 'commercialInvoice',
        data: {
          menu: {
            title: 'Commercial Invoice',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'commercialInvoice',
            data: {
              menu: {
                title: 'Add Commercial Invoice',
              }
            }
          },
          {
            path: 'searchCommercialInvoice',
            data: {
              menu: {
                title: 'Search Commercial Invoice',
              }
            }
          }
        ]
      },
      {
        path: 'shipment',
        data: {
          menu: {
            title: 'Shipment',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'shipment',
            data: {
              menu: {
                title: 'Add Shipment',
              }
            }
          },
          {
            path: 'searchShipment',
            data: {
              menu: {
                title: 'Search Shipment',
              }
            }
          }
        ]
      },
      {
        path: 'costing',
        data: {
          menu: {
            title: 'Costing',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'costing',
            data: {
              menu: {
                title: 'Add Costing',
              }
            }
          },
          {
            path: 'searchCosting',
            data: {
              menu: {
                title: 'Search Costing',
              }
            }
          }
        ]
      },
      {
        path: 'pricing',
        data: {
          menu: {
            title: 'Pricing',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'pricing',
            data: {
              menu: {
                title: 'Add Pricing',
              }
            }
          },
          {
            path: 'searchPricing',
            data: {
              menu: {
                title: 'Search Pricing',
              }
            }
          }
        ]
      }
      ,
      {

        data: {
          menu: {
            title: 'LookUps',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'vendors',
            data: {
              menu: {
                title: 'Vendors',
                icon: 'ion-edit',
                selected: false,
                expanded: false,
                order: 100,
              }
            }
          },
          {
            path: 'suppliers',
            data: {
              menu: {
                title: 'Supplier',
                icon: 'ion-edit',
                selected: false,
                expanded: false,
                order: 100,
              }
            },
          }
          ,
          {
            path: 'shipper',
            data: {
              menu: {
                title: 'Shippers',
                icon: 'ion-edit',
                selected: false,
                expanded: false,
                order: 100,
              }
            }
          }, {
            path: 'forwarder',
            data: {
              menu: {
                title: 'Forwarder',
                icon: 'ion-edit',
                selected: false,
                expanded: false,
                order: 100,
              }
            }
          }, {
            path: 'clearances',
            data: {
              menu: {
                title: 'Clearances',
                icon: 'ion-edit',
                selected: false,
                expanded: false,
                order: 100,
              }
            }
          },
          {
            path: 'paymentTerms',
            data: {
              menu: {
                title: 'Payment Terms',
                icon: 'ion-edit',
                selected: false,
                expanded: false,
                order: 100,
              }
            }
          }
        ]
      }
    ]
  }];

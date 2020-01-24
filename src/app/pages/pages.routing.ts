import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'pages/transactions',
    component: Pages,
    children: [
      { path: 'prePurchaseOrder', loadChildren: './PrePurchaseOrder/prePurchaseOrder.module#PrePurchaseOrderModule' },
      { path: 'purchaseOrder', loadChildren: './PurchaseOrder/purchaseOrder.module#PurchaseOrderModule' },
      { path: 'commercialInvoice', loadChildren: './CommercialInvoice/commercialInvoice.module#CommercialInvoiceModule' },
      { path: 'shipment', loadChildren: './Shipment/shipment.module#ShipmentModule' },
      { path: 'costing', loadChildren: './Costing/costing.module#CostingModule' },
      { path: 'pricing', loadChildren: './Pricing/pricing.module#PricingModule' }
    ]
  },
  {
    path: 'pages/planning/TrendForecasting',
    component: Pages,
    children: [
      { path: 'SalesCategorySales', loadChildren: './NewSalesPlan/new-sales-plan.module#NewSalesPlanModule' },
      { path: 'TrendForecasting', loadChildren: './TrendForecasting/trend.forecasting.module#TrendForecastingModule' },
      { path: 'SalesMonthlySales', loadChildren: './SalesMonths/sales-months.module#SalesMonthsModule' },
      { path: 'SalesAvgDiscount', loadChildren: './AVGDiscounts/avg-discounts.module#AVGDiscountsModule' },
      ]
  },
  {
    path: 'pages/business plan',
    component: Pages,
    children: [
      { path: 'bpPurchaseRequest', loadChildren: './BPPurchaseRequest/BPPurchaseRequest.module#BPPurchaseRequestModule' },
      
      ]
  },
  {
    path: 'pages/planning',
    component: Pages,
    children: [
      { path: 'BusinessPlan', loadChildren: './PurchaseBusinessPlan/purchase-business-plan.module#PurchaseBusinessPlanModule' },
      { path: 'FigureView', loadChildren: './PurchaseBusinessPlan/purchase-business-plan.module#PurchaseBusinessPlanModule' },
      { path: 'SalesPlan', loadChildren: './SalesPlan/sales-plan.module#SalesPlanModule' },
      { path: 'OPEXPlan', loadChildren: './OPEXPlan/opex-plan.module#OPEXPlanModule' }
      ]
  },
  {
    path: 'pages/definitions',
    component: Pages,
    children: [
       { path: 'vendors', loadChildren: './Vendors/vendor.module#VendorsModule' },
       { path: 'seasons', loadChildren: './Seasons/seasons.module#SeasonModule' },
      { path: 'suppliers', loadChildren: './Suppliers/suppliers.module#SuppliersModule' },
      { path: 'shipper', loadChildren: './Shippers/shipper.module#ShippersModule' },
      { path: 'paymentTerms', loadChildren: './PaymentTerms/paymentTerms.module#PaymentTermsModule' },
      { path: 'forwarder', loadChildren: './Forwarders/forwarder.module#ForwarderModule' },
      { path: 'clearances', loadChildren: './Clearances/clearances.module#ClearanceModule' },
      { path: 'ManageStyleNumber', loadChildren: './Styles/styles.module#StylesModule' }
    ]
  },
  {
    path: 'pages/reports',
    component: Pages,
    children: [
      { path: 'PreOrderReport', loadChildren: './PrePurchaseOrder/prePurchaseOrder.module#PrePurchaseOrderModule' },
      { path: 'OrderReport', loadChildren: './PurchaseOrder/purchaseOrder.module#PurchaseOrderModule' },
      { path: 'InvoiceItems', loadChildren: './CommercialInvoice/commercialInvoice.module#CommercialInvoiceModule' },
      { path: 'Shippments', loadChildren: './Shipment/shipment.module#ShipmentModule' },
      { path: 'ShipmentExpenses', loadChildren: './Shipment/shipment-expenses-report/shipment-expenses-report.module#ShipmentExpensesReportModule' },
      { path: 'ShipmentInvoices', loadChildren: './Shipment/shipment-invoices-report/shipment-invoices-report.module#ShipmentInvoicesReportModule' },
      { path: 'Tracker', loadChildren: './CommercialInvoice/tracker-report/tracker.module#TrackerModule' },
      { path: 'pricing', loadChildren: './Pricing/pricing.module#PricingModule' },
      { path: 'MovingReport', loadChildren: './MovingReports/moving.report.module#MovingReportModule' },


    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

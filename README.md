# Project Structure

```bash
.
├── components
│   ├── AddItem.tsx [xdumyc00]
│   ├── CategoryGrid.tsx [xdumyc00]
│   ├── CreateOrder.tsx
│   ├── Details.tsx
│   ├── FilterDropdown.tsx [xdumyc00]
│   ├── NewStockButton.tsx [xdumyc00]
│   ├── PortalPopup.tsx
│   ├── ProductAddForm.tsx [xdumyc00]
│   ├── ProductEditForm.tsx [xdumyc00]
│   ├── SearchBar.tsx  [xdumyc00]
│   ├── SelectedItemsList.tsx  [xdumyc00]
│   ├── StockTable.tsx [xdumyc00]
│   ├── StockTableMod.tsx [xdumyc00]
│   ├── analytics_components [xzaple40]
│   │   ├── GraphManager.tsx
│   │   ├── GraphWindow.tsx
│   │   ├── NotesCard.tsx
│   │   ├── StatisticsItem.tsx
│   │   ├── charts
│   │   │   ├── implementations
│   │   │   │   ├── customerTypeChart.ts
│   │   │   │   ├── dailyOrdersChart.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── itemStatsChart.ts
│   │   │   │   └── orderStateChart.ts
│   │   │   ├── registry.ts
│   │   │   └── types.ts
│   │   └── visualizations
│   │       ├── BarChart.tsx
│   │       ├── LineChart.tsx
│   │       └── PieChart.tsx
│   ├── desktop_components
│   │   ├── addOrder.tsx
│   │   ├── dashboard.tsx
│   │   ├── device_add.tsx
│   │   ├── devices.tsx
│   │   ├── devicesGrid.tsx
│   │   ├── filters.tsx
│   │   └── ordersGrid.tsx
│   ├── deviceDetails.tsx
│   └── ui
│       ├── button.tsx
│       ├── checkbox.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── sheet.tsx
│       └── table.tsx
├── hooks
│   ├── useDesktopLogic.ts
│   ├── useDevice.ts
│   ├── useDownload.ts
│   ├── useGraphManager.ts [xzaple40]
│   ├── useGraphWindow.ts [xzaple40]
│   ├── useNotes.ts [xzaple40]
│   └── useOrder.ts
├── lib
│   ├── orderUtils.ts
│   ├── prisma.ts
│   └── utils.ts
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── analytics.tsx [xzaple40]
│   ├── api
│   │   ├── add_item.ts [xdumyc00]
│   │   ├── add_order.ts
│   │   ├── availability_filter.ts [xdumyc00]
│   │   ├── change_device_status.ts
│   │   ├── change_order_status.ts
│   │   ├── create_device.ts
│   │   ├── delete_chart_settings.ts [xzaple40]
│   │   ├── delete_item.ts [xdumyc00]
│   │   ├── delete_note.ts [xzaple40]
│   │   ├── delete_order.ts
│   │   ├── get_categories.ts [xdumyc00]
│   │   ├── get_chart_settings.ts [xzaple40]
│   │   ├── get_devices.ts
│   │   ├── get_items.ts [xdumyc00]
│   │   ├── get_notes.ts [xzaple40]
│   │   ├── get_order.ts 
│   │   ├── savePost.ts
│   │   ├── save_chart_settings.ts [xzaple40]
│   │   ├── save_note.ts [xzaple40]
│   │   ├── update_chart_settings.ts [xzaple40]
│   │   ├── update_item.ts [xdumyc00]
│   │   ├── update_note.ts [xzaple40]
│   │   ├── update_order.ts 
│   │   └── update_quantity.ts [xdumyc00]
│   └── stock
│       ├── [category] 
│       │   └── index.tsx [xdumyc00]
│       └── index.tsx [xdumyc00]
├── styles
│   ├── AddGraph.module.css [xzaple40]
│   ├── AddingChart.module.css [xzaple40]
│   ├── CreateOrder.module.css
│   ├── Desktop.module.css
│   ├── Details.module.css
│   ├── FilterDropdown.module.css [xdumyc00]
│   ├── GraphWindow.module.css [xzaple40]
│   ├── Modal.module.css
│   ├── NewStockButton.module.css [xdumyc00]
│   ├── PortalPopup.module.css
│   ├── SearchBar.module.css [xdumyc00]
│   ├── StockManagement.module.css [xdumyc00]
│   ├── StockTable.module.css
│   ├── analytics.module.css [xzaple40]
│   └── globals.css
└── types.ts

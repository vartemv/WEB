# Project Structure

```bash
.
├── components
│   ├── AddItem.tsx
│   ├── CategoryGrid.tsx
│   ├── CreateOrder.tsx
│   ├── Details.tsx
│   ├── FilterDropdown.tsx
│   ├── NewStockButton.tsx
│   ├── PortalPopup.tsx
│   ├── ProductAddForm.tsx
│   ├── ProductEditForm.tsx
│   ├── SearchBar.tsx
│   ├── SelectedItemsList.tsx
│   ├── StockTable.tsx
│   ├── StockTableMod.tsx
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
│   │   ├── add_item.ts
│   │   ├── add_order.ts
│   │   ├── availability_filter.ts
│   │   ├── change_device_status.ts
│   │   ├── change_order_status.ts
│   │   ├── create_device.ts
│   │   ├── delete_chart_settings.ts [xzaple40]
│   │   ├── delete_item.ts
│   │   ├── delete_note.ts [xzaple40]
│   │   ├── delete_order.ts
│   │   ├── get_categories.ts
│   │   ├── get_chart_settings.ts [xzaple40]
│   │   ├── get_devices.ts
│   │   ├── get_items.ts
│   │   ├── get_notes.ts [xzaple40]
│   │   ├── get_order.ts
│   │   ├── savePost.ts
│   │   ├── save_chart_settings.ts [xzaple40]
│   │   ├── save_note.ts [xzaple40]
│   │   ├── update_chart_settings.ts [xzaple40]
│   │   ├── update_item.ts
│   │   ├── update_note.ts [xzaple40]
│   │   ├── update_order.ts
│   │   └── update_quantity.ts
│   └── stock
│       ├── [category]
│       │   └── index.tsx
│       └── index.tsx
├── styles
│   ├── AddGraph.module.css [xzaple40]
│   ├── AddingChart.module.css [xzaple40]
│   ├── CreateOrder.module.css
│   ├── Desktop.module.css
│   ├── Details.module.css
│   ├── FilterDropdown.module.css
│   ├── GraphWindow.module.css [xzaple40]
│   ├── Modal.module.css
│   ├── NewStockButton.module.css
│   ├── PortalPopup.module.css
│   ├── SearchBar.module.css
│   ├── StockManagement.module.css
│   ├── StockTable.module.css
│   ├── analytics.module.css [xzaple40]
│   └── globals.css
└── types.ts

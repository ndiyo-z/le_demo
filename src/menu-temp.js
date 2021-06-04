export const menu = [
  {
    "icon": "BankOutlined",
    "name": "主页",
    "url": "/"
  },
  {
    "icon": "GlobalOutlined",
    "name": "销售管理",
    "url":"/sale",
    "children": [
      {
        "name": "包装细节",
        "url": "/shipping/packing"
      },
      {
        "name": "毛板重量",
        "url": "/plateWeight"
      },
      {
        "name": "SKU",
        "url": "/sku"
      }
    ]
  },
  {
    "icon": "ContainerOutlined",
    "name": "原料管理",
    "url":"/mat",
    "children": [
      {
        "name": "原料属性",
        "url": "/matAttrList"
      },
      {
        "name": "原料加工",
        "url": "/matProduct"
      },
      {
        "name": "原料库存",
        "url": "/matStock"
      }
    ]
  }
]
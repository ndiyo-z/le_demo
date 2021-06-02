export const menu = [
  {
    "id": "101",
    "icon": "BankOutlined",
    "name": "主页",
    "url": "/"
  },
  {
    "id": "102",
    "icon": "GlobalOutlined",
    "name": "销售管理",
    "children": [
      {
        "id": "10201",
        "name": "包装细节",
        "url": "/shipping/packing"
      },
      {
        "id": "10202",
        "name": "毛板重量",
        "url": "/plateWeight"
      },
      {
        "id": "10203",
        "name": "SKU",
        "url": "/sku"
      }
    ]
  },
  {
    "id": "103",
    "icon": "ContainerOutlined",
    "name": "原料管理",
    "children": [
      {
        "id": "10301",
        "name": "原料属性",
        "url": "/matAttrList"
      },
      {
        "id": "10302",
        "name": "原料加工",
        "url": "/matProduct"
      },
      {
        "id": "10303",
        "name": "原料库存",
        "url": "/matStock"
      }
    ]
  }
]
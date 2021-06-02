export const menu = [
  {
    "id": "101",
    "parentId": "1",
    "icon": "BankOutlined",
    "name": "主页",
  },
  {
    "id": "102",
    "parentId": "1",
    "icon": "GlobalOutlined",
    "name": "销售管理",
    "children": [
      {
        "id": "10201",
        "parentId": "102",
        "name": "包装细节",
        "url": "/shipping/packing"
      },
      {
        "id": "10202",
        "parentId": "102",
        "name": "毛板重量",
        "url": "/plateWeight"
      },
      {
        "id": "10203",
        "parentId": "102",
        "name": "SKU",
        "url": "/sku"
      }
    ]
  },
  {
    "id": "103",
    "parentId": "1",
    "icon": "ContainerOutlined",
    "name": "原料管理",
    "children": [
      {
        "id": "10301",
        "parentId": "103",
        "name": "原料属性",
        "url": "/matAttrList"
      },
      {
        "id": "10302",
        "parentId": "103",
        "name": "原料加工",
        "url": "/matProduct"
      },
      {
        "id": "10303",
        "parentId": "103",
        "name": "原料库存",
        "url": "/matStock"
      }
    ]
  }
]
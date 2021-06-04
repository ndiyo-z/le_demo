import React, { PureComponent } from 'react'
import { Form, Button, Table, Card, message, InputNumber, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {nanoid} from 'nanoid'
import { getPlateWeightList } from '../../api'
import './index.css'

export default class PlateWeight extends PureComponent {
  
  state = {
    list: [],
    loading:true,
    editingKey:'',
    newTr:''
  }

  componentDidMount() {
    this.getPlateWeightList()
  }

  getPlateWeightList = async () => {
    let response = await getPlateWeightList()
    if (response.status === 9) message.error("网络异常，请稍后重试")
    this.setState({ list: response.data.list, loading: false })
  }

  renderExtra = () => {
    return (
      <Button 
        disabled={this.state.editingKey} 
        type="primary" 
        icon={<PlusOutlined />}
        onClick={this.addTr}
      >
        新增
      </Button>
    )
  }

  addTr = () => {
    const { list } = this.state
    let newTr = {plaId:nanoid()}
    this.setState({list:[newTr,...list], editingKey: newTr.plaId, newTr: newTr.plaId})
  }

  isEditing = item =>  this.state.editingKey === item.plaId
  isNewTr = item =>  this.state.newTr === item.plaId

  renderEditNode = (item,col,editingKey) => {
    return(
      editingKey === col.plaId ?
      <InputNumber defaultValue={item} />
      :<span>{item}</span>
    )
  }

  cancel = item => {
    let list = [...this.state.list]
    this.setState({
      editingKey: '', 
      newTr: '',
      list: this.isNewTr(item) ? list.slice(1) : list
    })
  }

  render() {
    const { list,loading,editingKey } = this.state
    const columns = [
      {dataIndex:'plaLength',key:'plaLength', align:'center',width:'20%', title:'长度',render: (item,col) => this.renderEditNode(item,col,editingKey)},
      {dataIndex:'plaWidth',key:'plaWidth', align:'center', width:'20%', title:'宽度',render: (item,col) => this.renderEditNode(item,col,editingKey)},
      {dataIndex:'plaGauge',key:'plaGauge', align:'center', width:'20%', title:'厚度',render: (item,col) => this.renderEditNode(item,col,editingKey)},
      {dataIndex:'plaWeight',key:'plaWeight', align:'center', width:'20%', title:'重量', render: (item,col) => this.renderEditNode(item,col,editingKey)},
      {title:'操作', key:'action', width: 150, align:'center',width:'20%',  render: item => 
        editingKey === item.plaId ?
        (
          <div>
            <Button type="link">保存</Button>
            <Popconfirm title="确定放弃吗？" onConfirm={() => this.cancel(item)} okText="确定" cancelText="取消">
              <Button type="link">放弃</Button>
            </Popconfirm>
          </div>
        )
        :(
          <div>
            <Button type="link" disabled={editingKey && editingKey !== item.plaId} onClick={() => this.setState({editingKey:item.plaId})}>编辑</Button>
            <Popconfirm title="确定删除吗？"okText="确定" cancelText="取消">
              <Button type="link" disabled={editingKey && editingKey !== item.plaId}>删除</Button>
            </Popconfirm>
          </div>
        )
      },
    ]
    return (
      <Card className="wrapper-card" extra={this.renderExtra()} bordered={false} hoverable>
        <Form >
          <Table
            size="small"
            rowKey='plaId'
            className="plate-weight-table"
            dataSource={list}
            columns={columns}
            loading={loading}
            pagination={{
              size: "small",
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          >
          </Table>
        </Form>
      </Card>
    )
  }
}

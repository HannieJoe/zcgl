<template>
   <div class="server">
        <h3 class="title">服务配置</h3>
        <div class="tableWrap">
            <Table :columns='serverColumns' :data='serverData'>
            </Table>
        </div>

        <Modal v-model="editModal" title="修改配置" @on-ok='editOk'>
            <Form ref="localNetForm" :model="serverForm" :label-width='80'>
                <FormItem label='ID' prop='ID'>
                    <Input type="text" v-model="serverForm.ID" disabled></Input>
                </FormItem>
                <FormItem label='IP' prop='server'>
                    <Input type="text" v-model="serverForm.server"></Input>
                </FormItem>
                <FormItem label='端口号' prop='port'>
                    <Input type="text" v-model="serverForm.port"></Input>
                </FormItem>
                <FormItem label='间隔' prop='interval'>
                    <Input type="text" v-model="serverForm.interval"></Input>
                </FormItem>
                <FormItem label='阈值' prop='threshold'>
                    <Input type="text" v-model="serverForm.threshold"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
export default{
data(){
    return {
        serverColumns:[
             {
                    type: 'index',
                },
                {
                    title: 'ID',
                    key: 'ID'
                },
                {
                    title: 'IP',
                    key: 'server'
                },
                {
                    title: '端口号',
                    key: 'port'
                },
                {
                    title: '间隔',
                    key: 'interval'
                },
                {
                    title: '阈值',
                    key: 'threshold'
                },
                {
                    title: '操作',
                    key: 'opt',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.editModal = true;
                                    this.serverForm = Object.assign({}, this.serverData[params.index]);
                                }
                            }
                        }, '编辑');
                    }
                },
        ],
        serverData:[],
        editModal:false,
        serverForm:{},
    };
},
methods:{
     //   获取data数据
        getServerData() {
            this.$http("query.cgi?config=1").then(res => {
                if (res.status) {
                    this.serverData.push(res);
                } else {
                    this.$Message.error('请求服务配置数据失败');
                }
            });
            this.$http("query.cgi?config=2").then(res => {
                if (res.status) {
                    this.serverData.push(res);
                } else {
                    this.$Message.error('请求服务配置数据失败');
                }
            });
        },
    editOk(){
         let d = 'setconfig=' + this.serverForm.ID + '&' + this.serverForm.server + '&' + this.serverForm.port + '&' + this.serverForm.interval+'&'+this.serverForm.threshold;
            this.$http("query.cgi?" + d).then(res => {
                if (res.status = 'success') {
                    this.serverData=[];
                    this.getServerData();
                    this.$Message.success(res.message);
                } else {
                    this.$Message.error(res.message);
                }
            });
    },
},
created() {
        this.getServerData();
    }
}
</script>
<style scoped>
.title {
    height: 50px;
    line-height: 50px;
}
</style>
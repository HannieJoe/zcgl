<template>
    <div class="localNetDiv">
        <h3 class="title">本机网络配置</h3>
        <div class="tableWrap">
            <Table :columns='localNetColumns' :data='localNetData'>
            </Table>
        </div>

        <Modal v-model="editModal" title="修改IP" @on-ok='editOk'>
            <Form ref="localNetForm" :model="localNetForm" :label-width='80'>
                <FormItem label='网络名' prop='name'>
                    <Input type="text" v-model="localNetForm.name" disabled></Input>
                </FormItem>
                <FormItem label='IP' prop='address'>
                    <Input type="text" v-model="localNetForm.address"></Input>
                </FormItem>
                <FormItem label='子网掩码' prop='subnetMask'>
                    <Input type="text" v-model="localNetForm.subnetMask"></Input>
                </FormItem>
                <FormItem label='默认网关' prop='defaultGateway'>
                    <Input type="text" v-model="localNetForm.defaultGateway"></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 是否重启 -->
        <Modal v-model='restartModal' title='提示' @on-ok='restarting'>
            是否重启?
        </Modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            localNetData: [],
            localNetColumns: [
                {
                    type: 'index',
                },
                {
                    title: '网络名',
                    key: 'name'
                },
                {
                    title: 'IP',
                    key: 'address'
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
                                    this.localNetForm = Object.assign(this.localNetForm, this.localNetData[params.index]);
                                }
                            }
                        }, '编辑');
                    }
                },
            ],
            editModal: false,
            localNetForm: {
                name: '',
                address: '',
                subnetMask: '255.255.255.0',
                defaultGateway: '192.168.1.1'
            },
            restartModal:false,
        };
    },
    methods: {
        //   获取data数据
        getLocalNetData() {
            this.$http("query.cgi?getiplist").then(res => {
                if (res.status) {
                    this.localNetData = res.list
                } else {
                    this.$Message.error('请求本机网络配置数据失败');
                }
            });
        },
        // 提交表单
        editOk() {
            let d = 'setip=' + this.localNetForm.name + '&' + this.localNetForm.address + '&' + this.localNetForm.subnetMask + '&' + this.localNetForm.defaultGateway;
            this.$http("query.cgi?" + d).then(res => {
                if (res.status = 'success') {
                    // this.getLocalNetData();
                    this.$Message.success(res.message);
                    this.restartModal=true;

                } else {
                    this.$Message.error(res.message);
                }
            });
        },
        // 重启
        restarting(){
            let self=this;
             this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'load-c',
                                    size: 18
                                }
                            }),
                            h('div', '正在重启,请稍后......')
                        ])
                    }
                });
            this.$http("query.cgi?reboot").then(res => {
               
               if (res.status = 'success') {
                    setTimeout(function() {
                        self.$Spin.hide();
                        self.$Message.success(res.message);
                        self.getLocalNetData();
                    }, 30000);
                   
                } else {
                     this.$Spin.hide();
                    this.$Message.error(res.message);
                }
            });
        },
    },
    created() {
        this.getLocalNetData();
    }
}
</script>
<style scoped>
.title {
    height: 50px;
    line-height: 50px;
}
</style>
<style>

</style>

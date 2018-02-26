<template>
    <div class="my-grid">
      <h2>用户管理</h2>
      <div class="option"><el-button @click="addUser">添加用户</el-button></div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="account" label="帐号" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="150"></el-table-column>
        <el-table-column prop="dept" label="所属机构" width="350"></el-table-column>
        <el-table-column fixed="right" label="操作" width="">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editUser(scope.row)" type="text" size="small">编辑</el-button>
          </template>
      </el-table-column>
      </el-table>
      <go-welcome></go-welcome>
    </div>
</template>

<script>
    import GoWelcome from '@/components/GoWelcome';
    export default {
      name: 'my-grid',
      data () {
        return {
          tableData: this.$store.state.userLists
        }
      },
      components: {
        GoWelcome
      },
      methods: {
        handleClick (row) {
          console.log(row.id);
          this.$router.push({name: 'userShow', params: {id: row.id}})
        },
        addUser() {
          this.$router.push({name: 'userForm', params: {id: 'new'}});
        },
        editUser(row) {
          // this.$store.state.activeUser = this.getEditData(row.id);
          this.$router.push({name: 'userForm', params: {id: row.id}});
        }
      }
    }
</script>
<style>
  .my-grid{
    width: 1100px;
    margin: 0 auto;
    text-align: left;
  }
  .option{
    margin: 0 0 20px 0;
  }
</style>
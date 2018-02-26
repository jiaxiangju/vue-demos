import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	userLists: [{
              id: 1,
              date: '2018-02-07',
              name: '蔡晓娉',
              account: 'xiaoping.cai',
              status: '启用',
              dept: '大街网>商业营销>全国>小华东>杭州>杭州1部'
            }, {
              id: 2,
              date: '2018-02-07',
              name: '蔡晓娉',
              account: 'xiaoping.cai',
              status: '启用',
              dept: '大街网>商业营销>全国>小华东>杭州>杭州1部'
            }, {
              id: 3,
              date: '2018-02-07',
              name: '蔡晓娉',
              account: 'xiaoping.cai',
              status: '启用',
              dept: '大街网>商业营销>全国>小华东>杭州>杭州1部'
            }, {
              id: 4,
              date: '2018-02-07',
              name: '蔡晓娉',
              account: 'xiaoping.cai',
              status: '启用',
              dept: '大街网>商业营销>全国>小华东>杭州>杭州1部'
            }, {
              id: 5,
              date: '2018-02-07',
              name: '蔡晓娉',
              account: 'xiaoping.cai',
              status: '启用',
              dept: '大街网>商业营销>全国>小华东>杭州>杭州1部'
            }],
    activeIndex: ''
};

const mutations = {// mutation 必须同步执行
	ADD_USER (state, user) {
		user.id = state.userLists[state.userLists.length-1].id + 1;
		console.log('new', user);
		state.userLists.push(user);
	},
	EDIT_USER (state, user) {
		console.log('edit user');
		console.log('----------activeIndex', state.activeIndex);
		state.userLists[state.activeIndex] = user;
	},
    GET_USERDATE_INDEX(state, id){
      for (let i = 0; i < state.userLists.length; i++) {
        if (id == state.userLists[i].id) {
          state.activeIndex = i;
        }
      }
    }
};

const actions = {//Action 不受约束！我们可以在 action 内部执行异步操作
	addUser (context, user) {
		// context.commit('ADD_USER', user);
		setTimeout(() => {
			context.commit('ADD_USER', user);
		}, 1000);
	},
	editUser (context, user) {
		context.commit('EDIT_USER', user);
	},
	getUserIndex (context, id) {
		context.commit('GET_USERDATE_INDEX', id);
	}
};

export default new Vuex.Store({
	state,
	mutations,
	actions
});
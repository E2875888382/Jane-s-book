import user from '@api/user.js';
import io from '../../node_modules/socket.io-client';
import {Message} from 'element-ui';

export default {
    userIfo(context) {
        if (localStorage.getItem('token')) {
            user.userIfo().then(result=> {
                context.commit('userStatus', true);
                context.commit('userIfo', result.data);
                context.commit('initSocket', io('http://localhost:8000'));
                context.state.socket.emit('login', {
                    uid: result.data.userIfo[0].userID,
                    name: result.data.userIfo[0].nickName
                });
                context.state.socket.on('getMsg', data=> {
                    context.commit('addMsg', {
                        index: new Date().getTime(),
                        time: new Date().toLocaleString(),
                        from: 1,
                        uid: data.uid,
                        toUid: data.toUid,
                        msg: data.msg
                    });
                    context.commit('newMsg');
                    // eslint-disable-next-line new-cap
                    Message({
                        offset: 100,
                        message: '收到一条新消息'
                    });
                });
            });
        }
    }
};
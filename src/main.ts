import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import { Button, Card, Row, Col, Alert, Input, Tooltip, Avatar, Skeleton, List } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import { store } from "./store";

const app = createApp(App);

// ant-design-components
app.use(router);
app.use(Button);
app.use(Card);
app.use(Row);
app.use(Col);
app.use(Alert);
app.use(Input);
app.use(Tooltip);
app.use(Avatar);
app.use(Skeleton);
app.use(List);

// vuex store
app.use(store);

app.mount("#app");
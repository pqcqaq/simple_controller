import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import ejs from 'ejs';
import { CollectorData, CollectorRes } from './types';

const app = new Koa();
const router = new Router();

// 存储数据的内存数组
let collectorDataList: CollectorData[] = [{
    // 示例数据
    collectorId: 'demo_data',
    position: 'demo_position',
    timestamp: 0,
    digital_inputs: {
        'input1': 1,
        'input2': 0,
    },
    uptime: 0,
    health: {
        voltage: 0,
        signal_strength: 0,
        temperature: 0,
    },
    last_operation_success: true
}];

// 视图模板路径
const viewsDir = path.join(__dirname, 'views');

// 设置模板引擎
app.use(async (ctx, next) => {
    ctx.render = (view: string, locals: object) => {
        return new Promise((resolve, reject) => {
            ejs.renderFile(path.join(viewsDir, `${view}.ejs`), locals, {}, (err, str) => {
                if (err) reject(err);
                else resolve(str);
            });
        });
    };
    await next();
});

app.use(bodyParser());

// 接收 POST 请求
router.post('/collector', (ctx) => {
    const { collectorId, position, timestamp, digital_inputs, uptime, health, last_operation_success } = ctx.request.body as CollectorData;

    // 生成返回的响应
    const response: CollectorRes = {
        success: true,
        require_oper: false,
        digital_outputs: Object.keys(digital_inputs).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {} as { [key: string]: true })
    };

    // 将数据保存到内存中
    collectorDataList.push({
        collectorId,
        position,
        timestamp,
        digital_inputs,
        uptime,
        health,
        last_operation_success
    });

    // 返回处理结果
    ctx.body = response;
});

// 获取数据列表
router.get('/collector', async (ctx) => {
    // 将数据传递到模板中渲染
    const page = await (ctx as any).render('index', { collectorDataList });
    // 返回渲染后的页面
    ctx.body = page;
});

// 清空数据
router.delete('/collector', (ctx) => {
    collectorDataList = [];
    ctx.body = { success: true };
});

// 注册路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

export type CollectorData = {
    collectorId: string; // 设备ID
    position: any; // 4G模块的地理位置信息，先给任意值，之后用经纬度
    timestamp: number; // 时间戳,用于网络通信数据验证，可以从4G模块获取
    digital_inputs: {
        [key: string]: number; // 数字输入信号，key为引脚名，value为信号值
    }
    // 开机时长
    uptime: number;
    // 健康状态相关监控数据
    health: {
        // 供电电压
        voltage: number;
        // 信号强度
        signal_strength: number;
        // 4G模块温度
        temperature: number;
    }
    // 上一次输出操作是否成功
    last_operation_success: boolean;
}

// 需要由终端维护可控制的数字输出信号与对应的引脚名
// 方便在服务器端对每个引脚的功能进行定义
export type CollectorRes = {
    // 服务器处理是否成功
    success: boolean;
    // 需要新操作，如果为true，则需要将digital_outputs发送给设备
    require_oper: boolean;
    digital_outputs?: {
        [key: string]: true; // 数字输出信号，key为引脚名，value为信号值
    }
}

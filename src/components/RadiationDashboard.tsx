import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';

// 设备管理组件
const DeviceManagement = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  
  // 设备数据
  const devices = [
    { id: 1, name: "探测器A", type: "伽马能谱仪", connection: "WiFi", status: "正常", battery: 75 },
    { id: 2, name: "探测器B", type: "伽马盖革管", connection: "蓝牙", status: "正常", battery: 92 },
    { id: 3, name: "探测器C", type: "中子探测仪", connection: "WiFi", status: "警告", battery: 15 }
  ];
  
  // 选择设备进行详细管理
  const selectDevice = (device) => {
    setSelectedDevice(device);
  };
  
  return (
    <div className="flex flex-col">
      {/* 设备列表标题 */}
      <div className="text-xs text-blue-400 mb-2 flex justify-between items-center">
        <span>已连接设备</span>
        <span className="text-xs text-blue-300">点击设备可查看详情</span>
      </div>
      
      {/* 设备管理界面 */}
      <div className="flex flex-col space-y-3 relative">
        {/* 设备列表 */}
        <div className="flex-grow overflow-auto bg-blue-950 bg-opacity-50 rounded">
          <table className="w-full text-xs">
            <thead className="bg-blue-950">
              <tr>
                <th className="px-2 py-1 text-left text-blue-300">设备</th>
                <th className="px-2 py-1 text-left text-blue-300">连接</th>
                <th className="px-2 py-1 text-left text-blue-300">状态</th>
                <th className="px-2 py-1 text-center text-blue-300">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-800">
              {devices.map(device => (
                <tr 
                  key={device.id} 
                  className={`hover:bg-blue-900 hover:bg-opacity-30 cursor-pointer ${selectedDevice && selectedDevice.id === device.id ? 'bg-blue-900 bg-opacity-50' : ''}`}
                  onClick={() => selectDevice(device)}
                >
                  <td className="px-2 py-1 text-blue-200">{device.name}</td>
                  <td className="px-2 py-1 text-blue-200">
                    <div className="flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-1 animate-pulse"></span>
                      {device.connection}
                    </div>
                  </td>
                  <td className="px-2 py-1">
                    <span className={`px-1 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      device.status === "正常" ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"
                    }`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-2 py-1 text-center">
                    <button 
                      className="text-blue-400 hover:text-blue-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectDevice(device);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* 设备详情区域 - 点击设备后显示 */}
        {selectedDevice && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-blue-950 bg-opacity-70" onClick={() => setSelectedDevice(null)}></div>
            <div className="bg-blue-900 rounded-md p-3 shadow-lg border border-blue-700 max-w-md w-full relative">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    selectedDevice.status === "正常" ? "bg-green-500" : "bg-yellow-500"
                  }`}></div>
                  <div className="font-medium text-blue-200">{selectedDevice.name} - 详细信息</div>
                </div>
                <button 
                  className="text-blue-400 hover:text-blue-300 text-xs"
                  onClick={() => setSelectedDevice(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* 设备属性 */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="bg-blue-950 rounded p-1.5">
                  <div className="text-xs text-blue-400">设备类型</div>
                  <div className="text-xs font-medium text-blue-200">{selectedDevice.type}</div>
                </div>
                <div className="bg-blue-950 rounded p-1.5">
                  <div className="text-xs text-blue-400">连接方式</div>
                  <div className="text-xs font-medium text-blue-200">{selectedDevice.connection}</div>
                </div>
                <div className="bg-blue-950 rounded p-1.5">
                  <div className="text-xs text-blue-400">状态</div>
                  <div className="text-xs font-medium text-blue-200">{selectedDevice.status}</div>
                </div>
                <div className="bg-blue-950 rounded p-1.5">
                  <div className="text-xs text-blue-400">电量</div>
                  <div className="flex items-center">
                    <div className="w-12 bg-blue-900 rounded-full h-1.5 mr-1">
                      <div 
                        className={`h-full rounded-full ${
                          selectedDevice.battery > 50 ? "bg-green-500" : 
                          selectedDevice.battery > 20 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${selectedDevice.battery}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-blue-200">{selectedDevice.battery}%</span>
                  </div>
                </div>
              </div>
              
              {/* 设备操作按钮 */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button className="bg-blue-700 text-blue-200 p-1.5 rounded hover:bg-blue-600 transition-colors text-xs text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  校准设备
                </button>
                <button className="bg-blue-700 text-blue-200 p-1.5 rounded hover:bg-blue-600 transition-colors text-xs text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  测试连接
                </button>
                <button className="bg-yellow-700 text-yellow-200 p-1.5 rounded hover:bg-yellow-600 transition-colors text-xs text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  重启设备
                </button>
                <button className="bg-red-900 text-red-200 p-1.5 rounded hover:bg-red-800 transition-colors text-xs text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  断开连接
                </button>
              </div>
              
              {/* 设备数据记录 */}
              <div className="bg-blue-950 bg-opacity-70 rounded-md p-2">
                <div className="text-xs text-blue-400 mb-1">最近活动：</div>
                <div className="space-y-1 text-xs">
                  <div className="bg-blue-950 rounded p-1.5 flex justify-between">
                    <span className="text-blue-300">数据上传</span>
                    <span className="text-blue-400">2分钟前</span>
                  </div>
                  <div className="bg-blue-950 rounded p-1.5 flex justify-between">
                    <span className="text-blue-300">自动校准</span>
                    <span className="text-blue-400">30分钟前</span>
                  </div>
                  <div className="bg-blue-950 rounded p-1.5 flex justify-between">
                    <span className="text-blue-300">连接重置</span>
                    <span className="text-blue-400">2小时前</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 云端校准面板组件
const CalibrationPanel = () => {
  const [status, setStatus] = useState('idle');  // idle, uploading, processing, complete
  const [progress, setProgress] = useState(0);
  const [lastCalibration, setLastCalibration] = useState('2025/04/28');
  const [nextCalibration, setNextCalibration] = useState('2025/05/28');
  const [showDetails, setShowDetails] = useState(false);
  
  // 校准参数
  const [calibParams, setCalibParams] = useState({
    energyResolution: '8.2%',
    efficiencyFactor: '1.24',
    zeroShift: '+0.5 keV'
  });
  
  // 启动校准流程
  const startCalibration = () => {
    setStatus('uploading');
    setProgress(10);
    
    // 模拟上传数据过程
    const uploadTimer = setTimeout(() => {
      setProgress(30);
      setStatus('processing');
      
      // 模拟处理数据过程
      const processingTimer = setTimeout(() => {
        setProgress(60);
        
        // 模拟应用校准参数
        const applyTimer = setTimeout(() => {
          setProgress(90);
          
          // 模拟完成
          const completeTimer = setTimeout(() => {
            setProgress(100);
            setStatus('complete');
            
            // 更新校准日期
            const today = new Date();
            const nextMonth = new Date();
            nextMonth.setMonth(today.getMonth() + 1);
            
            setLastCalibration(today.toLocaleDateString('zh-CN').replace(/\//g, '/'));
            setNextCalibration(nextMonth.toLocaleDateString('zh-CN').replace(/\//g, '/'));
            
            // 更新校准参数
            setCalibParams({
              energyResolution: (7.5 + Math.random()).toFixed(1) + '%',
              efficiencyFactor: (1 + Math.random() * 0.5).toFixed(2),
              zeroShift: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 1).toFixed(1) + ' keV'
            });
            
            // 重置状态 (2秒后)
            setTimeout(() => {
              setStatus('idle');
              setShowDetails(true);
            }, 2000);
          }, 500);
          
          return () => clearTimeout(completeTimer);
        }, 700);
        
        return () => clearTimeout(applyTimer);
      }, 1000);
      
      return () => clearTimeout(processingTimer);
    }, 800);
    
    return () => clearTimeout(uploadTimer);
  };
  
  const resetCalibration = () => {
    setShowDetails(false);
  };

  return (
    <div>
      {status === 'idle' ? (
        <div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-blue-950 rounded-md p-1.5">
              <div className="text-xs text-blue-400">上次校准</div>
              <div className="text-xs font-medium text-blue-200">{lastCalibration}</div>
            </div>
            <div className="bg-blue-950 rounded-md p-1.5">
              <div className="text-xs text-blue-400">下次校准</div>
              <div className="text-xs font-medium text-blue-200">{nextCalibration}</div>
            </div>
          </div>
          
          {showDetails && (
            <div className="bg-blue-950 rounded-md p-2 mb-2 text-xs">
              <div className="flex justify-between mb-1">
                <span className="text-blue-400">能量分辨率:</span>
                <span className="text-blue-200">{calibParams.energyResolution}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-blue-400">效率因子:</span>
                <span className="text-blue-200">{calibParams.efficiencyFactor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400">零点偏移:</span>
                <span className="text-blue-200">{calibParams.zeroShift}</span>
              </div>
            </div>
          )}
          
          <button 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-1 rounded-md hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 transition-all duration-200 shadow flex items-center justify-center"
            onClick={startCalibration}
          >
            <span className="inline-block w-1.5 h-1.5 bg-blue-200 rounded-full mr-1"></span>
            启动云端校准
          </button>
        </div>
      ) : (
        <div>
          {/* 校准进度状态 */}
          <div className="bg-blue-950 rounded-md p-2 mb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {status === 'uploading' && (
                  <>
                    <span className="w-3 h-3 border-2 border-t-blue-400 rounded-full animate-spin mr-1.5"></span>
                    <span className="text-xs text-blue-300">正在上传数据...</span>
                  </>
                )}
                {status === 'processing' && (
                  <>
                    <span className="w-3 h-3 border-2 border-t-blue-400 rounded-full animate-spin mr-1.5"></span>
                    <span className="text-xs text-blue-300">正在计算校准参数...</span>
                  </>
                )}
                {status === 'complete' && (
                  <>
                    <span className="text-green-400 mr-1.5">✓</span>
                    <span className="text-xs text-green-400">校准完成!</span>
                  </>
                )}
              </div>
              <div className="text-xs text-blue-400">{progress}%</div>
            </div>
            
            {/* 进度条 */}
            <div className="w-full h-1.5 bg-blue-900 rounded-full overflow-hidden">
              <div 
                className={`h-full ${status === 'complete' ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-300 ease-out`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {status === 'complete' && (
              <div className="text-xs text-green-400 mt-2 text-center animate-pulse">
                设备参数已更新
              </div>
            )}
          </div>
          
          {/* 校准时只展示一个取消按钮，完成后展示确认按钮 */}
          {status !== 'complete' ? (
            <button 
              className="w-full bg-blue-800 text-blue-300 text-xs px-2 py-1 rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center justify-center opacity-50 cursor-not-allowed"
              disabled
            >
              校准进行中...
            </button>
          ) : (
            <button 
              className="w-full bg-green-700 text-white text-xs px-2 py-1 rounded-md hover:bg-green-600 transition-all duration-200 flex items-center justify-center"
              onClick={resetCalibration}
            >
              确认
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// 能谱组件
const SpectrumDisplay = () => {
  const [spectrumData, setSpectrumData] = useState([]);

  useEffect(() => {
    // 初次调用生成数据
    generateSpectrumData();
    
    // 设置每10秒更新一次
    const timer = setInterval(generateSpectrumData, 10000);
    
    return () => clearInterval(timer);
  }, []);
  
  const generateSpectrumData = () => {
    // 可能检测到的核素种类
    const possibleNuclides = ['Cs-137', 'Co-60', 'I-131', 'Ir-192', 'Na-22'];
    // 随机决定检测到几种核素（1~5种）
    const count = Math.floor(Math.random() * 3) + 1;
    const selected = [];
    const usedIndices = new Set();
    
    while (selected.length < count) {
      const i = Math.floor(Math.random() * possibleNuclides.length);
      if (!usedIndices.has(i)) {
        usedIndices.add(i);
        // 随机生成强度值(0~100范围)
        const intensity = Math.floor(Math.random() * 101);
        selected.push({ name: possibleNuclides[i], value: intensity });
      }
    }
    
    setSpectrumData(selected);
  };

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={spectrumData}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.6}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2E4A77" />
          <XAxis dataKey="name" stroke="#93C5FD" fontSize={10} />
          <YAxis stroke="#93C5FD" fontSize={10} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1E3A8A', borderColor: '#3B82F6', color: '#BFDBFE' }}
            itemStyle={{ color: '#BFDBFE' }}
            labelStyle={{ color: '#BFDBFE' }}
          />
          <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// 生成随机时间序列数据
const generateTimeSeriesData = (points = 24) => {
  const data = [];
  let value = Math.random() * 50 + 20;
  
  for (let i = 0; i < points; i++) {
    value = Math.max(0, Math.min(100, value + (Math.random() * 20 - 10)));
    data.push({
      time: i,
      value: Math.round(value),
    });
  }
  
  return data;
};

// 历史趋势图组件
const TrendDisplay = () => {
  const [trendData, setTrendData] = useState(generateTimeSeriesData());

  useEffect(() => {
    const timer = setInterval(() => {
      setTrendData(generateTimeSeriesData());
    }, 15000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trendData}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34D399" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#10B981" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2E4A77" />
          <XAxis 
            dataKey="time"
            stroke="#93C5FD" 
            fontSize={10}
            label={{ value: '时间 (分钟)', position: 'insideBottom', offset: -5, fill: '#93C5FD', fontSize: 10 }}
          />
          <YAxis 
            stroke="#93C5FD" 
            fontSize={10}
            label={{ value: '强度', angle: -90, position: 'insideLeft', fill: '#93C5FD', fontSize: 10 }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1E3A8A', borderColor: '#3B82F6', color: '#BFDBFE' }}
            itemStyle={{ color: '#BFDBFE' }}
            labelStyle={{ color: '#BFDBFE' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ fill: '#34D399', r: 3 }}
            activeDot={{ r: 5, fill: '#BFDBFE' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// 热力图数据面板
const HeatmapDataPanel = () => {
  const [data, setData] = useState({
    max: 87,
    avg: 42
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setData({
        max: Math.floor(Math.random() * 30) + 70,
        avg: Math.floor(Math.random() * 20) + 30
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="flex space-x-3 text-xs">
      <div className="px-2 py-1 bg-blue-800 rounded text-blue-200 flex items-center">
        <span className="mr-1 font-bold text-green-400">{data.avg}</span>
        <span>平均值</span>
      </div>
      <div className="px-2 py-1 bg-blue-800 rounded text-blue-200 flex items-center">
        <span className="mr-1 font-bold text-red-400">{data.max}</span>
        <span>最大值</span>
      </div>
    </div>
  );
};

// 热力图组件
const HeatmapDisplay = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [hoveredCell, setHoveredCell] = useState(null);
  const gridSize = 16; // 使用16x16的网格密度(与Tailwind兼容)
  
  useEffect(() => {
    // 初次生成数据
    generateHeatmapData();
    
    // 设置每2.5秒更新一次
    const timer = setInterval(generateHeatmapData, 2500);
    
    return () => clearInterval(timer);
  }, []);
  
  const generateHeatmapData = () => {
    // 生成两个热点，使分布更有趣
    const hotspots = [
      { 
        x: Math.floor(Math.random() * gridSize), 
        y: Math.floor(Math.random() * gridSize),
        intensity: 80 + Math.floor(Math.random() * 20) // 80-100的强度
      },
      { 
        x: Math.floor(Math.random() * gridSize), 
        y: Math.floor(Math.random() * gridSize),
        intensity: 60 + Math.floor(Math.random() * 20) // 60-80的强度
      }
    ];
    
    // 生成网格数据，基于到热点的距离
    const newData = [];
    
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        // 计算到每个热点的距离
        let value = 0;
        
        for (const hotspot of hotspots) {
          const distX = Math.abs(i - hotspot.x);
          const distY = Math.abs(j - hotspot.y);
          const dist = Math.sqrt(distX * distX + distY * distY);
          
          // 基于距离和热点强度计算该点的影响值
          const influence = Math.max(0, hotspot.intensity - Math.floor(dist * 8));
          
          // 取最大影响值
          value = Math.max(value, influence);
        }
        
        // 添加一些随机噪声
        value = Math.min(100, Math.max(0, value + Math.floor(Math.random() * 10) - 5));
        
        row.push(value);
      }
      newData.push(row);
    }
    
    setHeatmapData(newData);
  };

  // 高级颜色映射函数，使用多色渐变
  const getColor = (value) => {
    // 专业辐射检测配色: 深蓝 -> 浅蓝 -> 绿 -> 黄 -> 橙 -> 红
    if (value < 20) {
      // 深蓝到浅蓝 (0-20)
      const factor = value / 20;
      return `rgb(0, ${Math.floor(70 + factor * 110)}, ${Math.floor(170 + factor * 85)})`;
    } else if (value < 40) {
      // 浅蓝到绿 (20-40)
      const factor = (value - 20) / 20;
      return `rgb(${Math.floor(factor * 50)}, ${Math.floor(180 - factor * 30)}, ${Math.floor(255 - factor * 155)})`;
    } else if (value < 60) {
      // 绿到黄 (40-60)
      const factor = (value - 40) / 20;
      return `rgb(${Math.floor(50 + factor * 205)}, ${Math.floor(150 + factor * 55)}, 0)`;
    } else if (value < 80) {
      // 黄到橙 (60-80)
      const factor = (value - 60) / 20;
      return `rgb(255, ${Math.floor(205 - factor * 90)}, 0)`;
    } else {
      // 橙到红 (80-100)
      const factor = (value - 80) / 20;
      return `rgb(255, ${Math.floor(115 - factor * 115)}, ${Math.floor(factor * 50)})`;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 热力图网格 - 使用CSS Grid构建 */}
      <div className="flex-grow bg-blue-950 p-px rounded-md overflow-hidden">
        <div 
          className="w-full h-full grid gap-px"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`
          }}
        >
          {heatmapData.map((row, rowIndex) => (
            row.map((value, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="relative transition-all duration-100 hover:z-10 hover:opacity-90"
                onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex, value })}
                onMouseLeave={() => setHoveredCell(null)}
              >
                <div
                  className="w-full h-full"
                  style={{ 
                    backgroundColor: getColor(value),
                    boxShadow: value > 80 ? `0 0 4px ${getColor(value)}` : 'none' 
                  }}
                />
                
                {hoveredCell && hoveredCell.row === rowIndex && hoveredCell.col === colIndex && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-20">
                    <span className="text-white font-bold text-xs">{value}</span>
                  </div>
                )}
              </div>
            ))
          ))}
        </div>
      </div>
      
      {/* 热力图图例和坐标信息面板 */}
      <div className="mt-2">
        {/* 热力图图例 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col items-center flex-grow">
            <div className="w-full h-2 rounded-full overflow-hidden">
              <div className="h-full" style={{
                background: 'linear-gradient(to right, #00468B, #00ABFF, #32AD00, #FFCD00, #FF7300, #FF0000)'
              }}></div>
            </div>
            <div className="flex justify-between w-full text-xs text-blue-400 mt-1">
              <span>0</span>
              <span>20</span>
              <span>40</span>
              <span>60</span>
              <span>80</span>
              <span>100</span>
            </div>
          </div>
          
          <div className="ml-4 text-xs text-blue-400 flex items-center whitespace-nowrap">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
            2.5秒更新
          </div>
        </div>
        
        {/* 坐标信息面板 - 始终显示 */}
        <div className="text-center text-xs text-blue-300 bg-blue-950 rounded p-1">
          {hoveredCell ? (
            <>
              坐标({hoveredCell.row},{hoveredCell.col}): 
              <span className="ml-1 font-bold" style={{color: getColor(hoveredCell.value)}}>
                {hoveredCell.value}
              </span>
            </>
          ) : (
            <>
              <span className="text-blue-400">热力图显示区域辐射剂量分布</span>
              <span className="ml-2 text-blue-300">|</span>
              <span className="ml-2 text-blue-400">鼠标悬停查看详细数值</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// 设备列表面板
const DeviceListPanel = () => {
  const connectedDevices = [
    { id: 1, name: "探测器A", connection: "WiFi", status: "正常", battery: 75 },
    { id: 2, name: "探测器B", connection: "蓝牙", status: "正常", battery: 92 },
    { id: 3, name: "探测器C", connection: "WiFi", status: "警告", battery: 15 }
  ];

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="overflow-auto flex-grow">
        <table className="min-w-full divide-y divide-blue-800">
          <thead className="bg-blue-950">
            <tr>
              <th className="px-3 py-1 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">设备</th>
              <th className="px-3 py-1 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">连接</th>
              <th className="px-3 py-1 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">状态</th>
              <th className="px-3 py-1 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">电量</th>
            </tr>
          </thead>
          <tbody className="bg-blue-950 bg-opacity-50 divide-y divide-blue-800">
            {connectedDevices.map((device) => (
              <tr key={device.id}>
                <td className="px-3 py-1 whitespace-nowrap text-xs text-blue-200">{device.name}</td>
                <td className="px-3 py-1 whitespace-nowrap text-xs text-blue-200">
                  <div className="flex items-center">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-1 animate-pulse"></span>
                    {device.connection}
                  </div>
                </td>
                <td className="px-3 py-1 whitespace-nowrap text-xs">
                  <span className={`px-1 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    device.status === "正常" 
                      ? "bg-green-900 text-green-300" 
                      : "bg-yellow-900 text-yellow-300"
                  }`}>
                    {device.status}
                  </span>
                </td>
                <td className="px-3 py-1 whitespace-nowrap text-xs text-blue-200">
                  <div className="flex items-center">
                    <div className="w-10 bg-blue-950 rounded-full h-1.5 mr-1">
                      <div 
                        className={`h-full rounded-full ${
                          device.battery > 50 ? "bg-green-500" : 
                          device.battery > 20 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${device.battery}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{device.battery}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-1 text-xs text-blue-400 flex justify-between items-center">
        <div>总设备数: {connectedDevices.length}</div>
        <button className="px-2 py-1 bg-blue-800 rounded text-blue-200 hover:bg-blue-700 transition-colors">
          详情
        </button>
      </div>
    </div>
  );
};

// 核素信息面板
const NuclideInfoPanel = () => {
  const [infoData, setInfoData] = useState({
    currentNuclide: "Cs-137",
    radiation: 46,
    risk: "中等",
    alarmStatus: "正常"
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      const nuclides = ["Cs-137", "Co-60", "I-131", "Ir-192", "Na-22"];
      const radiation = Math.floor(Math.random() * 100);
      const risk = radiation > 70 ? "高" : radiation > 30 ? "中等" : "低";
      const alarmStatus = radiation > 80 ? "警报" : "正常";
      
      setInfoData({
        currentNuclide: nuclides[Math.floor(Math.random() * nuclides.length)],
        radiation,
        risk,
        alarmStatus
      });
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-2 gap-2 flex-grow">
        <div className="bg-blue-950 rounded-md p-2 flex flex-col">
          <div className="text-xs text-blue-400">当前检测核素</div>
          <div className="text-md font-bold text-blue-200 flex-grow flex items-center">{infoData.currentNuclide}</div>
        </div>
        
        <div className="bg-blue-950 rounded-md p-2 flex flex-col">
          <div className="text-xs text-blue-400">辐射强度</div>
          <div className="text-md font-bold flex-grow flex items-center" style={{
            color: infoData.radiation > 70 ? '#F87171' : infoData.radiation > 30 ? '#FBBF24' : '#34D399'
          }}>
            {infoData.radiation}
            <span className="text-xs ml-1 text-blue-300">μSv/h</span>
          </div>
        </div>
        
        <div className="bg-blue-950 rounded-md p-2 flex flex-col">
          <div className="text-xs text-blue-400">风险等级</div>
          <div className="flex-grow flex items-center">
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
              infoData.risk === "高" ? "bg-red-900 text-red-300" :
              infoData.risk === "中等" ? "bg-yellow-900 text-yellow-300" :
              "bg-green-900 text-green-300"
            }`}>
              {infoData.risk}
            </span>
          </div>
        </div>
        
        <div className="bg-blue-950 rounded-md p-2 flex flex-col">
          <div className="text-xs text-blue-400">警报状态</div>
          <div className="flex-grow flex items-center">
            <div className={`flex items-center ${
              infoData.alarmStatus === "警报" ? "text-red-400" : "text-green-400"
            }`}>
              <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                infoData.alarmStatus === "警报" ? "bg-red-500 animate-ping" : "bg-green-500"
              }`}></span>
              <span className="font-medium text-sm">{infoData.alarmStatus}</span>
            </div>
          </div>
        </div>
      </div>
      
      <button className="mt-1 bg-blue-800 text-xs rounded p-1 text-blue-200 hover:bg-blue-700 transition-colors">
        核素识别详情
      </button>
    </div>
  );
};

// 云端校准状态面板
const CalibrationStatusPanel = () => {
  const [calibrationData, setCalibrationData] = useState({
    lastCalibration: "2025/04/28 14:23",
    status: "已校准",
    nextScheduled: "2025/05/28",
    parameters: {
      energyResolution: "8.2%",
      efficiencyFactor: "1.24",
      zeroShift: "+0.5 keV",
    }
  });
  
  const startCalibration = () => {
    // 实际应用中这里会触发校准流程
  };

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="bg-blue-950 rounded p-2">
          <div className="text-xs text-blue-400">上次校准时间</div>
          <div className="text-sm font-medium text-blue-200">{calibrationData.lastCalibration}</div>
        </div>
        <div className="bg-blue-950 rounded p-2">
          <div className="text-xs text-blue-400">校准状态</div>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            <span className="text-sm font-medium text-green-400">{calibrationData.status}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-950 rounded p-2 flex-grow mb-2">
        <div className="text-xs text-blue-400 mb-1">校准参数</div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-blue-400">能量分辨率:</span>
            <span className="text-blue-200">{calibrationData.parameters.energyResolution}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400">效率校正:</span>
            <span className="text-blue-200">{calibrationData.parameters.efficiencyFactor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400">零点偏移:</span>
            <span className="text-blue-200">{calibrationData.parameters.zeroShift}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400">下次校准:</span>
            <span className="text-blue-200">{calibrationData.nextScheduled}</span>
          </div>
        </div>
      </div>
      
      <button 
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow flex items-center justify-center"
        onClick={startCalibration}
      >
        <span className="inline-block w-2 h-2 bg-blue-200 rounded-full mr-1"></span>
        启动校准
      </button>
    </div>
  );
};

// 设备管理小面板
const DeviceManagementPanel = () => {
  const deviceCounts = {
    total: 5,
    online: 3,
    offline: 1,
    maintenance: 1
  };
  
  const deviceTypes = [
    { type: '伽马能谱仪', count: 2 },
    { type: '伽马盖革管', count: 2 },
    { type: '中子探测仪', count: 1 }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-4 gap-1 mb-2">
        <div className="bg-blue-950 rounded p-1 text-center">
          <div className="text-xs text-blue-400">总设备</div>
          <div className="text-md font-bold text-blue-200">{deviceCounts.total}</div>
        </div>
        <div className="bg-blue-950 rounded p-1 text-center">
          <div className="text-xs text-blue-400">在线</div>
          <div className="text-md font-bold text-green-400">{deviceCounts.online}</div>
        </div>
        <div className="bg-blue-950 rounded p-1 text-center">
          <div className="text-xs text-blue-400">离线</div>
          <div className="text-md font-bold text-red-400">{deviceCounts.offline}</div>
        </div>
        <div className="bg-blue-950 rounded p-1 text-center">
          <div className="text-xs text-blue-400">维护</div>
          <div className="text-md font-bold text-yellow-400">{deviceCounts.maintenance}</div>
        </div>
      </div>
      
      <div className="bg-blue-950 rounded p-2 flex-grow mb-2">
        <div className="text-xs text-blue-400 mb-1">设备分类</div>
        <div className="space-y-1">
          {deviceTypes.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-xs">
              <div className="text-blue-300">{item.type}</div>
              <div className="flex items-center space-x-1">
                <div className="h-1.5 w-12 bg-blue-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${(item.count / deviceCounts.total) * 100}%` }}
                  ></div>
                </div>
                <div className="text-blue-200">{item.count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-1">
        <button className="flex-1 bg-blue-800 text-xs rounded p-1 text-blue-200 hover:bg-blue-700 transition-colors">
          设备管理
        </button>
        <button className="flex-1 bg-blue-800 text-xs rounded p-1 text-blue-200 hover:bg-blue-700 transition-colors">
          添加设备
        </button>
      </div>
    </div>
  );
};

// 历史数据分析组件
const HistoricalDataAnalysis = ({ isOpen, onClose }) => {
  const [dateRange, setDateRange] = useState({
    startDate: '2025-04-01',
    endDate: '2025-05-10'
  });
  const [comparisonDateRange, setComparisonDateRange] = useState({
    startDate: '2025-03-01',
    endDate: '2025-03-31'
  });
  const [selectedDataType, setSelectedDataType] = useState('radiation');
  const [selectedDevice, setSelectedDevice] = useState('all');
  const [selectedNuclide, setSelectedNuclide] = useState('all');
  const [showComparison, setShowComparison] = useState(false);
  
  // 模拟历史数据
  const generateHistoricalData = (start, end, baseline) => {
    const data = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const value = baseline + Math.sin(currentDate.getDate() / 5) * 15 + Math.random() * 10;
      data.push({
        date: new Date(currentDate).toISOString().split('T')[0],
        value: Math.round(value)
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
  };
  
  const primaryData = generateHistoricalData(dateRange.startDate, dateRange.endDate, 40);
  const comparisonData = generateHistoricalData(comparisonDateRange.startDate, comparisonDateRange.endDate, 35);
  
  // 导出数据
  const exportData = (format) => {
    alert(`数据已导出为${format}格式。实际应用中将会下载文件。`);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-blue-950 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-blue-900 rounded-lg shadow-lg w-full max-w-6xl border border-blue-700 max-h-screen overflow-hidden flex flex-col">
        <div className="p-4 border-b border-blue-700 flex justify-between items-center bg-blue-950">
          <h2 className="text-lg font-bold text-blue-200">历史数据查询与分析</h2>
          <button 
            className="text-blue-400 hover:text-blue-300"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          {/* 查询条件 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-950 rounded p-3">
              <h3 className="text-blue-300 text-sm font-medium mb-2">日期范围</h3>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="text-blue-400 text-xs block mb-1">开始日期</label>
                  <input 
                    type="date" 
                    className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-blue-400 text-xs block mb-1">结束日期</label>
                  <input 
                    type="date" 
                    className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-blue-950 rounded p-3">
              <h3 className="text-blue-300 text-sm font-medium mb-2">数据筛选</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-blue-400 text-xs block mb-1">数据类型</label>
                  <select 
                    className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs"
                    value={selectedDataType}
                    onChange={(e) => setSelectedDataType(e.target.value)}
                  >
                    <option value="radiation">辐射强度</option>
                    <option value="nuclide">核素识别</option>
                    <option value="temperature">设备温度</option>
                    <option value="battery">电池电量</option>
                  </select>
                </div>
                <div>
                  <label className="text-blue-400 text-xs block mb-1">设备选择</label>
                  <select 
                    className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs"
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                  >
                    <option value="all">所有设备</option>
                    <option value="1">探测器A</option>
                    <option value="2">探测器B</option>
                    <option value="3">探测器C</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-950 rounded p-3">
              <h3 className="text-blue-300 text-sm font-medium mb-2">高级选项</h3>
              <div className="mb-3">
                <label className="text-blue-400 text-xs flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={showComparison}
                    onChange={(e) => setShowComparison(e.target.checked)}
                  />
                  与其他时段对比
                </label>
              </div>
              
              {showComparison && (
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <input 
                      type="date" 
                      className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs mb-1"
                      value={comparisonDateRange.startDate}
                      onChange={(e) => setComparisonDateRange({...comparisonDateRange, startDate: e.target.value})}
                    />
                  </div>
                  <div className="flex-1">
                    <input 
                      type="date" 
                      className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs mb-1"
                      value={comparisonDateRange.endDate}
                      onChange={(e) => setComparisonDateRange({...comparisonDateRange, endDate: e.target.value})}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* 数据可视化区域 */}
          <div className="bg-blue-950 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-blue-300 text-sm font-medium">数据趋势图</h3>
              <div className="flex space-x-2">
                <button 
                  className="bg-blue-800 hover:bg-blue-700 text-blue-200 text-xs py-1 px-2 rounded flex items-center"
                  onClick={() => exportData('CSV')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  CSV
                </button>
                <button 
                  className="bg-blue-800 hover:bg-blue-700 text-blue-200 text-xs py-1 px-2 rounded flex items-center"
                  onClick={() => exportData('Excel')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Excel
                </button>
                <button 
                  className="bg-blue-800 hover:bg-blue-700 text-blue-200 text-xs py-1 px-2 rounded flex items-center"
                  onClick={() => exportData('PDF')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  PDF
                </button>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={primaryData}>
                  <defs>
                    <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                    {showComparison && (
                      <linearGradient id="colorComparison" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                      </linearGradient>
                    )}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2E4A77" />
                  <XAxis dataKey="date" stroke="#93C5FD" fontSize={10} />
                  <YAxis stroke="#93C5FD" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E3A8A', borderColor: '#3B82F6', color: '#BFDBFE' }}
                    itemStyle={{ color: '#BFDBFE' }}
                    labelStyle={{ color: '#BFDBFE' }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    name={`${selectedDataType === 'radiation' ? '辐射强度' : 
                            selectedDataType === 'nuclide' ? '核素浓度' : 
                            selectedDataType === 'temperature' ? '温度' : '电量'} (${dateRange.startDate} 至 ${dateRange.endDate})`}
                    stroke="#3B82F6" 
                    fillOpacity={1}
                    fill="url(#colorPrimary)" 
                  />
                  
                  {showComparison && (
                    <Area 
                      type="monotone" 
                      data={comparisonData}
                      dataKey="value" 
                      name={`${selectedDataType === 'radiation' ? '辐射强度' : 
                              selectedDataType === 'nuclide' ? '核素浓度' : 
                              selectedDataType === 'temperature' ? '温度' : '电量'} (${comparisonDateRange.startDate} 至 ${comparisonDateRange.endDate})`}
                      stroke="#10B981" 
                      fillOpacity={1}
                      fill="url(#colorComparison)" 
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* 统计数据 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-950 rounded p-3">
              <h3 className="text-blue-300 text-sm font-medium mb-2">平均值</h3>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-200">42.8</div>
                <div className="ml-2 text-xs text-blue-400">
                  {selectedDataType === 'radiation' ? 'μSv/h' : 
                   selectedDataType === 'temperature' ? '°C' : 
                   selectedDataType === 'battery' ? '%' : 'Bq/m³'}
                </div>
                {showComparison && (
                  <div className="ml-auto flex items-center">
                    <div className="text-green-400 text-xs">+12.4%</div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-blue-950 rounded p-3">
              <h3 className="text-blue-300 text-sm font-medium mb-2">最大值</h3>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-200">68.3</div>
                <div className="ml-2 text-xs text-blue-400">
                  {selectedDataType === 'radiation' ? 'μSv/h' : 
                   selectedDataType === 'temperature' ? '°C' : 
                   selectedDataType === 'battery' ? '%' : 'Bq/m³'}
                </div>
                {showComparison && (
                  <div className="ml-auto flex items-center">
                    <div className="text-green-400 text-xs">+5.2%</div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-blue-950 rounded p-3">
              <h3 className="text-blue-300 text-sm font-medium mb-2">超标时长</h3>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-200">12.5</div>
                <div className="ml-2 text-xs text-blue-400">小时</div>
                {showComparison && (
                  <div className="ml-auto flex items-center">
                    <div className="text-red-400 text-xs">+8.3%</div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* 数据表格 */}
          <div className="bg-blue-950 rounded-lg p-4 mb-4 overflow-x-auto">
            <h3 className="text-blue-300 text-sm font-medium mb-2">详细数据记录</h3>
            <table className="min-w-full divide-y divide-blue-800">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">日期</th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">时间</th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">设备</th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-blue-300 tracking-wider">
                    {selectedDataType === 'radiation' ? '辐射强度(μSv/h)' : 
                     selectedDataType === 'nuclide' ? '检测核素' : 
                     selectedDataType === 'temperature' ? '温度 (°C)' : '电量 (%)'}
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">状态</th>
                </tr>
              </thead>
              <tbody className="bg-blue-900 bg-opacity-50 divide-y divide-blue-800">
                {[...Array(10)].map((_, i) => (
                  <tr key={i} className="hover:bg-blue-800 hover:bg-opacity-30">
                    <td className="px-2 py-1 text-xs text-blue-200">{dateRange.startDate.split('-').reverse().join('/')}</td>
                    <td className="px-2 py-1 text-xs text-blue-200">{`${(10+i).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`}</td>
                    <td className="px-2 py-1 text-xs text-blue-200">探测器{String.fromCharCode(65 + i % 3)}</td>
                    <td className="px-2 py-1 text-xs text-blue-200">
                      {selectedDataType === 'nuclide' 
                        ? ['Cs-137', 'Co-60', 'I-131', 'Ir-192', 'Na-22'][i % 5]
                        : (35 + Math.floor(Math.random() * 30)).toFixed(1)}
                    </td>
                    <td className="px-2 py-1 text-xs">
                      <span className={`px-1 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        i % 5 === 0 ? "bg-yellow-900 text-yellow-300" : "bg-green-900 text-green-300"
                      }`}>
                        {i % 5 === 0 ? "警告" : "正常"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="flex justify-between items-center mt-2 text-xs text-blue-400">
              <div>显示 1-10 条，共 30 条</div>
              <div className="flex space-x-1">
                <button className="bg-blue-800 hover:bg-blue-700 text-blue-200 px-2 py-1 rounded">上一页</button>
                <button className="bg-blue-700 text-blue-200 px-2 py-1 rounded">1</button>
                <button className="bg-blue-800 hover:bg-blue-700 text-blue-200 px-2 py-1 rounded">2</button>
                <button className="bg-blue-800 hover:bg-blue-700 text-blue-200 px-2 py-1 rounded">3</button>
                <button className="bg-blue-800 hover:bg-blue-700 text-blue-200 px-2 py-1 rounded">下一页</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 预警阈值设置组件
const AlertThresholdSettings = ({ isOpen, onClose }) => {
  const [thresholds, setThresholds] = useState([
    { id: 1, name: "辐射强度", zone: "所有区域", nuclide: "所有核素", level1: 30, level2: 50, level3: 70, level4: 90 },
    { id: 2, name: "辐射强度", zone: "区域A", nuclide: "Cs-137", level1: 25, level2: 45, level3: 65, level4: 85 },
    { id: 3, name: "辐射强度", zone: "区域B", nuclide: "Co-60", level1: 20, level2: 40, level3: 60, level4: 80 }
  ]);
  
  // 添加新阈值
  const [showAddForm, setShowAddForm] = useState(false);
  const [newThreshold, setNewThreshold] = useState({
    name: "辐射强度",
    zone: "",
    nuclide: "",
    level1: 30,
    level2: 50,
    level3: 70,
    level4: 90
  });
  
  const handleAddThreshold = () => {
    setThresholds([
      ...thresholds,
      {
        id: thresholds.length + 1,
        ...newThreshold
      }
    ]);
    setShowAddForm(false);
    setNewThreshold({
      name: "辐射强度",
      zone: "",
      nuclide: "",
      level1: 30,
      level2: 50,
      level3: 70,
      level4: 90
    });
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-blue-950 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-blue-900 rounded-lg shadow-lg w-full max-w-4xl border border-blue-700 max-h-screen overflow-hidden flex flex-col">
        <div className="p-4 border-b border-blue-700 flex justify-between items-center bg-blue-950">
          <h2 className="text-lg font-bold text-blue-200">预警阈值自定义设置</h2>
          <button 
            className="text-blue-400 hover:text-blue-300"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          {/* 预警级别颜色图例 */}
          <div className="bg-blue-950 rounded p-3 mb-4">
            <h3 className="text-blue-300 text-sm font-medium mb-2">预警级别说明</h3>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-blue-500 mr-2"></div>
                <span className="text-blue-200">提醒 (Level 1)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-yellow-500 mr-2"></div>
                <span className="text-blue-200">警告 (Level 2)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-orange-500 mr-2"></div>
                <span className="text-blue-200">严重警告 (Level 3)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-red-500 mr-2"></div>
                <span className="text-blue-200">危险 (Level 4)</span>
              </div>
            </div>
          </div>
          
          {/* 当前阈值表格 */}
          <div className="bg-blue-950 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-blue-300 text-sm font-medium">当前预警阈值设置</h3>
              <button 
                className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-3 rounded flex items-center"
                onClick={() => setShowAddForm(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                添加新阈值
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-800">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">监测参数</th>
                    <th className="px-2 py-1 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">区域</th>
                    <th className="px-2 py-1 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">核素</th>
                    <th className="px-2 py-1 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">提醒</th>
                    <th className="px-2 py-1 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">警告</th>
                    <th className="px-2 py-1 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">严重警告</th>
                    <th className="px-2 py-1 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">危险</th>
                    <th className="px-2 py-1 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-900 bg-opacity-50 divide-y divide-blue-800">
                  {thresholds.map((threshold, index) => (
                    <tr key={threshold.id} className="hover:bg-blue-800 hover:bg-opacity-30">
                      <td className="px-2 py-1 text-xs text-blue-200">{threshold.name}</td>
                      <td className="px-2 py-1 text-xs text-blue-200">{threshold.zone}</td>
                      <td className="px-2 py-1 text-xs text-blue-200">{threshold.nuclide}</td>
                      <td className="px-2 py-1 text-xs text-center">
                        <span className="px-2 py-0.5 bg-blue-800 text-blue-500 font-medium rounded-full">
                          {threshold.level1}+
                        </span>
                      </td>
                      <td className="px-2 py-1 text-xs text-center">
                        <span className="px-2 py-0.5 bg-yellow-900 text-yellow-500 font-medium rounded-full">
                          {threshold.level2}+
                        </span>
                      </td>
                      <td className="px-2 py-1 text-xs text-center">
                        <span className="px-2 py-0.5 bg-orange-900 text-orange-500 font-medium rounded-full">
                          {threshold.level3}+
                        </span>
                      </td>
                      <td className="px-2 py-1 text-xs text-center">
                        <span className="px-2 py-0.5 bg-red-900 text-red-500 font-medium rounded-full">
                          {threshold.level4}+
                        </span>
                      </td>
                      <td className="px-2 py-1 text-xs text-center">
                        <div className="flex justify-center space-x-1">
                          <button className="text-blue-400 hover:text-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="text-red-400 hover:text-red-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* 添加新阈值表单 */}
          {showAddForm && (
            <div className="bg-blue-950 rounded-lg p-4 mb-4 border border-blue-700">
              <h3 className="text-blue-300 text-sm font-medium mb-3">添加新预警阈值</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-blue-400 text-xs block mb-1">监测参数</label>
                  <select 
                    className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs"
                    value={newThreshold.name}
                    onChange={(e) => setNewThreshold({...newThreshold, name: e.target.value})}
                  >
                    <option value="辐射强度">辐射强度</option>
                    <option value="核素浓度">核素浓度</option>
                    <option value="设备温度">设备温度</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-blue-400 text-xs block mb-1">区域</label>
                  <select 
                    className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs"
                    value={newThreshold.zone}
                    onChange={(e) => setNewThreshold({...newThreshold, zone: e.target.value})}
                  >
                    <option value="">所有区域</option>
                    <option value="区域A">区域A</option>
                    <option value="区域B">区域B</option>
                    <option value="区域C">区域C</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-blue-400 text-xs block mb-1">核素</label>
                  <select 
                    className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs"
                    value={newThreshold.nuclide}
                    onChange={(e) => setNewThreshold({...newThreshold, nuclide: e.target.value})}
                  >
                    <option value="">所有核素</option>
                    <option value="Cs-137">Cs-137</option>
                    <option value="Co-60">Co-60</option>
                    <option value="I-131">I-131</option>
                    <option value="Ir-192">Ir-192</option>
                    <option value="Na-22">Na-22</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div>
                  <label className="text-blue-400 text-xs block mb-1">提醒阈值</label>
                  <input 
                    type="number" 
                    className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs"
                    value={newThreshold.level1}
                    onChange={(e) => setNewThreshold({...newThreshold, level1: parseInt(e.target.value) || 0})}
                  />
                </div>
                
                <div>
                  <label className="text-blue-400 text-xs block mb-1">警告阈值</label>
                  <input 
                    type="number" 
                    className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs"
                    value={newThreshold.level2}
                    onChange={(e) => setNewThreshold({...newThreshold, level2: parseInt(e.target.value) || 0})}
                  />
                </div>
                
                <div>
                  <label className="text-blue-400 text-xs block mb-1">严重警告阈值</label>
                  <input 
                    type="number" 
                    className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs"
                    value={newThreshold.level3}
                    onChange={(e) => setNewThreshold({...newThreshold, level3: parseInt(e.target.value) || 0})}
                  />
                </div>
                
                <div>
                  <label className="text-blue-400 text-xs block mb-1">危险阈值</label>
                  <input 
                    type="number" 
                    className="w-full bg-blue-800 border border-blue-700 rounded p-1 text-blue-200 text-xs"
                    value={newThreshold.level4}
                    onChange={(e) => setNewThreshold({...newThreshold, level4: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  className="bg-blue-800 hover:bg-blue-700 text-blue-200 text-xs py-1 px-3 rounded"
                  onClick={() => setShowAddForm(false)}
                >
                  取消
                </button>
                <button 
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs py-1 px-3 rounded"
                  onClick={handleAddThreshold}
                >
                  保存
                </button>
              </div>
            </div>
          )}
          
          {/* 预警规则可视化 */}
          <div className="bg-blue-950 rounded-lg p-4 mb-4">
            <h3 className="text-blue-300 text-sm font-medium mb-3">预警规则可视化</h3>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={thresholds}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2E4A77" />
                  <XAxis type="number" stroke="#93C5FD" fontSize={10} />
                  <YAxis 
                    dataKey="zone" 
                    type="category" 
                    stroke="#93C5FD" 
                    fontSize={10}
                    tickFormatter={(value) => value || "所有区域"}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E3A8A', borderColor: '#3B82F6', color: '#BFDBFE' }}
                    itemStyle={{ color: '#BFDBFE' }}
                    labelStyle={{ color: '#BFDBFE' }}
                    formatter={(value, name) => [value, (name as string).replace('level', '预警级别 ')]}
                  />
                  <Legend />
                  <Bar dataKey="level1" name="提醒阈值" fill="#3B82F6" />
                  <Bar dataKey="level2" name="警告阈值" fill="#FBBF24" />
                  <Bar dataKey="level3" name="严重警告阈值" fill="#F97316" />
                  <Bar dataKey="level4" name="危险阈值" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 通知与报警系统组件
const NotificationSystem = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notificationChannels, setNotificationChannels] = useState([
    { id: 1, type: "email", recipient: "admin@example.com", enabled: true, level: 2 },
    { id: 2, type: "sms", recipient: "13812345678", enabled: true, level: 3 },
    { id: 3, type: "app", recipient: "所有管理员", enabled: true, level: 1 }
  ]);
  
  const [alertRules, setAlertRules] = useState([
    { id: 1, name: "辐射强度超标", condition: "辐射强度 > 阈值 持续5分钟", action: "通知所有管理员", enabled: true },
    { id: 2, name: "设备离线", condition: "设备状态 = 离线 持续10分钟", action: "短信通知技术人员", enabled: true },
    { id: 3, name: "核素浓度异常", condition: "Cs-137浓度 > 阈值 单次", action: "电子邮件+短信通知", enabled: false }
  ]);
  
  const [dutySchedule, setDutySchedule] = useState([
    { id: 1, name: "张三", role: "监控员", schedule: "周一至周三 9:00-18:00", contact: "13812345678" },
    { id: 2, name: "李四", role: "技术员", schedule: "周四至周五 9:00-18:00", contact: "13987654321" },
    { id: 3, name: "王五", role: "主管", schedule: "周末 9:00-18:00", contact: "13765432190" }
  ]);
  
  const [alertHistory, setAlertHistory] = useState([
    { id: 1, time: "2025/05/10 08:32", message: "探测器B辐射强度超过警告阈值", level: "警告", recipient: "张三", status: "已确认" },
    { id: 2, time: "2025/05/10 02:15", message: "探测器C电量低", level: "提醒", recipient: "全体人员", status: "已处理" },
    { id: 3, time: "2025/05/09 22:07", message: "探测器A检测到Cs-137超标", level: "严重警告", recipient: "李四, 王五", status: "已处理" },
    { id: 4, time: "2025/05/09 16:45", message: "探测器C断开连接", level: "提醒", recipient: "技术组", status: "已处理" },
    { id: 5, time: "2025/05/09 12:30", message: "云端校准失败", level: "提醒", recipient: "技术组", status: "已处理" }
  ]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-blue-950 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-blue-900 rounded-lg shadow-lg w-full max-w-6xl border border-blue-700 max-h-screen overflow-hidden flex flex-col">
        <div className="p-4 border-b border-blue-700 flex justify-between items-center bg-blue-950">
          <h2 className="text-lg font-bold text-blue-200">通知与报警系统</h2>
          <button 
            className="text-blue-400 hover:text-blue-300"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* 选项卡 */}
        <div className="bg-blue-950 px-4 flex border-b border-blue-700">
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'notifications' ? 'text-blue-300 border-b-2 border-blue-400' : 'text-blue-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('notifications')}
          >
            通知渠道
          </button>
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'rules' ? 'text-blue-300 border-b-2 border-blue-400' : 'text-blue-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('rules')}
          >
            报警规则
          </button>
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'duty' ? 'text-blue-300 border-b-2 border-blue-400' : 'text-blue-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('duty')}
          >
            值班排班
          </button>
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'history' ? 'text-blue-300 border-b-2 border-blue-400' : 'text-blue-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('history')}
          >
            报警历史
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          {/* 通知渠道设置 */}
          {activeTab === 'notifications' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-blue-300 text-sm font-medium">通知渠道设置</h3>
                <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-3 rounded flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  添加通知渠道
                </button>
              </div>
              
              <div className="bg-blue-950 rounded-lg p-4 mb-4">
                <table className="min-w-full divide-y divide-blue-800">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">类型</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">接收者</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">最低预警级别</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">状态</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-blue-900 bg-opacity-50 divide-y divide-blue-800">
                    {notificationChannels.map((channel) => (
                      <tr key={channel.id} className="hover:bg-blue-800 hover:bg-opacity-30">
                        <td className="px-4 py-2 text-sm text-blue-200">
                          <div className="flex items-center">
                            {channel.type === 'email' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            )}
                            {channel.type === 'sms' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            )}
                            {channel.type === 'app' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                              </svg>
                            )}
                            {channel.type === 'email' ? '电子邮件' : channel.type === 'sms' ? '短信' : '应用推送'}
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-blue-200">{channel.recipient}</td>
                        <td className="px-4 py-2 text-sm text-blue-200">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            channel.level === 1 ? 'bg-blue-900 text-blue-400' :
                            channel.level === 2 ? 'bg-yellow-900 text-yellow-400' :
                            channel.level === 3 ? 'bg-orange-900 text-orange-400' :
                            'bg-red-900 text-red-400'
                          }`}>
                            {channel.level === 1 ? '提醒' :
                             channel.level === 2 ? '警告' :
                             channel.level === 3 ? '严重警告' : '危险'}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input 
                              type="checkbox" 
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                              checked={channel.enabled}
                              readOnly
                            />
                            <label 
                              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${channel.enabled ? 'bg-blue-500' : 'bg-blue-800'}`}
                            ></label>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button className="text-blue-400 hover:text-blue-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-blue-950 rounded-lg p-4">
                <h3 className="text-blue-300 text-sm font-medium mb-3">通知预览</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-900 p-3 rounded border border-blue-700">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-blue-200">电子邮件</span>
                      </div>
                      <span className="bg-yellow-900 text-yellow-400 text-xs px-2 py-0.5 rounded-full">警告</span>
                    </div>
                    <div className="text-xs text-blue-400 mb-1">主题: 【警告】探测器B检测到辐射强度超标</div>
                    <div className="text-xs text-blue-300">内容: 探测器B于2025-05-10 08:32检测到区域A辐射强度为68.3μSv/h，超过预设阈值（50.0μSv/h）。请及时查看系统并采取必要措施。</div>
                  </div>
                  
                  <div className="bg-blue-900 p-3 rounded border border-blue-700">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="text-sm text-blue-200">短信</span>
                      </div>
                      <span className="bg-orange-900 text-orange-400 text-xs px-2 py-0.5 rounded-full">严重警告</span>
                    </div>
                    <div className="text-xs text-blue-300">【严重警告】探测器A检测到Cs-137浓度超标(严重)，当前值85.7Bq/m³，超过阈值(60Bq/m³)。请立即处理。</div>
                  </div>
                  
                  <div className="bg-blue-900 p-3 rounded border border-blue-700">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="text-sm text-blue-200">应用推送</span>
                      </div>
                      <span className="bg-blue-900 text-blue-400 text-xs px-2 py-0.5 rounded-full">提醒</span>
                    </div>
                    <div className="text-xs text-blue-400 mb-1">探测器C电量低</div>
                    <div className="text-xs text-blue-300">探测器C当前电量为15%，请考虑尽快充电或更换电池，以确保设备正常运行。</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 报警规则设置 */}
          {activeTab === 'rules' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-blue-300 text-sm font-medium">报警规则设置</h3>
                <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-3 rounded flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  添加报警规则
                </button>
              </div>
              
              <div className="bg-blue-950 rounded-lg p-4 mb-4">
                <table className="min-w-full divide-y divide-blue-800">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">规则名称</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">触发条件</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">执行操作</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">状态</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-blue-900 bg-opacity-50 divide-y divide-blue-800">
                    {alertRules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-blue-800 hover:bg-opacity-30">
                        <td className="px-4 py-2 text-sm text-blue-200">{rule.name}</td>
                        <td className="px-4 py-2 text-sm text-blue-200">{rule.condition}</td>
                        <td className="px-4 py-2 text-sm text-blue-200">{rule.action}</td>
                        <td className="px-4 py-2 text-sm text-center">
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input 
                              type="checkbox" 
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                              checked={rule.enabled}
                              readOnly
                            />
                            <label 
                              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${rule.enabled ? 'bg-blue-500' : 'bg-blue-800'}`}
                            ></label>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button className="text-blue-400 hover:text-blue-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-blue-950 rounded-lg p-4">
                <h3 className="text-blue-300 text-sm font-medium mb-3">报警升级配置</h3>
                <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                  <div className="text-sm text-blue-200 mb-2">报警自动升级流程</div>
                  <div className="relative">
                    <div className="absolute w-0.5 bg-blue-700 h-full left-5 z-0"></div>
                    
                    <div className="flex items-center mb-6 relative z-10">
                      <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-blue-300">1</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm text-blue-300 mb-1">初始报警</div>
                        <div className="text-xs text-blue-400">触发条件满足时，通过已配置的通知渠道发送警报</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6 relative z-10">
                      <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-blue-300">2</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm text-blue-300 mb-1">未确认升级 (15分钟)</div>
                        <div className="text-xs text-blue-400">若15分钟内无人确认警报，自动升级通知级别，并通知当前值班人员</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6 relative z-10">
                      <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-blue-300">3</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm text-blue-300 mb-1">二次升级 (30分钟)</div>
                        <div className="text-xs text-blue-400">若30分钟仍未得到处理，升级通知所有技术人员和管理员</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center relative z-10">
                      <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm text-red-300 mb-1">紧急升级 (1小时)</div>
                        <div className="text-xs text-blue-400">若1小时仍未解决，系统自动启动紧急预案，通知紧急联系人和相关部门</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 值班排班管理 */}
          {activeTab === 'duty' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-blue-300 text-sm font-medium">值班排班管理</h3>
                <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-3 rounded flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  添加值班人员
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-950 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm text-blue-300">当前值班</h4>
                    <span className="bg-green-900 text-green-400 text-xs px-2 py-0.5 rounded-full">在线</span>
                  </div>
                  <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                    <div className="text-blue-200 font-medium">李四</div>
                    <div className="text-xs text-blue-400 mb-2">技术员 | 联系电话: 139****4321</div>
                    <div className="text-xs text-blue-300 mb-2">值班时间: 周四至周五 9:00-18:00</div>
                    <div className="text-xs text-blue-400">已处理报警: 3次</div>
                    
                    <div className="mt-3 flex justify-between">
                      <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-2 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        拨打电话
                      </button>
                      <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-2 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        发送消息
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-950 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm text-blue-300">下一班次</h4>
                    <span className="bg-blue-900 text-blue-400 text-xs px-2 py-0.5 rounded-full">未开始</span>
                  </div>
                  <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                    <div className="text-blue-200 font-medium">王五</div>
                    <div className="text-xs text-blue-400 mb-2">主管 | 联系电话: 137****2190</div>
                    <div className="text-xs text-blue-300 mb-2">值班时间: 周末 9:00-18:00</div>
                    <div className="text-xs text-blue-400">已处理报警: 12次</div>
                    
                    <div className="mt-3 flex justify-between">
                      <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-2 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        拨打电话
                      </button>
                      <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-2 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        发送消息
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-950 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm text-blue-300">上一班次</h4>
                    <span className="bg-blue-900 text-blue-400 text-xs px-2 py-0.5 rounded-full">已完成</span>
                  </div>
                  <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                    <div className="text-blue-200 font-medium">张三</div>
                    <div className="text-xs text-blue-400 mb-2">监控员 | 联系电话: 138****5678</div>
                    <div className="text-xs text-blue-300 mb-2">值班时间: 周一至周三 9:00-18:00</div>
                    <div className="text-xs text-blue-400">已处理报警: 5次</div>
                    
                    <div className="mt-3 flex justify-between">
                      <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-2 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        拨打电话
                      </button>
                      <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-2 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        发送消息
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-950 rounded-lg p-4 mb-4">
                <h3 className="text-blue-300 text-sm font-medium mb-3">全周值班表</h3>
                <table className="min-w-full divide-y divide-blue-800">
                  <thead>
                    <tr>
                      <th className="px-2 py-1"></th>
                      <th className="px-2 py-1 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">周一</th>
                      <th className="px-2 py-1 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">周二</th>
                      <th className="px-2 py-1 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">周三</th>
                      <th className="px-2 py-1 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">周四</th>
                      <th className="px-2 py-1 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">周五</th>
                      <th className="px-2 py-1 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">周六</th>
                      <th className="px-2 py-1 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">周日</th>
                    </tr>
                  </thead>
                  <tbody className="bg-blue-900 bg-opacity-50 divide-y divide-blue-800">
                    <tr>
                      <td className="px-2 py-1 text-xs font-medium text-blue-400">日班</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-30">张三</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-30">张三</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-30">张三</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-50">李四</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-50">李四</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-70">王五</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-70">王五</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1 text-xs font-medium text-blue-400">夜班</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-20">赵六</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-20">赵六</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-20">赵六</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-40">钱七</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-40">钱七</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-60">孙八</td>
                      <td className="px-2 py-1 text-center text-xs text-blue-200 bg-blue-800 bg-opacity-60">孙八</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-blue-950 rounded-lg p-4">
                <h3 className="text-blue-300 text-sm font-medium mb-3">值班人员列表</h3>
                <table className="min-w-full divide-y divide-blue-800">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">姓名</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">角色</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">值班时间</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">联系方式</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-blue-900 bg-opacity-50 divide-y divide-blue-800">
                    {dutySchedule.map((person) => (
                      <tr key={person.id} className="hover:bg-blue-800 hover:bg-opacity-30">
                        <td className="px-4 py-2 text-sm text-blue-200">{person.name}</td>
                        <td className="px-4 py-2 text-sm text-blue-200">{person.role}</td>
                        <td className="px-4 py-2 text-sm text-blue-200">{person.schedule}</td>
                        <td className="px-4 py-2 text-sm text-blue-200">{person.contact}</td>
                        <td className="px-4 py-2 text-sm text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* 报警历史记录 */}
          {activeTab === 'history' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-blue-300 text-sm font-medium">报警历史记录</h3>
                <div className="flex space-x-2">
                  <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-3 rounded flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-4H4a1 1 0 01-1-1V4z" />
                    </svg>
                    导出记录
                  </button>
                  <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-3 rounded flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    筛选
                  </button>
                </div>
              </div>
              
              <div className="bg-blue-950 rounded-lg p-4 mb-4">
                <table className="min-w-full divide-y divide-blue-800">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">时间</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">报警内容</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">级别</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">接收者</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">状态</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-blue-900 bg-opacity-50 divide-y divide-blue-800">
                    {alertHistory.map((alert) => (
                      <tr key={alert.id} className="hover:bg-blue-800 hover:bg-opacity-30">
                        <td className="px-4 py-2 text-sm text-blue-200">{alert.time}</td>
                        <td className="px-4 py-2 text-sm text-blue-200">{alert.message}</td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            alert.level === '提醒' ? 'bg-blue-900 text-blue-400' :
                            alert.level === '警告' ? 'bg-yellow-900 text-yellow-400' :
                            alert.level === '严重警告' ? 'bg-orange-900 text-orange-400' :
                            'bg-red-900 text-red-400'
                          }`}>
                            {alert.level}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm text-blue-200">{alert.recipient}</td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            alert.status === '已确认' ? 'bg-yellow-900 text-yellow-400' :
                            alert.status === '已处理' ? 'bg-green-900 text-green-400' :
                            'bg-red-900 text-red-400'
                          }`}>
                            {alert.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="text-green-400 hover:text-green-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="flex justify-between items-center mt-2 text-xs text-blue-400">
                  <div>显示 1-5 条，共 28 条</div>
                  <div className="flex space-x-1">
                    <button className="bg-blue-800 hover:bg-blue-700 text-blue-200 px-2 py-1 rounded">上一页</button>
                    <button className="bg-blue-700 text-blue-200 px-2 py-1 rounded">1</button>
                    <button className="bg-blue-800 hover:bg-blue-700 text-blue-200 px-2 py-1 rounded">2</button>
                    <button className="bg-blue-800 hover:bg-blue-700 text-blue-200 px-2 py-1 rounded">3</button>
                    <button className="bg-blue-800 hover:bg-blue-700 text-blue-200 px-2 py-1 rounded">下一页</button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-950 rounded-lg p-4">
                  <h3 className="text-blue-300 text-sm font-medium mb-3">报警统计</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                      <div className="text-xs text-blue-400 mb-1">今日报警</div>
                      <div className="text-xl font-bold text-blue-200">8</div>
                      <div className="text-xs text-blue-400 mt-1">较昨日 +3</div>
                    </div>
                    <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                      <div className="text-xs text-blue-400 mb-1">本周报警</div>
                      <div className="text-xl font-bold text-blue-200">28</div>
                      <div className="text-xs text-blue-400 mt-1">较上周 -5</div>
                    </div>
                    <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                      <div className="text-xs text-blue-400 mb-1">未处理报警</div>
                      <div className="text-xl font-bold text-yellow-400">3</div>
                      <div className="text-xs text-blue-400 mt-1">需要关注</div>
                    </div>
                    <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                      <div className="text-xs text-blue-400 mb-1">平均响应时间</div>
                      <div className="text-xl font-bold text-blue-200">6.8</div>
                      <div className="text-xs text-blue-400 mt-1">分钟</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-950 rounded-lg p-4">
                  <h3 className="text-blue-300 text-sm font-medium mb-3">报警类型分布</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: '辐射超标', 数量: 12 },
                          { name: '设备离线', 数量: 8 },
                          { name: '电量低', 数量: 4 },
                          { name: '校准失败', 数量: 2 },
                          { name: '其他', 数量: 2 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#2E4A77" />
                        <XAxis dataKey="name" stroke="#93C5FD" fontSize={10} />
                        <YAxis stroke="#93C5FD" fontSize={10} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1E3A8A', borderColor: '#3B82F6', color: '#BFDBFE' }}
                          itemStyle={{ color: '#BFDBFE' }}
                          labelStyle={{ color: '#BFDBFE' }}
                        />
                        <Bar dataKey="数量" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// AI辅助功能组件
const AIAssistant = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('anomaly');
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [simulateAnomalies, setSimulateAnomalies] = useState(false);
  
  // 启动分析
  const startAnalysis = () => {
    setIsRunningAnalysis(true);
    // 模拟分析过程
    setTimeout(() => {
      setIsRunningAnalysis(false);
      setAnalysisComplete(true);
    }, 2000);
  };
  
  // 重置分析
  const resetAnalysis = () => {
    setAnalysisComplete(false);
  };
  
  // 生成模拟的异常检测结果数据
  const generateAnomalyData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 0; i < 24; i++) {
      const time = new Date(now);
      time.setHours(now.getHours() - (23 - i));
      
      let value = 35 + Math.sin(i / 3) * 10 + Math.random() * 5;
      let isAnomaly = false;
      
      // 如果启用了模拟异常，在某些点添加异常值
      if (simulateAnomalies && (i === 8 || i === 16 || i === 20)) {
        value += 30 + Math.random() * 20;
        isAnomaly = true;
      }
      
      data.push({
        time: time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        value: Math.round(value * 10) / 10,
        isAnomaly
      });
    }
    
    return data;
  };
  
  // 生成设备故障预测数据
  const generateFailurePredictionData = () => {
    return [
      { id: 1, device: "探测器A", component: "传感器", probability: 12, timeWindow: "30-45天" },
      { id: 2, device: "探测器B", component: "电池组", probability: 47, timeWindow: "7-15天" },
      { id: 3, device: "探测器C", component: "连接模块", probability: 78, timeWindow: "1-3天" }
    ];
  };
  
  // 生成趋势预测数据
  const generateTrendPredictionData = () => {
    const data = [];
    // 历史数据 - 过去30天
    for (let i = 0; i < 30; i++) {
      data.push({
        day: -29 + i,
        value: 40 + Math.sin(i / 5) * 10 + (i / 15) * 5 + Math.random() * 5,
        type: '历史数据'
      });
    }
    
    // 预测数据 - 未来15天
    const lastValue = data[data.length - 1].value;
    for (let i = 1; i <= 15; i++) {
      const predictedValue = lastValue + Math.sin(i / 4) * 6 + (i / 10) * 3;
      const lowerBound = predictedValue - 5 - i * 0.7;
      const upperBound = predictedValue + 5 + i * 0.7;
      
      data.push({
        day: i,
        value: predictedValue,
        lowerBound,
        upperBound,
        type: '预测数据'
      });
    }
    
    return data;
  };
  
  // 获取模拟数据
  const anomalyData = generateAnomalyData();
  const failurePredictionData = generateFailurePredictionData();
  const trendPredictionData = generateTrendPredictionData();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-blue-950 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-blue-900 rounded-lg shadow-lg w-full max-w-6xl border border-blue-700 max-h-screen overflow-hidden flex flex-col">
        <div className="p-4 border-b border-blue-700 flex justify-between items-center bg-blue-950">
          <h2 className="text-lg font-bold text-blue-200">AI辅助分析</h2>
          <button 
            className="text-blue-400 hover:text-blue-300"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* 选项卡 */}
        <div className="bg-blue-950 px-4 flex border-b border-blue-700">
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'anomaly' ? 'text-blue-300 border-b-2 border-blue-400' : 'text-blue-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('anomaly')}
          >
            异常辐射检测
          </button>
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'failure' ? 'text-blue-300 border-b-2 border-blue-400' : 'text-blue-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('failure')}
          >
            设备故障预测
          </button>
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'trend' ? 'text-blue-300 border-b-2 border-blue-400' : 'text-blue-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('trend')}
          >
            辐射趋势预测
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          {/* 异常辐射检测 */}
          {activeTab === 'anomaly' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-blue-300 text-sm font-medium">异常辐射模式检测</h3>
                <div className="flex items-center space-x-3">
                  <label className="text-blue-400 text-xs flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={simulateAnomalies}
                      onChange={(e) => setSimulateAnomalies(e.target.checked)}
                    />
                    模拟异常数据
                  </label>
                  {!isRunningAnalysis && !analysisComplete && (
                    <button 
                      className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-3 rounded flex items-center"
                      onClick={startAnalysis}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      开始分析
                    </button>
                  )}
                  {isRunningAnalysis && (
                    <div className="flex items-center text-blue-300 text-xs">
                      <svg className="animate-spin h-3 w-3 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      正在分析数据...
                    </div>
                  )}
                  {!isRunningAnalysis && analysisComplete && (
                    <button 
                      className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-3 rounded flex items-center"
                      onClick={resetAnalysis}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      重新分析
                    </button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="col-span-2 bg-blue-950 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm text-blue-300">24小时辐射强度曲线</h4>
                    <div className="flex items-center text-xs text-blue-400">
                      <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                      检测到的异常点
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={anomalyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2E4A77" />
                        <XAxis dataKey="time" stroke="#93C5FD" fontSize={10} />
                        <YAxis stroke="#93C5FD" fontSize={10} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1E3A8A', borderColor: '#3B82F6', color: '#BFDBFE' }}
                          itemStyle={{ color: '#BFDBFE' }}
                          labelStyle={{ color: '#BFDBFE' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          dot={(props) => {
                            const { cx, cy, payload } = props;
                            return payload.isAnomaly ? (
                              <circle cx={cx} cy={cy} r={5} fill="#EF4444" stroke="#EF4444" strokeWidth={1} />
                            ) : (
                              <circle cx={cx} cy={cy} r={3} fill="#3B82F6" />
                            );
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-blue-950 rounded-lg p-4">
                  <h4 className="text-sm text-blue-300 mb-3">AI异常检测结果</h4>
                  {isRunningAnalysis && (
                    <div className="flex flex-col items-center justify-center h-56">
                      <svg className="animate-spin h-10 w-10 text-blue-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <div className="text-blue-300 text-sm">正在分析数据...</div>
                      <div className="text-blue-400 text-xs mt-1">使用深度学习模型识别异常模式</div>
                    </div>
                  )}
                  {!isRunningAnalysis && !analysisComplete && (
                    <div className="flex flex-col items-center justify-center h-56">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <div className="text-blue-300 text-sm">点击"开始分析"按钮</div>
                      <div className="text-blue-400 text-xs mt-1">AI将自动识别异常辐射模式</div>
                    </div>
                  )}
                  {!isRunningAnalysis && analysisComplete && (
                    <div>
                      <div className="bg-blue-900 rounded-lg p-3 border border-blue-700 mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="text-sm text-red-400">检测到异常点</span>
                          </div>
                          <span className="bg-red-900 text-red-400 text-xs px-2 py-0.5 rounded-full">高可信度</span>
                        </div>
                        <div className="text-xs text-blue-300 mb-1">
                          在08:00，16:00和20:00时段检测到明显高于正常水平的辐射值
                        </div>
                        <div className="text-xs text-blue-400">
                          建议: 检查这些时段是否有特殊操作或设备故障
                        </div>
                      </div>
                      
                      <div className="bg-blue-900 rounded-lg p-3 border border-blue-700 mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-yellow-400">模式识别结果</span>
                          </div>
                          <span className="bg-yellow-900 text-yellow-400 text-xs px-2 py-0.5 rounded-full">中可信度</span>
                        </div>
                        <div className="text-xs text-blue-300">
                          数据显示周期性波动，可能与正常操作活动相关
                        </div>
                      </div>
                      
                      <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="text-sm text-blue-400">相关操作建议</span>
                          </div>
                        </div>
                        <ul className="text-xs text-blue-300 list-disc pl-5 space-y-1">
                          <li>调查08:00、16:00和20:00时段的异常辐射来源</li>
                          <li>检查设备校准状态，排除测量误差可能</li>
                          <li>查看历史记录，确认是否为重复出现的模式</li>
                          <li>分析辐射源类型与活动的相关性</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {!isRunningAnalysis && analysisComplete && (
                <div className="bg-blue-950 rounded-lg p-4">
                  <h4 className="text-sm text-blue-300 mb-3">异常事件详情</h4>
                  <table className="min-w-full divide-y divide-blue-800">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">时间</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">辐射强度 (μSv/h)</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">检测器</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">异常程度</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">可能原因</th>
                      </tr>
                    </thead>
                    <tbody className="bg-blue-900 bg-opacity-50 divide-y divide-blue-800">
                      <tr className="hover:bg-blue-800 hover:bg-opacity-30">
                        <td className="px-4 py-2 text-sm text-blue-200">08:00</td>
                        <td className="px-4 py-2 text-sm text-blue-200">78.5</td>
                        <td className="px-4 py-2 text-sm text-blue-200">探测器A</td>
                        <td className="px-4 py-2 text-sm">
                          <div className="w-24 bg-blue-800 rounded-full h-2">
                            <div className="h-full rounded-full bg-red-500" style={{ width: '85%' }}></div>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-blue-200">设备校准偏差或活动干扰</td>
                      </tr>
                      <tr className="hover:bg-blue-800 hover:bg-opacity-30">
                        <td className="px-4 py-2 text-sm text-blue-200">16:00</td>
                        <td className="px-4 py-2 text-sm text-blue-200">82.3</td>
                        <td className="px-4 py-2 text-sm text-blue-200">探测器B</td>
                        <td className="px-4 py-2 text-sm">
                          <div className="w-24 bg-blue-800 rounded-full h-2">
                            <div className="h-full rounded-full bg-red-500" style={{ width: '90%' }}></div>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-blue-200">临近辐射源操作活动</td>
                      </tr>
                      <tr className="hover:bg-blue-800 hover:bg-opacity-30">
                        <td className="px-4 py-2 text-sm text-blue-200">20:00</td>
                        <td className="px-4 py-2 text-sm text-blue-200">75.8</td>
                        <td className="px-4 py-2 text-sm text-blue-200">探测器C</td>
                        <td className="px-4 py-2 text-sm">
                          <div className="w-24 bg-blue-800 rounded-full h-2">
                            <div className="h-full rounded-full bg-red-500" style={{ width: '80%' }}></div>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-blue-200">环境干扰或设备故障</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {/* 设备故障预测 */}
          {activeTab === 'failure' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-blue-300 text-sm font-medium">设备故障预测</h3>
                <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-3 rounded flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  更新预测
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-950 rounded-lg p-4 col-span-3">
                  <h4 className="text-sm text-blue-300 mb-3">设备状态预测</h4>
                  <table className="min-w-full divide-y divide-blue-800">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">设备</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">组件</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">故障概率</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">预计时间窗口</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">建议操作</th>
                      </tr>
                    </thead>
                    <tbody className="bg-blue-900 bg-opacity-50 divide-y divide-blue-800">
                      {failurePredictionData.map((item) => (
                        <tr key={item.id} className="hover:bg-blue-800 hover:bg-opacity-30">
                          <td className="px-4 py-2 text-sm text-blue-200">{item.device}</td>
                          <td className="px-4 py-2 text-sm text-blue-200">{item.component}</td>
                          <td className="px-4 py-2 text-sm">
                            <div className="flex items-center">
                              <div className="w-24 bg-blue-800 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-full rounded-full ${
                                    item.probability < 30 ? 'bg-green-500' :
                                    item.probability < 60 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`} 
                                  style={{ width: `${item.probability}%` }}
                                ></div>
                              </div>
                              <span className={`text-xs ${
                                item.probability < 30 ? 'text-green-400' :
                                item.probability < 60 ? 'text-yellow-400' : 'text-red-400'
                              }`}>{item.probability}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-sm text-blue-200">{item.timeWindow}</td>
                          <td className="px-4 py-2 text-sm text-blue-200">
                            {item.probability < 30 ? '正常维护' :
                             item.probability < 60 ? '计划检查' : '立即维修'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-950 rounded-lg p-4">
                  <h4 className="text-sm text-blue-300 mb-3">维护建议</h4>
                  <div className="space-y-3">
                    <div className="bg-red-900 bg-opacity-30 rounded-lg p-3 border border-red-800">
                      <div className="text-sm font-medium text-red-300 mb-1">紧急</div>
                      <div className="text-xs text-blue-200">
                        探测器C的连接模块故障概率高达78%，预计在1-3天内可能出现故障。
                      </div>
                      <button className="mt-2 bg-red-800 hover:bg-red-700 text-red-200 text-xs py-1 px-2 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        安排维修
                      </button>
                    </div>
                    
                    <div className="bg-yellow-900 bg-opacity-30 rounded-lg p-3 border border-yellow-800">
                      <div className="text-sm font-medium text-yellow-300 mb-1">注意</div>
                      <div className="text-xs text-blue-200">
                        探测器B的电池组故障概率为47%，建议在一周内进行检查和维护。
                      </div>
                      <button className="mt-2 bg-yellow-800 hover:bg-yellow-700 text-yellow-200 text-xs py-1 px-2 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        计划维护
                      </button>
                    </div>
                    
                    <div className="bg-green-900 bg-opacity-30 rounded-lg p-3 border border-green-800">
                      <div className="text-sm font-medium text-green-300 mb-1">正常</div>
                      <div className="text-xs text-blue-200">
                        探测器A的传感器状态良好，可按照常规维护计划进行检查。
                      </div>
                      <button className="mt-2 bg-green-800 hover:bg-green-700 text-green-200 text-xs py-1 px-2 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        记录检查
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-950 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm text-blue-300">故障预测方法说明</h4>
                  <div className="flex items-center text-xs text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    AI预测模型信息
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                    <div className="text-sm text-blue-300 mb-2">数据收集</div>
                    <ul className="text-xs text-blue-400 list-disc pl-5 space-y-1">
                      <li>传感器健康状态指标监测</li>
                      <li>设备运行参数实时采集</li>
                      <li>历史故障记录与维护日志</li>
                      <li>环境条件与操作模式数据</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                    <div className="text-sm text-blue-300 mb-2">预测算法</div>
                    <ul className="text-xs text-blue-400 list-disc pl-5 space-y-1">
                      <li>长短期记忆网络(LSTM)时序分析</li>
                      <li>随机森林分类器多参数评估</li>
                      <li>贝叶斯网络故障概率建模</li>
                      <li>基于蒙特卡洛模拟的故障时间预测</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                    <div className="text-sm text-blue-300 mb-2">准确率评估</div>
                    <div className="mb-2">
                      <div className="text-xs text-blue-400 mb-1">模型总体准确率: 87%</div>
                      <div className="w-full bg-blue-800 rounded-full h-1.5">
                        <div className="h-full rounded-full bg-green-500" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="text-xs text-blue-400 mb-1">故障时间预测精度: 82%</div>
                      <div className="w-full bg-blue-800 rounded-full h-1.5">
                        <div className="h-full rounded-full bg-green-500" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-blue-400 mb-1">误报率: 8%</div>
                      <div className="w-full bg-blue-800 rounded-full h-1.5">
                        <div className="h-full rounded-full bg-green-500" style={{ width: '8%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 辐射趋势预测 */}
          {activeTab === 'trend' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-blue-300 text-sm font-medium">辐射趋势预测</h3>
                <div className="flex space-x-2">
                  <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-3 rounded flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    选择时间范围
                  </button>
                  <button className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs py-1 px-3 rounded flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    更新预测
                  </button>
                </div>
              </div>
              
              <div className="bg-blue-950 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm text-blue-300">辐射强度趋势预测</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                      <span className="text-xs text-blue-400">历史数据</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-xs text-blue-400">预测数据</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-6 h-2 bg-green-800 bg-opacity-50 mr-1"></span>
                      <span className="text-xs text-blue-400">置信区间</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendPredictionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2E4A77" />
                      <XAxis 
                        dataKey="day" 
                        stroke="#93C5FD" 
                        fontSize={10}
                        tickFormatter={(value) => (value <= 0 ? `过去${-value}天` : `未来${value}天`)}
                      />
                      <YAxis stroke="#93C5FD" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E3A8A', borderColor: '#3B82F6', color: '#BFDBFE' }}
                        itemStyle={{ color: '#BFDBFE' }}
                        labelStyle={{ color: '#BFDBFE' }}
                        formatter={(value, name, props) => {
                          if (name === 'value') {
                            return [(value as number).toFixed(1), props.payload.type === '历史数据' ? '实际值' : '预测值'];
                          }
                          return [(value as number).toFixed(1), name];
                        }}
                        labelFormatter={(value) => (value <= 0 ? `过去${-value}天` : `未来${value}天`)}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        // @ts-ignore
                        stroke={({ payload }) => (payload.type === '历史数据' ? '#3B82F6' : '#10B981')}// @ts-ignore
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name="value"
                      />
                      <Area
                        type="monotone"
                        dataKey="upperBound"
                        data={trendPredictionData.filter(d => d.day > 0)}
                        stroke="none"
                        fill="#10B981"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="lowerBound"
                        data={trendPredictionData.filter(d => d.day > 0)}
                        stroke="none"
                        fill="#10B981"
                        fillOpacity={0.2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-950 rounded-lg p-4">
                  <h4 className="text-sm text-blue-300 mb-3">15天预测摘要</h4>
                  <div className="space-y-2">
                    <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm text-blue-300">平均值预测</div>
                        <div className="text-sm font-medium text-blue-200">48.6 μSv/h</div>
                      </div>
                      <div className="text-xs text-blue-400">较当前上升 12.4%</div>
                    </div>
                    
                    <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm text-blue-300">最大值预测</div>
                        <div className="text-sm font-medium text-yellow-400">65.3 μSv/h</div>
                      </div>
                      <div className="text-xs text-blue-400">较当前上升 15.8%</div>
                    </div>
                    
                    <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm text-blue-300">预测可靠性</div>
                        <div className="text-sm font-medium text-blue-200">83%</div>
                      </div>
                      <div className="text-xs text-blue-400">基于历史数据模式相似度</div>
                    </div>
                    
                    <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm text-blue-300">超标可能性</div>
                        <div className="text-sm font-medium text-orange-400">中等</div>
                      </div>
                      <div className="text-xs text-blue-400">预计有 35% 概率超过警告阈值</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-950 rounded-lg p-4">
                  <h4 className="text-sm text-blue-300 mb-3">影响因素分析</h4>
                  <table className="min-w-full divide-y divide-blue-800 text-xs">
                    <thead>
                      <tr>
                        <th className="px-2 py-1 text-left font-medium text-blue-300">因素</th>
                        <th className="px-2 py-1 text-left font-medium text-blue-300">影响权重</th>
                        <th className="px-2 py-1 text-left font-medium text-blue-300">变化趋势</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-800">
                      <tr>
                        <td className="px-2 py-1 text-blue-200">设备运行时间</td>
                        <td className="px-2 py-1">
                          <div className="w-16 bg-blue-800 rounded-full h-1.5">
                            <div className="h-full rounded-full bg-blue-500" style={{ width: '85%' }}></div>
                          </div>
                        </td>
                        <td className="px-2 py-1 text-red-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                          增加
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 text-blue-200">校准偏移</td>
                        <td className="px-2 py-1">
                          <div className="w-16 bg-blue-800 rounded-full h-1.5">
                            <div className="h-full rounded-full bg-blue-500" style={{ width: '65%' }}></div>
                          </div>
                        </td>
                        <td className="px-2 py-1 text-yellow-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                          稳定
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 text-blue-200">环境温度</td>
                        <td className="px-2 py-1">
                          <div className="w-16 bg-blue-800 rounded-full h-1.5">
                            <div className="h-full rounded-full bg-blue-500" style={{ width: '40%' }}></div>
                          </div>
                        </td>
                        <td className="px-2 py-1 text-red-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                          增加
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 text-blue-200">运行活动</td>
                        <td className="px-2 py-1">
                          <div className="w-16 bg-blue-800 rounded-full h-1.5">
                            <div className="h-full rounded-full bg-blue-500" style={{ width: '75%' }}></div>
                          </div>
                        </td>
                        <td className="px-2 py-1 text-red-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                          增加
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 text-blue-200">季节因素</td>
                        <td className="px-2 py-1">
                          <div className="w-16 bg-blue-800 rounded-full h-1.5">
                            <div className="h-full rounded-full bg-blue-500" style={{ width: '30%' }}></div>
                          </div>
                        </td>
                        <td className="px-2 py-1 text-blue-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          降低
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-950 rounded-lg p-4">
                  <h4 className="text-sm text-blue-300 mb-3">预防建议</h4>
                  <div className="space-y-2">
                    <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                      <div className="text-sm text-blue-300 mb-1">增加监测频率</div>
                      <div className="text-xs text-blue-400">
                        考虑到预测指标显示辐射水平上升趋势，建议将监测频率从当前的每小时一次增加到每30分钟一次。
                      </div>
                    </div>
                    
                    <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                      <div className="text-sm text-blue-300 mb-1">设备优化校准</div>
                      <div className="text-xs text-blue-400">
                        在预计的高峰期前（预测中的第7-9天）进行设备校准，确保测量精度。
                      </div>
                    </div>
                    
                    <div className="bg-blue-900 rounded-lg p-3 border border-blue-700">
                      <div className="text-sm text-blue-300 mb-1">调整预警阈值</div>
                      <div className="text-xs text-blue-400">
                        临时调整预警阈值，将警告级别从50μSv/h提高到55μSv/h，以适应预期的上升趋势，避免误报。
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-950 rounded-lg p-4">
                <h4 className="text-sm text-blue-300 mb-3">预测模型说明</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-blue-400 mb-2">
                      本趋势预测基于深度学习时间序列模型，综合考虑以下因素:
                    </div>
                    <ul className="text-xs text-blue-300 list-disc pl-5 space-y-1">
                      <li>过去30天的历史辐射水平数据</li>
                      <li>设备维护和校准记录</li>
                      <li>环境因素的周期性影响</li>
                      <li>相似历史模式的匹配分析</li>
                      <li>季节性趋势因素</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="text-xs text-blue-400 mb-2">
                      模型特性:
                    </div>
                    <ul className="text-xs text-blue-300 list-disc pl-5 space-y-1">
                      <li>采用LSTM神经网络捕捉长期和短期依赖关系</li>
                      <li>使用滚动预测方法提高准确性</li>
                      <li>置信区间基于蒙特卡洛模拟计算</li>
                      <li>模型每24小时重新训练，持续优化</li>
                      <li>预测准确率在短期(1-5天)内达到92%，长期(6-15天)为83%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 大屏监控应用
const App = () => {
  // 当前系统时间
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 模态窗口状态
  const [showHistoricalData, setShowHistoricalData] = useState(false);
  const [showAlertThresholds, setShowAlertThresholds] = useState(false);
  const [showNotificationSystem, setShowNotificationSystem] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  // 更新系统时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 更新系统时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 格式化时间显示
  const formatTime = () => {
    return currentTime.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };
  
  const formatDate = () => {
    return currentTime.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  
  // 功能区按钮点击处理
  const handleToolbarButtonClick = (feature) => {
    if (feature === 'history') {
      setShowHistoricalData(true);
    } else if (feature === 'threshold') {
      setShowAlertThresholds(true);
    } else if (feature === 'notification') {
      setShowNotificationSystem(true);
    } else if (feature === 'ai') {
      setShowAIAssistant(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-900 to-blue-950 text-blue-200 overflow-hidden">
      {/* 顶部标题栏 */}
      <header className="bg-blue-950 border-b border-blue-700 py-2 px-4 shadow-lg">
        <div className="flex justify-between items-center">
          {/* 左侧企业名称和系统标题 */}
          <div className="flex items-center space-x-4">
            <div className="text-blue-200 font-bold border-r border-blue-700 pr-4">沈阳云联智测科技有限公司</div>
            <div className="flex items-center">
              <span className="bg-blue-500 w-3 h-3 rounded-full mr-2 animate-pulse"></span>
              <h1 className="text-xl font-bold text-blue-300">辐射监测与设备管理系统</h1>
              <span className="ml-4 text-blue-400 text-sm bg-blue-900 px-2 py-1 rounded">
                综合监控大屏
              </span>
            </div>
          </div>
          
          {/* 功能区 */}
          <div className="flex items-center space-x-2">
            <button 
              className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs px-3 py-1 rounded-md flex items-center"
              onClick={() => handleToolbarButtonClick('history')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              历史数据
            </button>
            <button 
              className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs px-3 py-1 rounded-md flex items-center"
              onClick={() => handleToolbarButtonClick('threshold')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              预警设置
            </button>
            <button 
              className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs px-3 py-1 rounded-md flex items-center"
              onClick={() => handleToolbarButtonClick('notification')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              通知系统
            </button>
            <button 
              className="bg-blue-700 hover:bg-blue-600 text-blue-200 text-xs px-3 py-1 rounded-md flex items-center"
              onClick={() => handleToolbarButtonClick('ai')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI辅助
            </button>
          </div>
          
          {/* 右侧时间和状态信息 */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="bg-blue-900 rounded-md px-3 py-1 text-blue-300">
                {formatDate()}
              </div>
              <div className="ml-3 bg-blue-800 rounded-md px-3 py-1 text-blue-200 font-mono">
                {formatTime()}
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
              <span className="text-green-400 text-sm">系统正常</span>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区 - 分为主体和侧边栏 */}
      <main className="flex-grow flex gap-3 p-3 overflow-hidden">
        {/* 左侧主体内容区域 (75%) */}
        <div className="flex-grow grid grid-cols-8 grid-rows-6 gap-3">
          {/* 顶部行 - 左侧能谱图 (带核素信息) (3x2) */}
          <div className="col-span-3 row-span-2 bg-blue-900 rounded-lg shadow-lg border border-blue-700 relative overflow-hidden p-3">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300 opacity-50"></div>
            
            <div className="h-full flex flex-col">
              {/* 标题栏 */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium text-blue-300 flex items-center">
                  <span className="text-xs bg-blue-800 px-2 py-1 rounded mr-2 text-blue-200">实时</span>
                  核素能谱强度
                </h3>
                <div className="flex items-center text-xs text-blue-400">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  采集中
                </div>
              </div>
              
              {/* 能谱图和核素信息的集成界面 */}
              <div className="flex-grow flex flex-col">
                {/* 能谱图 */}
                <div className="h-3/5 mb-1">
                  <SpectrumDisplay />
                </div>
                
                {/* 核素信息 */}
                <div className="h-2/5 grid grid-cols-2 gap-1 bg-blue-950 bg-opacity-40 p-1 rounded-md">
                  <div className="p-1 flex flex-col justify-center items-center">
                    <div className="text-xs text-blue-400">当前检测核素</div>
                    <div className="text-sm font-bold text-blue-200">Cs-137</div>
                  </div>
                  <div className="p-1 flex flex-col justify-center items-center">
                    <div className="text-xs text-blue-400">辐射强度</div>
                    <div className="text-sm font-bold text-yellow-400">46 <span className="text-xs text-blue-300">μSv/h</span></div>
                  </div>
                  <div className="p-1 flex flex-col justify-center items-center">
                    <div className="text-xs text-blue-400">风险等级</div>
                    <div className="px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-900 text-yellow-300">中等</div>
                  </div>
                  <div className="p-1 flex flex-col justify-center items-center">
                    <div className="text-xs text-blue-400">警报状态</div>
                    <div className="flex items-center text-green-400">
                      <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                      <span className="text-xs font-medium">正常</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 顶部行 - 右侧趋势图 (5x2) */}
          <div className="col-span-5 row-span-2 bg-blue-900 rounded-lg shadow-lg border border-blue-700 relative overflow-hidden p-3">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-300 to-teal-300 opacity-50"></div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-medium text-blue-300 flex items-center">
                <span className="text-xs bg-blue-800 px-2 py-1 rounded mr-2 text-blue-200">趋势</span>
                辐射强度历史变化
              </h3>
              <div className="flex items-center text-xs text-blue-400">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                15秒更新
              </div>
            </div>
            <div className="h-full">
              <TrendDisplay />
            </div>
          </div>
          
          {/* 中间和底部 - 热力图 (8x4) */}
          <div className="col-span-8 row-span-4 bg-blue-900 rounded-lg shadow-lg border border-blue-700 relative overflow-hidden p-3">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400 opacity-50"></div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-medium text-blue-300 flex items-center">
                <span className="text-xs bg-blue-800 px-2 py-1 rounded mr-2 text-blue-200">空间</span>
                区域辐射剂量热力图
              </h3>
              <HeatmapDataPanel />
            </div>
            <div className="h-full">
              <HeatmapDisplay />
            </div>
          </div>
        </div>
        
        {/* 右侧边栏 - 设备管理区域 (25%) */}
        <div className="w-1/4 bg-blue-900 rounded-lg shadow-lg border border-blue-700 relative overflow-hidden p-3">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400 opacity-50"></div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-medium text-blue-300 flex items-center">
              <span className="text-xs bg-blue-800 px-2 py-1 rounded mr-2 text-blue-200">设备</span>
              设备管理中心
            </h3>
            <div className="flex items-center text-xs text-blue-400">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
              在线
            </div>
          </div>
          
          {/* 设备管理内容 */}
          <div className="h-full flex flex-col">
            {/* 设备概览 */}
            <div className="mb-3">
              <div className="text-xs text-blue-400 mb-2 flex justify-between items-center">
                <span>设备概览</span>
                <span className="px-2 py-0.5 bg-blue-800 rounded text-blue-200">总数: 5</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-blue-950 rounded p-1 text-center">
                  <div className="text-green-400 text-lg font-bold">3</div>
                  <div className="text-xs text-blue-300">在线</div>
                </div>
                <div className="bg-blue-950 rounded p-1 text-center">
                  <div className="text-red-400 text-lg font-bold">1</div>
                  <div className="text-xs text-blue-300">离线</div>
                </div>
                <div className="bg-blue-950 rounded p-1 text-center">
                  <div className="text-yellow-400 text-lg font-bold">1</div>
                  <div className="text-xs text-blue-300">维护</div>
                </div>
              </div>
            </div>
            
            {/* 设备列表 - 占据空间直到设备类型分布 */}
            <div className="mb-3" style={{ height: "calc(100% - 400px)", minHeight: "200px" }}>
              <DeviceManagement />
            </div>
            
            {/* 设备类型分布 */}
            <div className="mb-3">
              <div className="text-xs text-blue-400 mb-2">设备类型分布</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="text-blue-300">伽马能谱仪</div>
                  <div className="flex items-center space-x-1">
                    <div className="h-1.5 w-16 bg-blue-900 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '40%' }}></div>
                    </div>
                    <div className="text-blue-200">2</div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="text-blue-300">伽马盖革管</div>
                  <div className="flex items-center space-x-1">
                    <div className="h-1.5 w-16 bg-blue-900 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '40%' }}></div>
                    </div>
                    <div className="text-blue-200">2</div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="text-blue-300">中子探测仪</div>
                  <div className="flex items-center space-x-1">
                    <div className="h-1.5 w-16 bg-blue-900 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '20%' }}></div>
                    </div>
                    <div className="text-blue-200">1</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 云端校准状态 */}
            {/* 云端校准状态 - 确保完全可见并有足够空间显示所有内容 */}
            <div className="pt-3">
              <div className="text-xs text-blue-400 mb-2 flex justify-between items-center">
                <span>校准状态</span>
                <div className="flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                  <span className="text-green-400">已校准</span>
                </div>
              </div>
              
              <CalibrationPanel />
              
              {/* 设备管理操作按钮 - 确保完全可见 */}
              <div className="mt-3 grid grid-cols-2 gap-2 mb-10">
                <button className="bg-blue-700 text-blue-200 p-1.5 rounded hover:bg-blue-600 transition-colors text-xs text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  添加新设备
                </button>
                <button className="bg-blue-700 text-blue-200 p-1.5 rounded hover:bg-blue-600 transition-colors text-xs text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  扫描周边设备
                </button>
                <button className="bg-blue-700 text-blue-200 p-1.5 rounded hover:bg-blue-600 transition-colors text-xs text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                  WiFi设置
                </button>
                <button className="bg-blue-700 text-blue-200 p-1.5 rounded hover:bg-blue-600 transition-colors text-xs text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  蓝牙配对
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* 底部状态栏 */}
      <footer className="bg-blue-950 border-t border-blue-800 py-1 px-4 text-xs text-blue-400 flex justify-between items-center">
        <div>
          辐射监测与设备管理系统 © 2025
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
            探测器连接正常
          </div>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
            云端服务正常
          </div>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
            数据采集中
          </div>
        </div>
      </footer>
      
      {/* 模态窗口组件 */}
      <HistoricalDataAnalysis 
        isOpen={showHistoricalData} 
        onClose={() => setShowHistoricalData(false)} 
      />
      
      <AlertThresholdSettings 
        isOpen={showAlertThresholds} 
        onClose={() => setShowAlertThresholds(false)} 
      />
      
      <NotificationSystem 
        isOpen={showNotificationSystem} 
        onClose={() => setShowNotificationSystem(false)} 
      />
      
      <AIAssistant 
        isOpen={showAIAssistant} 
        onClose={() => setShowAIAssistant(false)} 
      />
    </div>
  );
};

export default App;
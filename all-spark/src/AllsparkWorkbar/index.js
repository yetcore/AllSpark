import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import styles from './Common.module.scss';

const AllsparkWork = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapData, setMapData] = useState([
        { name: '北京市', value: 25, coords: [116.405285, 39.904989] },
        { name: '上海市', value: 2, coords: [121.472644, 31.231706] },
        { name: '广东省', value: 4, coords: [113.280637, 23.125178] },
        { name: '四川省', value: 5, coords: [104.065735, 30.659462] },
        { name: '陕西省', value: 0, coords: [108.948024, 34.263161] },
        { name: '浙江省', value: 2, coords: [120.153576, 30.287459] },
    ]);

    useEffect(() => {
        fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
          .then((response) => response.json())
          .then((data) => {
            echarts.registerMap('china', data);
            setMapLoaded(true); 
          });
    }, []);

    if (!mapLoaded) {
        return <div>Loading map...</div>;
    }

    const getOption = () => ({
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                type: 'map',
                map: 'china',
                roam: false,
                selectedMode: 'single',
                data: mapData,
            },
        ],
        graphic: selectedRegion ? [
            {
                type: 'line',
                shape: {
                    x1: selectedRegion.pixelCoords[0],
                    y1: selectedRegion.pixelCoords[1],
                    x2: selectedRegion.pixelCoords[0] + 20,
                    y2: selectedRegion.pixelCoords[1] - 20,
                },
                style: {
                    stroke: '#317FEFFF',
                    lineWidth: 2,
                },
            },
            {
                type: 'rect',
                shape: {
                    x: selectedRegion.pixelCoords[0] + 20,
                    y: selectedRegion.pixelCoords[1] - 40,
                    width: 100,
                    height: 50,
                },
                style: {
                    fill: '#ffffff',
                    stroke: '#000',
                },
            },
            {
                type: 'text',
                style: {
                    text: selectedRegion.name,
                    x: selectedRegion.pixelCoords[0] + 30,
                    y: selectedRegion.pixelCoords[1] - 30,
                    fill: '#000',
                },
            },
        ] : [],
    });

    const onChartClick = (params, chartInstance) => {
        const selectedData = mapData.find(item => item.name === params.name);
        mapData.map((item) => ({
            ...item,
            itemStyle: item.name === params.name ? { areaColor: '#317FEFFF' } : {}, }))
        if (selectedData) {
            const pixelCoords = chartInstance.convertToPixel({ seriesIndex: 0 }, selectedData.coords);
            setSelectedRegion({ ...selectedData, pixelCoords });
        }
    };

    return (
        <div>
            <h2 className={styles.title}>工作室就业</h2>
            <ReactECharts
                option={getOption()}
                onEvents={{
                    'click': (params, echartsInstance) => onChartClick(params, echartsInstance),
                }}
                className={styles.map}
            />
            {selectedRegion && (
                <div className="info-box">
                    <h3>{selectedRegion.name}</h3>
                    {/* 显示更多信息 */}
                </div>
            )}
        </div>
    );
}

export default AllsparkWork;

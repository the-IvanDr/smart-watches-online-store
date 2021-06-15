import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from 'react-redux';
import { OrderActions } from '../../redux/actions/adminActions';

import { AdminPannelField, AdminPannelViewItem, AdminPannelViewWrapper, Button, RedButton, ReturnButton } from '../AdminPannel';



export default function AdminOrdersCharts() {

    const orders = useSelector(state => state.admin.orders.list);

    useEffect(() => {
        console.log('Визуализация данных:', orders);
    })

    const dispatch = useDispatch();


    const incomeChartRef = useRef();
    const productPopularityRef = useRef();
    const ordersByCitiesRef = useRef();


    const initIncomeChart = () => {
        incomeChartRef.current.parentNode.style.height = '400px';

        const currentMonth = new Date().getMonth();
        const monthsIncome = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        orders.forEach(item => monthsIncome[new Date(item.time).getMonth()] += item.total_price);

        return new Chart(incomeChartRef.current, {
            type: 'line',
            data: {
                labels: monthsIncome.map((item, index) => {
                    // if (index > currentMonth) return;
                    if (index === 0) return 'Январь';
                    if (index === 1) return 'Февраль';
                    if (index === 2) return 'Март';
                    if (index === 3) return 'Апрель';
                    if (index === 4) return 'Май';
                    if (index === 5) return 'Июнь';
                    if (index === 6) return 'Июль';
                    if (index === 7) return 'Август';
                    if (index === 8) return 'Сентябрь';
                    if (index === 9) return 'Октябрь';
                    if (index === 10) return 'Ноябрь';
                    if (index === 11) return 'Декабрь';
                }),
                datasets: [{
                    label: 'Общая прибыль (грн)',
                    data: monthsIncome.map((item, index) => {
                        if (index > currentMonth) return;
                        return item;
                    }),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    const initProductPopularityChart = () => {
        let totalAmount = 0;
        let childCatAmount = 0;
        let manCatAmount = 0;
        let womanldCatAmount = 0;

        orders.forEach((item) => {
            item.products.forEach(product => {
                if (product.is_for_kids) childCatAmount++;
                if (product.is_for_man) manCatAmount++;
                if (product.is_for_woman) womanldCatAmount++;
                totalAmount++;
            });
        });

        const childCatPercent = (childCatAmount / totalAmount) * 100;
        const manCatPercent = (manCatAmount / totalAmount) * 100;
        const womanCatPercent = (womanldCatAmount / totalAmount) * 100;


        productPopularityRef.current.parentNode.style.height = '400px';
        return new Chart(productPopularityRef.current, {
            type: 'pie',
            data: {
                labels: [
                    'Детские',
                    'Мужские',
                    'Женские',
                ],
                datasets: [{
                    label: 'Популярность категорий товаров',
                    data: [childCatPercent, manCatPercent, womanCatPercent],
                    backgroundColor: [
                        'rgb(255, 205, 86)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 99, 132)'
                    ],
                    hoverOffset: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    const initOrdersByCitiesChart = () => {


        const cities = new Set();
        orders.forEach(item => cities.add(item.city));
        let ordersByCities = [];

        cities.forEach(city => {
            const cities = orders.filter(order => order.city === city);
            const totalIncome = cities.length > 1 ? cities.reduce((a, b) => a.total_price + b.total_price) : cities[0].total_price;

            ordersByCities.push({ city, totalIncome });
        });

        ordersByCities = ordersByCities.sort((a, b) => b.totalIncome - a.totalIncome);

        console.log('ordersByCities', ordersByCities);


        ordersByCitiesRef.current.parentNode.style.height = ordersByCities.length * 80 + 'px';//'400px';
        return new Chart(ordersByCitiesRef.current, {
            type: 'bar',
            data: {
                labels: ordersByCities.map(item => item.city),
                datasets: [{
                    label: 'Общая прибыль по городам (грн)',
                    data: ordersByCities.map(item => item.totalIncome),
                    borderWidth: 1,
                    barThickness: 50,
                    backgroundColor: 'rgb(30, 144, 255)',
                    hoverBackgroundColor: 'rgba(30, 144, 255, 0.8)'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }


    useEffect(() => {
        initIncomeChart();
        initProductPopularityChart();
        initOrdersByCitiesChart();

    }, [incomeChartRef, productPopularityRef]);


    return (
        <div className='AdminOrdersCharts'>
            <AdminPannelField>
                <ReturnButton onClick={() => dispatch(OrderActions.openList())} />
            </AdminPannelField>
            <AdminPannelField title='Общая прибыль (грн)'>
                <div className="chart-container" styles={{
                    position: 'relative',
                    height: '10vh',
                    width: '80vw'
                }}>
                    <canvas ref={incomeChartRef}></canvas>
                </div>
            </AdminPannelField>

            <AdminPannelField title='Общая прибыль по городам (грн)'>
                <div className="chart-container" styles={{
                    position: 'relative',
                    height: '10vh',
                    width: '80vw'
                }}>
                    <canvas ref={ordersByCitiesRef}></canvas>
                </div>
            </AdminPannelField>

            <AdminPannelField title='Популярность категорий'>
                <div className="chart-container" styles={{
                    position: 'relative',
                    height: '10vh',
                    width: '80vw'
                }}>
                    <canvas ref={productPopularityRef}></canvas>
                </div>
            </AdminPannelField>            
        </div>
    )
}
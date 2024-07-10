import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { toyService } from '../services/toy.service.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Toy Price Stats',
        },
    },
}

export function Dashboard() {
    const [data, setData] = useState(null)
    const [priceData, setPriceData] = useState(null)

    useEffect(() => {
        toyService.getImportanceStats().then(stats => {
            const labels = stats.map(stat => stat.label)
            const toyAmount = stats.map(stat => stat.toyAmount)
            const avgPrice = stats.map(stat => stat.avgPrice)

            const chartData = {
                labels,
                datasets: [
                    {
                        label: 'Toy Amount ',
                        data: toyAmount,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    }
                ],
            }

            const priceChartData = {
                labels,
                datasets: [
                    {
                        label: 'Average Price',
                        data: avgPrice,
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                    }
                ],
            }

            setData(chartData)
            setPriceData(priceChartData)
        })
    }, [])

    if (!data || !priceData) return <div>Loading...</div>

    return (
        <div>
            <Bar options={options} data={data} style={{ width: '80vw', height: '40vh' }} />
            <Bar options={{ ...options, title: { display: true, text: 'Average Price per Label' } }} data={priceData} style={{ width: '80vw', height: '40vh', marginTop: '20px' }} />
        </div>
    )
}

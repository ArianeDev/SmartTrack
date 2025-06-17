import api from "../../Service/api";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "../../Componets/Header";
import { Table } from "../../Componets/Table";
import './style.sass';

export function DataSensor(){
	const token = localStorage.getItem('token');
	const [sensorData, setSensorData] = useState([]);
	const [nextPage, setNextPage] = useState(null);
	const [prevPage, setPrevPage] = useState(null);
	const sensor_type = localStorage.getItem("selectedSensor");

	// items the in header
    const linkHeader = [
        {
            "name": "Home",
            "link": "/home"
        },
        {
            "name": "Histórico",
            "link": "/history"
        }
		,
        {
            "name": "Sair",
            "link": "/sair"
        }
    ]
	const listColumns = [
		{
			"key": "type_sensors",
			"label": "type_sensors"
		},
		{
			"key": "mac_address",
			"label": "mac_address"
		},
		{
			"key": "unit_measure",
			"label": "unit_measure"
		},
		{
			"key": "longitude",
			"label": "longitude"
		},
		{
			"key": "latitude",
			"label": "latitude"
		},
		{
			"key": "status",
			"label": "status"
		}
	]

	async function getSensors(pageUrl = "/sensors") {
        try {
            const response = await api.get(pageUrl, {
				params: sensor_type ? { type_sensors: sensor_type } : {},
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
            setSensorData(response.data.results);
			setNextPage(response.data.next);
			setPrevPage(response.data.previous);
        } catch (error) {
			console.error("Erro ao buscar sensores: ", error);
        }
    }
	
	useEffect(() => {
		getSensors();
	}, []);
	console.log(sensorData)

	return (
		<>
			<Header linkHeader={linkHeader} />
			<main className='container-table'>
				<div className="table-header">
					<h2>{sensor_type}</h2>
					<div className="buttons">
						<button disabled={!prevPage} onClick={() => getSensors(prevPage)}><ChevronLeft /></button>
						<button disabled={!nextPage} onClick={() => getSensors(nextPage)}><ChevronRight /></button>
					</div>
				</div>
				<Table data={sensorData} columns={listColumns} />
			</main>
			
		</>
	)
}

// Arrumar hover das setas, status, home
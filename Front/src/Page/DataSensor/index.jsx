import api from "../../Service/api";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "../../Componets/Header";
import { Table } from "../../Componets/Table";
import './style.sass';
import { MenuActions } from "../../Componets/MenuActions";

export function DataSensor(){
	// sensor data
	const [typeSensors, setTypeSensors] = useState('');
	const [macAddress, setMacAddress] = useState('');
	const [unitMeasure, setUnitMeasure] = useState('');
	const [lagitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [status, setStatus] = useState('');

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
			"label": "Tipo do sensor"
		},
		{
			"key": "mac_address",
			"label": "Mac address"
		},
		{
			"key": "unit_measure",
			"label": "Unidade de medida"
		},
		{
			"key": "longitude",
			"label": "Longitude"
		},
		{
			"key": "latitude",
			"label": "Latitude"
		},
		{
			"key": "status",
			"label": "Status"
		}
	]
	const listUpdate = [
		{
			"title": "Atualizar",
			"listForms": [
				{
					"nameLabel": "Tipo do sensor:",
					"type": "text",
					"placeholder": "",
					"atributo": typeSensors,
					setFunction: setTypeSensors
				},
				{
					"nameLabel": "Mac address:",
					"type": "text",
					"placeholder": "",
					"atributo": macAddress,
					setFunction: setMacAddress
				},
				{
					"nameLabel": "Unidade de medida:",
					"type": "text",
					"placeholder": "",
					"atributo": unitMeasure,
					setFunction: setUnitMeasure
				},
				{
					"nameLabel": "Longitude:",
					"type": "text",
					"placeholder": "",
					"atributo": longitude,
					setFunction: setLongitude
				},
				{
					"nameLabel": "Unidade de medida:",
					"type": "text",
					"placeholder": "",
					"atributo": unitMeasure,
					setFunction: setUnitMeasure
				}
			],
			"buttonTitle": "Atualizar",
			"method": "put",
			"methodFunction": "",
			"error": ""
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
				<Table data={sensorData} columns={listColumns} listForms={listUpdate}/>
				<MenuActions />
			</main>			
		</>
	)
}

// Arrumar hover das setas, status, home
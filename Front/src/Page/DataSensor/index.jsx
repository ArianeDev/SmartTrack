import api from "../../Service/api";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "../../Componets/Header";
import { Table } from "../../Componets/Table";
import './style.sass';
import { MenuActions } from "../../Componets/MenuActions";

export function DataSensor(){
	// sensor data
	const [selectedId, setSelectedId] = useState(null);
	const [type_sensors, setTypeSensors] = useState('');
	const [mac_address, setMacAddress] = useState('');
	const [unit_measure, setUnitMeasure] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [status, setStatus] = useState('');

	const token = localStorage.getItem('token');
	const [sensorData, setSensorData] = useState([]);
	const [nextPage, setNextPage] = useState(null);
	const [prevPage, setPrevPage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);
	const sensor_type = localStorage.getItem("selectedSensor");

	// header items
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

	// function for fill in the modal
	function handleSelectSensor(sensor) {
		setSelectedId(sensor.id);
		setTypeSensors(sensor.type_sensors);
		setMacAddress(sensor.mac_address);
		setUnitMeasure(sensor.unit_measure);
		setLatitude(sensor.latitude);
		setLongitude(sensor.longitude);
		setStatus(sensor.status);
	}

	// Sensor get
	async function getSensors(pageUrl = "/sensors") {
        try {
			setIsLoading(true)
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
        } finally {
			setIsLoading(false)
		}
    }

	// Sensor Update 
	const submitUpdateSensor = async () => {
		const updateSensor = {
			type_sensors,
			mac_address,
			unit_measure,
			longitude,
			latitude,
			status
		}
		try{
			const response = await api.put(`/sensor/${selectedId}/`, updateSensor, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			window.alert("Atualizado com sucesso!", response.data);
			window.location.reload();
		} catch (error) {
			console.log("Dados enviados:", updateSensor);
			window.alert("Erro ao atualizar.", error)
		}
	}

	const handleSubmitUpdate = (e) => {
		e.preventDefault();
		submitUpdateSensor();
	}

	const listUpdate = [
		{
			"title": "Atualizar",
			"listForms": [
				{
					"nameLabel": "Tipo do sensor:",
					"type": "text",
					"placeholder": "",
					"atributo": type_sensors,
					setFunction: setTypeSensors,
					"disabled": true
				},
				{
					"nameLabel": "Mac address:",
					"type": "text",
					"placeholder": "",
					"atributo": mac_address,
					setFunction: setMacAddress
				},
				{
					"nameLabel": "Unidade de medida:",
					"type": "text",
					"placeholder": "",
					"atributo": unit_measure,
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
					"nameLabel": "Latitude:",
					"type": "text",
					"placeholder": "",
					"atributo": latitude,
					setFunction: setLatitude
				},
				{
					"nameLabel": "Status:",
					"type": "text",
					"placeholder": "",
					"atributo": status,
					setFunction: setStatus
				},
			],
			"buttonTitle": "Atualizar",
			"method": "put",
			"methodFunction": handleSubmitUpdate,
			"error": ""
		}
	]

	// Register Sensor
	const submitRegisterSensor = async () => {
		const registerSensor = {
			type_sensors,
			mac_address,
			unit_measure,
			longitude,
			latitude,
			status
		}
		try {
			const response = await api.post('/sensors/', registerSensor, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			window.alert("Sensor cadastrado com sucesso", response.data);
			window.location.reload();
		} catch (error) {
			window.alert("Erro na requisição", error);
		}
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		if (type_sensors) {
			submitRegisterSensor();
		} else {
			window.alert("Preencha todos os campos!")
		}
	}

	const listRegister = [
		{
			"title": "Cadastrar",
			"listForms": [
				{
					"nameLabel": "Tipo do sensor:",
					"type": "text",
					"placeholder": "Digite o tipo do sensor...",
					"atributo": type_sensors,
					setFunction: setTypeSensors
				},
				{
					"nameLabel": "Mac address:",
					"type": "text",
					"placeholder": "__:__:__:__:__:__",
					"atributo": mac_address,
					setFunction: setMacAddress
				},
				{
					"nameLabel": "Unidade de medida:",
					"type": "text",
					"placeholder": "Digite a unidade de medida...",
					"atributo": unit_measure,
					setFunction: setUnitMeasure
				},
				{
					"nameLabel": "Latitude:",
					"type": "text",
					"placeholder": "Digite a latitude...",
					"atributo": latitude,
					setFunction: setLatitude
				},
				{
					"nameLabel": "Longitude:",
					"type": "text",
					"placeholder": "Digite a longitude...",
					"atributo": longitude,
					setFunction: setLongitude
				},
				{
					"nameLabel": "Status:",
					"type": "text",
					"placeholder": "Digite o status...",
					"atributo": status,
					setFunction: setStatus
				},
			],
			"buttonTitle": "Cadastrar",
			"method": "post",
			"methodFunction": handleSubmit,
			"error": ""
		}
	]

	// Delete Sensor

	// Export sensor data
	const exportDataSensor = async () => {
		try {
			const response = await api.get(`export/sensors/`, {
				params: sensor_type ? { type_sensors: sensor_type } : {},
				headers: {
					Authorization: `Bearer ${token}`,
				},
				responseType: 'blob',
			});

			const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
			
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `${sensor_type}.xlsx`);
			document.body.appendChild(link);
			link.click();
			link.remove();

			window.alert("Exportado com sucesso!", response.data);

		} catch (error) {
			console.error("Erro ao exportar Excel:", error);
			window.alert("Erro na requisição", error);
		}
	}
	
	useEffect(() => {
		const fetchData = async () => {
			await getSensors();
			setInitialLoading(false)
		}
		fetchData();
	}, []);

	return (
		<>
			<Header linkHeader={linkHeader} />
			<main className='container-table'>
				<div className="table-header">
					<h2>{sensor_type}</h2>
					<div className="buttons">
						<button 
							disabled={!prevPage} 
							onClick={() => getSensors(prevPage)}
							className={`nav-btn ${!prevPage ? 'disabled' : ''}`}
						>
							<ChevronLeft />
						</button>
						<button 
							disabled={!nextPage} 
							onClick={() => getSensors(nextPage)}
							className={`nav-btn ${!nextPage ? 'disabled' : ''}`}
						>
							<ChevronRight />
						</button>
					</div>
				</div>
				<div className="filters">
					<Table 
						data={sensorData}
						columns={listColumns}
						listForms={listUpdate}
						onSelect={handleSelectSensor}
						loading={initialLoading}
						urlType="S"
						
					/>
				</div>
				<MenuActions 
					listRegister={listRegister}
					exportExcel={exportDataSensor}
					page="S"
					urlType="sensors"
				/>
			</main>
		</>
	)
}

// Arrumar status, home, cadastro(colocar sensor automatico), deletar e histórico
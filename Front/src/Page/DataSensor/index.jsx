import api from "../../Service/api";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from "../../Componets/Footer";
import { Header } from "../../Componets/Header";
import { MenuActions } from "../../Componets/MenuActions";
import { Table } from "../../Componets/Table";
import { TourProvider } from '@reactour/tour';
import { z } from "zod";
import './style.sass';

export function DataSensor(){
	// local storage data
	const sensor_type = localStorage.getItem("selectedSensor");
	const token = localStorage.getItem('token');

	// sensor data
	const [selectedId, setSelectedId] = useState(null);
	const [type_sensors, setTypeSensors] = useState(sensor_type?.toLowerCase() || '');
	const [mac_address, setMacAddress] = useState('');
	const [unit_measure, setUnitMeasure] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [status, setStatus] = useState('');

	// Sensor data
	const [sensorData, setSensorData] = useState([]);
	const [nextPage, setNextPage] = useState(null);
	const [prevPage, setPrevPage] = useState(null);

	// animation
	const [isLoading, setIsLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);

	// tutorial de como usar o button
    const steps = [
		{
			selector: '#BtnFirst',
			content: 'Clique aqui para ver as funções.',
		},
		{
			selector: '#RegisterItems',
			content: 'Clique aqui para cadastrar novos dados.',
		},
		{
			selector: '#UploadItems',
			content: 'Este botão exporta os dados em Excel.',
		},
		{
			selector: '#ImportItems',
			content: 'Use este para importar dados via planilha.',
		},
	];

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
            "link": "/"
        }
    ]
	// list of columns for the table
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
	// list of inputs for the forms
	const listInputsForms = [
		{
			"nameLabel": "Tipo do sensor:",
			"type": "text",
			"placeholder": "Digite o tipo do sensor...",
			"atributo": type_sensors,
			setFunction: setTypeSensors,
			disabled: true
		},
		{
			"nameLabel": "Mac address:",
			"type": "mac",
			"placeholder": "__:__:__:__:__:__",
			"atributo": mac_address,
			setFunction: setMacAddress
		},
		{
			"nameLabel": "Unidade de medida:",
			"type": "text",
			"placeholder": "Digite a unidade de medida...",
			"atributo": unit_measure,
			setFunction: setUnitMeasure,
			disabled: true
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
	];

	const sensorSchema = z.object({
		type_sensors: z.enum(['temperatura', 'contador', 'luminosidade', 'umidade'], {
			errorMap: () => ({ message: "Tipo do sensor inválido. Digite temperatura, contador, luminosidade ou umidade"})
		}),
		mac_address: z.string()
			.min(1, "Mac address é obrigatório"),
		unit_measure: z.string().min(1, "Unidade de medida é obrigatória"),
		status: z.enum(['ativo', 'inativo', 'false', 'true'], {
			errorMap: () => ({ message: "Tipo do status inválido"})
		}),
	});

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

	// function for clear the modal
	function handleClearForm() {
		setMacAddress('');
		setLatitude('');
		setLongitude('');
		setStatus('');
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

	// Register Sensor
	const submitRegisterSensor = async () => {
		const registerSensor = {
			type_sensors: type_sensors.toLowerCase(),
			mac_address,
			unit_measure: unit_measure,
			longitude,
			latitude,
			status: status.toLowerCase()
		}
		const result = sensorSchema.safeParse(registerSensor);

		if (!result.success) {
			const firstError = result.error.errors[0].message;
			window.alert(`Erro de validação: ${firstError}`);
			return;
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
			"listForms": listInputsForms,
			"buttonTitle": "Cadastrar",
			"method": "post",
			"methodFunction": handleSubmit,
			"error": ""
		}
	]

	// Sensor Update 
	const submitUpdateSensor = async () => {
		const updateSensor = {
			type_sensors: type_sensors.toLowerCase(),
			mac_address,
			unit_measure,
			longitude,
			latitude,
			status: status.toLowerCase()
		}
		const result = sensorSchema.safeParse(updateSensor);

		if (!result.success) {
			const firstError = result.error.errors[0].message;
			window.alert(`Erro de validação: ${firstError}`);
			return;
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
			"listForms": listInputsForms,
			"buttonTitle": "Atualizar",
			"method": "put",
			"methodFunction": handleSubmitUpdate,
			"error": ""
		}
	]

	useEffect(() => {
		if (sensor_type === 'temperatura') setUnitMeasure('°C');
		else if (sensor_type === 'luminosidade') setUnitMeasure('lux');
		else if (sensor_type === 'umidade') setUnitMeasure('%');
		else if (sensor_type === 'contador') setUnitMeasure('uni');
	}, []);

	// Delete Sensor
	const submitDeleteSensor = async (id) => {
		try {
			const response = await api.delete(`/sensor/${id}/`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			console.log(response);
			
			getSensors();
		} catch (error) {
			window.alert("Não foi possível deletar o sensor!", error)
		}
	}

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
		<TourProvider steps={steps}>
			<Header linkHeader={linkHeader} />
			<main className='container-table'>
				<div className="table-header">
					<h2>{sensor_type}</h2>
					<div className="buttons">
						<button 
							title="Anterior"
							disabled={!prevPage} 
							onClick={() => getSensors(prevPage)}
							className={`nav-btn ${!prevPage ? 'disabled' : ''}`}
						>
							<ChevronLeft />
						</button>
						<button 
							title="Próximo"
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
						submitDelete={submitDeleteSensor}
						listForms={listUpdate}
						onSelect={handleSelectSensor}
						loading={initialLoading}
						urlType="S"
						
					/>
				</div>
				<MenuActions 
					listRegister={listRegister}
					exportExcel={exportDataSensor}
					clearForms={handleClearForm}
					page="S"
					urlType="sensors"
				/>
			</main>
			<Footer />
		</TourProvider>
	)
}
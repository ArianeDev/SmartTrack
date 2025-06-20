import api from "../../Service/api";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from '../../Componets/Footer' 
import { Header } from "../../Componets/Header";
import { Table } from "../../Componets/Table";
import { MenuActions } from "../../Componets/MenuActions";
import './style.sass';
import { Filters } from "../../Componets/Filters";

export function DataHistory(){
	const token = localStorage.getItem('token');
	const [historyData, setHistoryData] = useState([]);
	const [nextPage, setNextPage] = useState(null);
	const [prevPage, setPrevPage] = useState(null);
	// filters
	const [selectedTypeSensor, setSelectedTypeSensor] = useState('');
	const [selectedDate, setSelectedDate] = useState('');

	// header items
	const linkHeader = [
		{
			"name": "Home",
			"link": "/home"
		},
		{
			"name": "Histórico",
			"link": "/history"
		},
		{
			"name": "Sair",
			"link": "/sair"
		}
	]
	const listColumns = [
		{
			"key": "sensor",
			"label": "Sensor"
		},
		{
			"key": "ambient",
			"label": "Ambiente"
		},
		{
			"key": "value",
			"label": "Valor"
		},
		{
			"key": "timestamp",
			"label": "Data"
		}
	]

	// get History
	async function getHistorys(pageUrl = "/historys/") {
		try {
			const params = {}

			if (selectedTypeSensor) params.type_sensors = selectedTypeSensor;
			if (selectedDate) params.timestamp = selectedDate;

			const response = await api.get(pageUrl, {
				headers: {
					Authorization: `Bearer ${token}`
				},
				params
			})

			const historyMap = response.data.results.map(item => {
				const date = new Date(item.timestamp);
				const formattedDate = date.toLocaleString('pt-BR', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit'
				});

				return {
					// data selected from history
					sensor: item.sensor_name,
					ambient: item.ambient_name,
					value: item.value,
					timestamp: formattedDate 
				};
			});

			setHistoryData(historyMap);
			setNextPage(response.data.next);
			setPrevPage(response.data.previous);
		} catch (error) {
			console.error("Erro ao buscar históricos: ", error.response?.data || error.message);
			window.alert("Não foi encontrado nenhum resgistro");
		}
	}
	
	// Export data history
	const exporHistorySensor = async () => {
		try {
			const response = await api.get(`export/history/`, {
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
			link.setAttribute('download', `History.xlsx`);
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
		getHistorys();
	}, []);
	console.log(historyData)

	return (
		<>
			<Header linkHeader={linkHeader} />
			<main className='container-table'>
				<div className="table-header">
					<h2>Histórico</h2>
					<div className="buttons">
						<button 
							title="Anterior"
							disabled={!prevPage} 
							onClick={() => getHistorys(prevPage)}
							className={`nav-btn ${!prevPage ? 'disabled' : ''}`}
						>
							<ChevronLeft />
						</button>
						<button 
							title="Próximo"
							disabled={!nextPage} 
							onClick={() => getHistorys(nextPage)}
							className={`nav-btn ${!nextPage ? 'disabled' : ''}`}
						>
							<ChevronRight />
						</button>
					</div>
				</div>
				<div className="filters">
					<Filters 
						selectedTypeSensor={selectedTypeSensor} 
						selectedDate={selectedDate} 
						setSelectedTypeSensor={setSelectedTypeSensor} 
						setSelectedDate={setSelectedDate}
						getHistorys={getHistorys}
					/>
				</div>
				<Table 
					data={historyData} 
					columns={listColumns} 
					rlType="history"
				/>
				<MenuActions 
					listRegister=""
					exportExcel={exporHistorySensor}
					urlType="history"
				/>
			</main>
			<Footer />
		</>
	)
}
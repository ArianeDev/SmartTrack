import api from "../../Service/api";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "../../Componets/Header";
import { Table } from "../../Componets/Table";
import './style.sass';

export function DataHistory(){
	const token = localStorage.getItem('token');
	const [historyData, setHistoryData] = useState([]);
	const [nextPage, setNextPage] = useState(null);
	const [prevPage, setPrevPage] = useState(null);

	// items the in header
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

	async function getHistorys(pageUrl = "/history") {
		try {
			const response = await api.get(pageUrl, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			setHistoryData(response.data.results);
			setNextPage(response.data.next);
			setPrevPage(response.data.previous);
		} catch (error) {
			console.error("Erro ao buscar históricos: ", error);
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
						<button disabled={!prevPage} onClick={() => getHistorys(prevPage)}><ChevronLeft /></button>
						<button disabled={!nextPage} onClick={() => getHistorys(nextPage)}><ChevronRight /></button>
					</div>
				</div>
				<Table data={historyData} columns={listColumns} />
			</main>
		</>
	)
}
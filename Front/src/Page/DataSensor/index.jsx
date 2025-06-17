import { Table } from "../../Componets/Table";
import { Header } from "../../Componets/Header";
import './style.sass';

export function DataSensor(){
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
	const listData = [
		{
			"name": "Ariane",
			"idade": "19"
		}
	]
	const listColumns = [
		{
			"key": "name",
			"label": "name"
		},
		{
			"key": "idade",
			"label": "idade"
		}
	]
	return (
		<>
			<Header linkHeader={linkHeader} />
			<main className='container-table'>
				<Table data={listData} columns={listColumns} />
			</main>
		</>
	)
}
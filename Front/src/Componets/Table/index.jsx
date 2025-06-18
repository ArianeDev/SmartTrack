import { useState } from 'react';
import { UserPen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Modal } from '../Modal';
import './style.sass'
import { Forms } from '../Forms';

export function Table({ data, columns, submitDelete, listForms }){
    const [isOpen, setIsOpen] = useState(false);
    const [sensorSelect, setSensorSelect] = useState(null);

    function handleOpenModal(sensor) {
        setSensorSelect(sensor);
        setIsOpen(true);
    }

    function handleCloseModal() {
        setSensorSelect(null);
        setIsOpen(false);
    }

    return(
        <>
            <table>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className={index <= 1 ? 'firstItens' : ''}>{col.label}</th>
                        ))}
                        <th className='actionData'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, key) => (
                        <tr key={item.id || key}>
                            {columns.map((col, index) => (
                                <td 
                                    key={index} 
                                    className='itensTable'>
                                    {
                                        col.key === 'status' ? (item[col.key] === 'ativo' ? 
                                            <div className='green'></div> : 
                                            <div className='red'></div>
                                        ): item[col.key]
                                    }
                                </td>

                            ))}
                            <td className='icons'>
                                <span title='Deletar'>
                                    <button onClick={() => submitDelete(item.id)}><Trash2 className='trash'/></button>
                                </span>
                                <span title='Atualizar'>
                                    <button onClick={() => handleOpenModal(item)}><UserPen className='userPen'/></button>
                                    {console.log(item)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onClose={handleCloseModal}
                >
                    {listForms.map((item,key) => (
                        <Forms 
                            title={item.title} 
                            listForms={item.listForms} 
                            buttonTitle={item.buttonTitle} 
                            text="" 
                            link="" 
                            method={item.method} 
                            methodFunction={item.methodFunction}
                            error={item.error}
                        />
                    ))}
                </Modal>
            )}
        </>
    )
}
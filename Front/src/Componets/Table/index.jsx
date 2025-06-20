import { useState } from 'react';
import { UserPen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Modal } from '../Modal';
import './style.sass'
import { Forms } from '../Forms';

export function Table({ data, columns, submitDelete, listForms, onSelect, loading, urlType }){
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
                        {urlType === 'S' && (
                            <th className='actionData'>Ações</th>
                        )}
                    </tr>
                </thead>
                {loading ? (
                    <tbody>
                        {[...Array(10)].map((_, i) => (
                        <tr key={`skeleton-${i}`}>
                            {columns.map((_, j) => (
                            <td key={j}>
                                <div className="skeletonLine" />
                            </td>
                            ))}
                            <td>
                                <div className="skeletonIcon" />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        {data.map((item, key) => (
                            <tr key={item.id || key}>
                                {columns.map((col, index) => (
                                    <td 
                                        key={index} 
                                        className='itensTable'>
                                        {
                                            col.key === 'status' ? (item[col.key].toLowerCase() === 'ativo' || item[col.key].toLowerCase() === "true" ? 
                                                <div className='green'></div>
                                                :
                                                <div className='red'></div>
                                            ): item[col.key]
                                        }
                                    </td>

                                ))}
                                {urlType === 'S' && (
                                    <td className='icons'>
                                        <span title='Deletar'>
                                            <button onClick={() => submitDelete(item.id)}><Trash2 className='trash'/></button>
                                        </span>
                                        <span title='Atualizar'>
                                            <button 
                                                onClick={() => {
                                                    handleOpenModal(item);
                                                    onSelect(item);
                                                }}>
                                                <UserPen className='userPen'/>
                                            </button>
                                        </span>
                                    </td>
                                )}
                            </tr>
                        ))}
                        {Array.from({length: Math.max(0, 10 - data.length)}).map((_,key) => (
                            <tr key={`empty-${key}`}>
                                {columns.map((_, key) => (
                                    <td key={key} className='empty-row'></td>
                                ))}
                                {urlType === 'S' && <td className='empty-row'></td>}
                            </tr>
                        ))}
                    </tbody>
                )}
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
                            disabled={item.disabled}
                        />
                    ))}
                </Modal>
            )}
        </>
    )
}
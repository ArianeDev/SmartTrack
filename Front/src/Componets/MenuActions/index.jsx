import { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Forms } from '../Forms';
import { Upload, Download, Plus, ChevronsDown, ChevronsUp } from 'lucide-react';
import './style.sass';
import { UploadExcel } from '../UploadExcel';

export function MenuActions({ listRegister, exportExcel, page, urlType }) {
    const [isOpen, setIsopen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

    function handleOpenModal() {
        setIsOpenModal(true);
    }

    function handleCloseModal() {
        setIsOpenModal(false);
    }

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        }
    },[isOpen]);

    function handleToggle() {
        if (isOpen) {
            setIsopen(false);
            setTimeout(() => {
                setShouldRender(false);
            }, 400)
        } else {
            setIsopen(true);
        }
    }

    return (
        <>
            <section className='menuActions-container'>
                {shouldRender &&
                    <div className='menubtn-container'>
                        {page === 'S' && (
                            <button 
                                title='Cadastrar'
                                className={`option option-A ${isOpen ? 'active' : 'hide'}`} 
                                onClick={() => {
                                    handleOpenModal();
                                    setSelectedAction('A');
                                }}
                            >
                                <Plus />
                            </button>
                        )}
                        <button 
                            title='Exportar'
                            className={`option option-B ${isOpen ? 'active' : 'hide'}`} 
                            onClick={() => {
                                exportExcel();
                            }}
                        >
                            <Upload />
                        </button>
                        <button 
                            title='Importar'
                            className={`option option-C ${isOpen ? 'active' : 'hide'}`}
                            onClick={() => {
                                handleOpenModal();
                                setSelectedAction('C');
                            }}
                        >
                            <Download />
                        </button>
                    </div>
                }
                <input type="checkbox" id='textMenu' className='checkbox' checked={isOpen} onChange={handleToggle} />
                <label className='btn-menuActions' htmlFor="textMenu">
                    {isOpen ? <ChevronsDown  className='iconDown' /> : <ChevronsUp className='iconUp' />}
                </label>
            </section>
            {isOpenModal &&  (
                <Modal
                    isOpen={isOpenModal}
                    onClose={handleCloseModal}
                >
                    {selectedAction === 'A' && 
                        <div>
                            {listRegister.map((item,key) => (
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
                        </div>
                    }

                    {selectedAction === 'C' &&
                        <UploadExcel onClose={handleCloseModal} urlType={urlType}/>
                    }
                </Modal>
            )}
        </>
    )
}
import { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Forms } from '../Forms';
import { Upload, Download, Plus, ChevronsDown, ChevronsUp } from 'lucide-react';
import { useTour } from '@reactour/tour';
import './style.sass';
import { UploadExcel } from '../UploadExcel';

export function MenuActions({ listRegister, exportExcel, clearForms, page, urlType }) {
    const [isOpen, setIsopen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const { setIsOpen: startTour } = useTour();

    function handleOpenModal() {
        setIsOpenModal(true);
    }

    function handleCloseModal() {
        setIsOpenModal(false);
    }

    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisited');

        if (!hasVisited) {
            
            const timeout = setTimeout(() => {
                startTour(true);
                localStorage.setItem('hasVisited', 'true');
                
                setTimeout(() => {
                    setIsopen(true);
                }, 500);
                
            }, 100);
            
            return () => clearTimeout(timeout);
        }
    }, []);

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
                                id='RegisterItems'
                                className={`option option-A ${isOpen ? 'active' : 'hide'}`} 
                                onClick={() => {
                                    clearForms();
                                    handleOpenModal();
                                    setSelectedAction('A');
                                }}
                            >
                                <Plus />
                            </button>
                        )}
                        <button 
                            title='Exportar'
                            id='UploadItems'
                            className={`option option-B ${isOpen ? 'active' : 'hide'}`} 
                            onClick={() => {
                                exportExcel();
                            }}
                        >
                            <Upload />
                        </button>
                        <button 
                            title='Importar'
                            id='ImportItems'
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
                <label className='btn-menuActions' id='BtnFirst' htmlFor="textMenu">
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
                            {listRegister.map((item, key) => (
                                <Forms 
                                    title={item.title}
                                    listForms={item.listForms} 
                                    buttonTitle={item.buttonTitle} 
                                    text=""
                                    link=""
                                    method={item.method} 
                                    methodFunction={item.methodFunction}
                                    error={item.error}
                                    key={key}
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
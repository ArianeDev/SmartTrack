import { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Forms } from '../Forms';
import { Upload, Download, Plus, ChevronsDown, ChevronsUp } from 'lucide-react';
import './style.sass';

export function MenuActions({ listRegister }) {
    const [isOpen, setIsopen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

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
                        <button className={`option option-A ${isOpen ? 'active' : 'hide'}`} onClick={() => handleOpenModal()}><Plus /></button>
                        <button className={`option option-B ${isOpen ? 'active' : 'hide'}`}><Upload /></button>
                        <button className={`option option-C ${isOpen ? 'active' : 'hide'}`}><Download /></button>
                    </div>
                }
                <input type="checkbox" id='textMenu' className='checkbox' checked={isOpen} onChange={handleToggle} />
                <label className='btn-menuActions' htmlFor="textMenu">
                    {isOpen ? <ChevronsDown  className='iconDown' /> : <ChevronsUp className='iconUp' />}
                </label>
            </section>
            {isOpenModal && (
                <Modal
                    isOpen={isOpenModal}
                    onClose={handleCloseModal}
                >
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
                </Modal>
            )}
        </>
    )
}
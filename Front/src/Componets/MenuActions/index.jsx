import { useEffect, useState } from 'react';
import './style.sass';

export function MenuActions() {
    const [isOpen, setIsopen] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

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
        <section className='menuActions-container'>
            {shouldRender &&
                <div className='menubtn-container'>
                    <button className={`option option-A ${isOpen ? 'active' : 'hide'}`}>A</button>
                    <button className={`option option-B ${isOpen ? 'active' : 'hide'}`}>A</button>
                    <button className={`option option-C ${isOpen ? 'active' : 'hide'}`}>A</button>
                </div>
            }
            <input type="checkbox" id='textMenu' className='checkbox' checked={isOpen} onChange={handleToggle} />
            <label className='btn-menuActions' htmlFor="textMenu">
                {isOpen ? '-' : '+'}
            </label>
        </section>
    )
}
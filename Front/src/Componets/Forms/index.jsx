import { Input } from "../Input";
import { Label } from "../Label";
import { Button } from "../Button";
import './style.sass';

export function Forms({ title, listForms, buttonTitle, text, link }){
    return(
        <section className="container-forms">
            <h2>{title}</h2>
            <form action="" method="post">
                {listForms.map((item, key) => (
                    <div className="container-input">
                        <Label text={item.nameLabel} />
                        <Input type={item.type} placeholder={item.placeholder} />
                    </div>
                ))}
                <Button text={buttonTitle} />
            </form>
            <p>{text} <span className='link'>{link}</span></p>
        </section>
    )
}
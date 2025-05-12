import "../styles/components/InputSearch.css";
import Icon from "./Icon";

export function InputSearch(){
    return (
        <div className="input__search">
            <input type="text" placeholder="Search" />
            <button className="btn__search">
                <Icon url="solid/search.svg#search" width={20} height={20} viewbox="0 0 20 20"/>
            </button>
        </div>
    )
}
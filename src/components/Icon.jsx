export default function Icon({ url = "", width = 24, height = 24, viewbox = "0 0 24 24", onClick, ariaLabel="", className=""}){
    const iconUrl = `/icons/${url}`;
    const handleClick = ()=>{
        if(onClick){
            onClick()
        }
    }
    return(
        <svg className={className} width={width} height={height} viewBox={viewbox} onClick={handleClick} aria-label={ariaLabel}>
            <use href={iconUrl}></use>
        </svg>
    )

}
import "../../styles/components/ExpandableTable.css"


const ExpandableTableRow = ({ row }) => {

    return (
      <article className={`row ${row.type?.toLowerCase() || "info"} ${Array.isArray(row.moreContent) ? "--list" : ""}`}>
        <ul>
          <li>
            <p>{row.name}</p>
          </li>
        </ul>
        
          <ul className="more-content">
          {Array.isArray(row.moreContent,) ? (
            row.moreContent.map((rowContent, i) => (
                <li key={rowContent.id}> {i+1}/ {rowContent.nombre}</li>
            ))
            ) : (
            <li> {row.moreContent}</li>
            )}
          </ul>
      </article>
    );
  };
  
  export default ExpandableTableRow;
  
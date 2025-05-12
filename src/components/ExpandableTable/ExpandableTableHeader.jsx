import "../../styles/components/ExpandableTable.css"

const ExpandableTableHeader = ({ headers }) => {
    return (
      <main className="row title-expandedTable">
        <ul>
          {headers.map((header, index) => (
            <li key={index}>{header}</li>
          ))}
        </ul>
      </main>
    );
  };
  
  export default ExpandableTableHeader;
  
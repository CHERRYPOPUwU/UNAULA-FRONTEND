import "../../styles/components/ExpandableTable.css"
import ExpandableTableHeader from "./ExpandableTableHeader";
import ExpandableTableRow from "./ExpandableTableRow";

const ExpandableTable = ({ headers = [], rows = []}) => {
  return (
    <section className="wrapper">
       {/* Header */}
       {headers.length > 0 && <ExpandableTableHeader headers={headers} />}
        
        {/* Rows */}
        {rows.map((row, index) => (
          <ExpandableTableRow key={index} row={row} />
        ))}
      
    </section>
  );
};

export default ExpandableTable;

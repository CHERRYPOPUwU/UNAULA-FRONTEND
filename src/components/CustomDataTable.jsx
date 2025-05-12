import DataTable from 'react-data-table-component';
import { useTheme } from '../context/ThemeContext';
import { Button } from './Button';
import '../styles/components/CustomDataTable.css';

export const CustomDataTable = ({ 
  columns, 
  data, 
  pagination = true, 
  selectableRows = false, 
  highlightOnHover = true, 
  onDelete,
  onMoreInfo,
  onEdit }) => {

  const { isDarkMode } = useTheme();
  const enhancedColumns = addActionButtons(columns, onDelete, onMoreInfo, onEdit)
  
  
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
    <DataTable
      columns={enhancedColumns}
      data={Array.isArray(data) ? data : []}
      fixedHeader
      fixedHeaderScrollHeight="320px"
      pagination={pagination}
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 20]}
      selectableRows={selectableRows}
      highlightOnHover={highlightOnHover}
      responsive // importante: desactiva esto
      theme={isDarkMode ? 'dark' : 'light'}
    />
  </div>
  );
};

const addActionButtons = (columns, onDelete, onMoreInfo, onEdit) => {
  // Si no se pasó ninguno, no agregamos columna
  if (!onDelete && !onMoreInfo && !onEdit) return columns;

  return [
    ...columns,
    {
      name: 'Acciones',
      cell: (row) => (
        <div className="actions">
          {onMoreInfo && (
            <Button
              onClick={() => onMoreInfo(row.id)}
              type='info'
            >
              Ver mas
            </Button>
          )}
          {onDelete && (
            <Button
              onClick={() => onDelete(row.id)}
              type="danger"
            >
              Eliminar
            </Button>
          )}
          {onEdit && (
            <Button
              onClick={() => onEdit(row.id)}
              type="info"
            >
              Editar
            </Button>
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
};

import DataTable from 'react-data-table-component';
import { useTheme } from '../context/ThemeContext';
import { Button } from './Button';
import '../styles/components/CustomDataTable.css';
import Icon from './Icon';

export const CustomDataTable = ({ 
  columns, 
  data, 
  pagination = true, 
  selectableRows = false, 
  highlightOnHover = true, 
  onDelete,
  onMoreInfo,
  onEdit,
  onDownload }) => {

  const { isDarkMode } = useTheme();
  const enhancedColumns = addActionButtons(columns, onDelete, onMoreInfo, onEdit, onDownload)
  
  
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

const addActionButtons = (columns, onDelete, onMoreInfo, onEdit, onDownload) => {
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
              style="table-btn"
              icon= { 
                <Icon
                  url="solid/eye.svg#eye"
                  height={20}
                  width={20}
                  viewbox="0 0 20 20"
                />
              }
            />
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
              style="table-btn"
              icon= { 
                <Icon
                  url="solid/edit.svg#edit"
                  height={20}
                  width={20}
                  viewbox="0 0 20 20"
                />
              }
            />
          )}
           {onDownload && (
            <Button
              onClick={() => onDownload(row.id)}
              type="info"
              style="table-btn"
              icon= { 
                <Icon
                  url="solid/download.svg#download"
                  height={20}
                  width={20}
                  viewbox="0 0 20 20"
                />
              }
            />
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
};

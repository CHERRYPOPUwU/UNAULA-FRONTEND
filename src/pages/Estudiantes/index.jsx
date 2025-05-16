import { useEffect, useState } from 'react';
import { CustomDataTable } from '../../components/CustomDataTable';
import HeaderSection from '../../components/HeaderSection';
import { FormEstudiante } from './ModalCreate';
import { InfoEstudiante } from './ModalInfo';
import Load from '../../components/load';
import "../../styles/pages/Estudiantes.css";
import { getEstudiantes } from '../../api/estudiante';


export const EstudianteDashboard = () => {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState([]);
  const [open, setOpen] = useState(false);
  const [id_estudiante, setId_estudiante] = useState();
  const [openInfo, setOpenInfo] = useState(false);
  const [loading, setLoading] = useState(true)

  const columns = [
    {
      name: 'id',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.nombre + ' ' + row.apellidos,
      sortable: true,
    },
    {
      name: 'Proyecto',
      selector: row => row.proyecto,
      sortable: true,
    },
    {
      name: 'Carrera',
      selector: row => row.carrera,
      sortable: true,
    }
  ];
    
  const moreInfo = (id) =>{
    setOpenInfo(true);
    setId_estudiante(id);
  }
  
  const fetchEstudiantes = async () => {
    try {
      const response = await getEstudiantes();
      setUsers(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);
  
  if (loading) {
    return (
      <div className="loader-content">
        <Load/>
        <p>Cargando</p>
      </div>
    );
  }

  return (
    <>
      <FormEstudiante
          open={open}
          setOpen={setOpen}
          onSuccess={fetchEstudiantes}
          type={type}
          estudianteId={id_estudiante}
      />
      <InfoEstudiante
          open={openInfo}
          id_estudiante={id_estudiante}
          setOpen={setOpenInfo}
      />
      <HeaderSection title={"Estudiante"} createLabel={"Crear Estudiante"} onCreateClick={() => {setOpen(true); setType("create")}}/>
      <CustomDataTable
              columns={columns}
              data={users}
              pagination
              onMoreInfo = {(id) => moreInfo(id)}
              onEdit ={(id) => { setOpen(true); setType("edit"), setId_estudiante(id)}}
      />
    </>
  );
};


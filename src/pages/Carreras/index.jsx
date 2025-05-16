import { useEffect, useState } from 'react';
import { CustomDataTable } from '../../components/CustomDataTable';
import HeaderSection from '../../components/HeaderSection';
import { FormCarrera } from './ModalCreate';
import Load from '../../components/load';
import "../../styles/pages/Carrera.css";
import { getCarreras } from '../../api/carreras';


export const CarrerasDashboard = () => {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState([]);
  const [open, setOpen] = useState(false);
  const [id_carrera, setid_carrera] = useState();
  const [loading, setLoading] = useState(true)

  const columns = [
    {
      name: 'id',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Semestres',
      selector: row => row.semestres,
      sortable: true,
    },
    {
      name: 'Facultad',
      selector: row => row.facultad,
      sortable: true,
    }
  ];
    

  
  const fetchCarreras = async () => {
    try {
      const response = await getCarreras();
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarreras();
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
      <FormCarrera
          open={open}
          setOpen={setOpen}
          onSuccess={fetchCarreras}
          type={type}
          carreraId={id_carrera}
      />
      <HeaderSection title={"Carreras"} createLabel={"Crear Carrera"} onCreateClick={() => {setOpen(true); setType("create");}}/>
      <CustomDataTable
              columns={columns}
              data={users}
              pagination
              onEdit ={(id) => { setOpen(true); setType("edit"), setid_carrera(id)}}
      />
    </>
  );
};


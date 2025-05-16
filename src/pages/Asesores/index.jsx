import { useEffect, useState } from 'react';
import { CustomDataTable } from '../../components/CustomDataTable';
import HeaderSection from '../../components/HeaderSection';
import Load from '../../components/load';
import "../../styles/pages/Asesores.css";
import { getAsesors } from '../../api/asesors';
import { FormAsesor } from './ModalCreate';


export const AsesoresDashboard = () => {
  const [asesores, setAsesores] = useState([]);
  const [type, setType] = useState([]);
  const [open, setOpen] = useState(false);
  const [id_asesor, setId_Asesor] = useState();
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
      name: 'Especialidad',
      selector: row => row.especialidad,
      sortable: true,
    },
    {
      name: 'Celular',
      selector: row => row.celular,
      sortable: true,
    }
  ];
    

  
  const fetchAsesors = async () => {
    try {
      const response = await getAsesors();
      setAsesores(response.data.data);
    } catch (error) {
      console.error('Error fetching Asesors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsesors();
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
      <FormAsesor
          open={open}
          setOpen={setOpen}
          onSuccess={fetchAsesors}
          type={type}
          asesorId={id_asesor}
      />
      <HeaderSection title={"Asesores"} createLabel={"Crear Asesor"} onCreateClick={() => {setOpen(true); setType("create"); setId_Asesor(false)}}/>
      <CustomDataTable
              columns={columns}
              data={asesores}
              pagination
              onEdit ={(id) => { setOpen(true); setType("edit"), setId_Asesor(id)}}
      />
    </>
  );
};


import { useEffect, useState } from 'react';
import { getProjects } from '../../api/projects';
import { CustomDataTable } from '../../components/CustomDataTable';
import HeaderSection from '../../components/HeaderSection';
import { FormProject } from './ModalCreate';
import { InfoProject } from './ModalInfo';
import Load from '../../components/load';
import "../../styles/pages/Project.css";


export const ProjectDashboard = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [id_project, setId_project] = useState();
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
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Tipo',
      selector: row => row.tipo,
      sortable: true,
    },
    {
      name: 'Tema',
      selector: row => row.tema,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: row => row.estado,
      sortable: true,
    },
    {
      name: 'Asesor',
      selector: row => row.asesor,
      sortable: true,
    },
  ];
    
  const moreInfo = (id) =>{
    setOpenInfo(true);
    setId_project(id);
  }
  
  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchProjects();
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
      <FormProject
          open={open}
          setOpen={setOpen}
          onSuccess={fetchProjects}
          type={"create"}
      />
      <InfoProject
          open={openInfo}
          id_project={id_project}
          setOpen={setOpenInfo}
      />
      <HeaderSection title={"Proyectos"} createLabel={"Crear Proyecto"} onCreateClick={() => setOpen(true)}/>
      <CustomDataTable
              columns={columns}
              data={users}
              pagination
              onMoreInfo = {(id) => moreInfo(id)}
              onEdit
      />
    </>
  );
};


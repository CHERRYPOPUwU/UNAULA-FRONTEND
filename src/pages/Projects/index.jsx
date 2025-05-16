import { useEffect, useState } from 'react';
import { getProjects } from '../../api/projects';
import { CustomDataTable } from '../../components/CustomDataTable';
import HeaderSection from '../../components/HeaderSection';
import { FormProject } from './ModalCreate';
import { InfoProject } from './ModalInfo';
import Load from '../../components/load';
import "../../styles/pages/Project.css";
import { getInformeById } from '../../api/informes';


export const ProjectDashboard = () => {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState([]);
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

  const donwloadInforme = async (id) => {

    const response = await getInformeById(id);

  // Verifica que la respuesta contiene un Blob
  if (response?.data instanceof Blob) {
    const blob = response.data;
    const url = window.URL.createObjectURL(blob);

    // Crea un enlace de descarga
    const link = document.createElement('a');
    link.href = url;
    link.download = 'informe.pdf'; // puedes cambiar el nombre del archivo

    document.body.appendChild(link);
    link.click();

    // Limpia el objeto URL y elimina el enlace
    link.remove();
    window.URL.revokeObjectURL(url);
  } else {
    console.error('No se recibió un Blob válido');
  }

  }
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
          type={type}
          projectId={id_project}
      />
      <InfoProject
          open={openInfo}
          id_project={id_project}
          setOpen={setOpenInfo}
      />
      <HeaderSection title={"Proyectos"} createLabel={"Crear Proyecto"} onCreateClick={() => {setOpen(true); setType("create")}}/>
      <CustomDataTable
              columns={columns}
              data={users}
              pagination
              onMoreInfo = {(id) => moreInfo(id)}
              onEdit ={(id) => { setOpen(true); setType("edit"), setId_project(id)}}
              onDownload={(id) => { donwloadInforme(id)}}
      />
    </>
  );
};


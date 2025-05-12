import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { getProjectById } from '../../api/projects';
import ExpandableTable from '../../components/ExpandableTable/ExpandableTable';


export const InfoProject = ({ open, setOpen, id_project}) => {
    
    const [data, setData] = useState([]);

    const getProject = async (id) => {
        const response = await getProjectById(id);
        setData(response.data.data);
    }
    
    
    const rows = Object.entries(data)
    .filter(([key]) => key !== 'id' && key !== 'id_asesor') // Filtra los campos no deseados
    .map(([key, value]) => ({
      name: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), // Formatea el nombre
      moreContent: value
    }));
 
    

    useEffect(() => {
      if (id_project > 0) {
        getProject(id_project);
      }
    }, [id_project]);

  return (
    <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={"Informacion sobre el proyecto " + data.nombre}
        type="info"
        >
            <ExpandableTable rows={rows}/>
    </Modal>
  );
};


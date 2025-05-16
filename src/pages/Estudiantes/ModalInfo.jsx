import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import ExpandableTable from '../../components/ExpandableTable/ExpandableTable';
import { getEstudianteById } from '../../api/estudiante';


export const InfoEstudiante = ({ open, setOpen, id_estudiante}) => {
    
    const [data, setData] = useState([]);

    const getEstudiante = async (id) => {
        const response = await getEstudianteById(id);
        console.log(response.data.data)
        setData(response.data.data);
    }
    
    
    const rows = Object.entries(data)
    .filter(([key]) => key !== 'id' && key !== 'id_carrera' && key !== 'id_proyecto'  && key !== 'matriculado' ) // Filtra los campos no deseados
    .map(([key, value]) => ({
      name: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      moreContent: value
    }));
 
    

    useEffect(() => {
      if (id_estudiante > 0) {
        getEstudiante(id_estudiante);
      }
    }, [id_estudiante]);

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


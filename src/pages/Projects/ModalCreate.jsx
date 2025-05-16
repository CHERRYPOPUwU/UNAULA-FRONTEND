import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import Modal from '../../components/Modal';
import { createProject, getProjectById,  updateProject } from '../../api/projects';
import { Select } from '../../components/Select';
import { getAsesors } from '../../api/asesors';


export const FormProject = ({ open, setOpen, onSuccess, type, projectId }) => {


  const { register, handleSubmit, reset } = useForm();
  const [infoOpen, setInfoOpen] = useState(false);
  const [asesors, setAsesors] = useState([]);

  const fetchAsesores = async () => {
    try {
      const response = await getAsesors();
      setAsesors(response.data.data);
      const formatted = response.data.data.map(asesor => ({
        id: asesor.id,
        option: asesor.nombre
      }));
      setAsesors(formatted);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const fetchProjectData = async () => {
    if (type === 'edit' && projectId) {
      try {
        const response = await getProjectById(projectId);
        const data = response.data.data;
        console.log(data.estado)
        reset({
          nombre: data.nombre,
          tipo: data.tipo,
          tema: data.tema,
          estado: data.estado,
          id_asesor: data.id_asesor,
        });
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    }
  };

  useEffect(()=>{
    if (!asesors.length) fetchAsesores();
  },[])
  useEffect(() => {
    reset();
    if (open && type === 'edit') {
      fetchProjectData();
    } else if (open && type === 'create') {
      reset({
          nombre: '',
          tipo: '',
          tema: '',
          estado: '',
          id_asesor: '',
        });
    }
  }, [open,type]);

  const onSubmit = async (project) => {
    try {
      project.id_asesor = Number(project.id_asesor);

      if (type === 'edit' && projectId) {
        await updateProject(projectId, project);
      } else {
        await createProject(project);
      }

      reset();
      setOpen(false);
      setTimeout(() => setInfoOpen(true), 300); 
      if (onSuccess) {
        await onSuccess(); 
      }
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  };

  return (
    <div>
      <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={type=="edit" ? "Editar Proyecto" : "Crear Proyecto"}
          type="create"
          onConfirm={handleSubmit(onSubmit)}
        >
            <Input label="Nombre" placeholder="Ingrese el nombre..." name="nombre" { ...register("nombre", {required: true})} />
            <Input label="Tipo" placeholder="Ingrese el tipo..." name="tipo" { ...register("tipo", { required:true })} />
            <Input label="Tema" placeholder="Ingrese el tema..." name="tema" { ...register("tema", { required:true})} />
            <Select label="Estado" placeholder="Seleccione el estado..." name="estado" options={[{"id":"Aprobado", "option":"Aprobado"},{"id":"En proceso", "option":"En proceso"}]} { ...register("estado", {required:true})}/>
            <Select label="Asesor" placeholder="Seleccione el asesor asociado" name="id_asesor" options={asesors} { ...register("id_asesor", {required:true})}/>
        </Modal>

        {/* Modal informativo */}
        <Modal
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="Éxito"
        type="info"
        >
          <p>Proyecto {type=="edit" ? "editado" : "creado"} exitosamente.</p>
        </Modal>

    </div>
  );
};


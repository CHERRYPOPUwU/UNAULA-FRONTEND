import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import Modal from '../../components/Modal';
import { createAsesor, getAsesors, getAsesorsById, updateAsesor } from '../../api/asesors';


export const FormAsesor = ({ open, setOpen, onSuccess, type, asesorId }) => {


  const { register, handleSubmit, reset } = useForm();
  const [infoOpen, setInfoOpen] = useState(false);
  const [asesors, setAsesors] = useState([]);

  const fetchAsesores = async () => {
    try {
      const response = await getAsesors();
      setAsesors(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const fetchProjectData = async () => {
    if (type === 'edit' && asesorId) {
      try {
        const response = await getAsesorsById(asesorId);
        const data = response.data.data;
        reset({
          nombre: data.nombre,
          especialidad: data.especialidad,
          celular: data.celular,
        });
      } catch (error) {
        console.error('Error fetching asesor:', error);
      }
    }
  };

  useEffect(()=>{
    if (!asesors.length) fetchAsesores();
  },[])

  useEffect(() => {
    if (open && type === 'edit') {
      fetchProjectData();
    } else if (open && type === 'create') {
      reset({
      nombre: '',
      especialidad: '',
      celular: '',
      });
    }
  }, [open,type]);

  const onSubmit = async (asesor) => {
    try {

      if (type === 'edit' && asesorId) {
        await updateAsesor(asesorId, asesor);
      } else {
        await createAsesor(asesor);
      }
      
      reset();
      setOpen(false);
      setTimeout(() => setInfoOpen(true), 300); 
      if (onSuccess) {
        await onSuccess(); 
      }
    } catch (error) {
      console.error("Error al crear el Asesor:", error);
    }
  };

  return (
    <div>
      <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={type=="edit" ? "Editar Asesor" : "Crear Asesor"}
          type="create"
          onConfirm={handleSubmit(onSubmit)}
        >
            <Input label="Nombre" placeholder="Ingrese el nombre..." name="nombre" { ...register("nombre", {required: true})} />
            <Input label="Especialidad" placeholder="Ingrese la especalidad..." name="tipo" { ...register("especialidad", { required:true })} />
            <Input type="number" label="Celular" placeholder="Ingrese el celuar..." name="tema" { ...register("celular", { required:true})} />
        </Modal>

        {/* Modal informativo */}
        <Modal
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="Éxito"
        type="info"
        >
          <p>Asesor {type=="edit" ? "editado" : "creado"} exitosamente.</p>
        </Modal>

    </div>
  );
};


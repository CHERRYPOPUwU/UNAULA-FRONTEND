import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import Modal from '../../components/Modal';
import { createCarrera, getCarreraById, getCarreras, updateCarrera } from '../../api/carreras';


export const FormCarrera = ({ open, setOpen, onSuccess, type, carreraId }) => {


  const { register, handleSubmit, reset } = useForm();
  const [infoOpen, setInfoOpen] = useState(false);
  const [asesors, setAsesors] = useState([]);

  const fetchCarreras = async () => {
    try {
      const response = await getCarreras();
      setAsesors(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const fetchCarreraData = async () => {
    if (type === 'edit' && carreraId) {
      try {
        const response = await getCarreraById(carreraId);
        const data = response.data.data;
        reset({
          nombre: data.nombre,
          semestres: data.semestres,
          facultad: data.facultad
        });
      } catch (error) {
        console.error('Error fetching facultad:', error);
      }
    }
  };

  useEffect(()=>{
    if (!asesors.length) fetchCarreras();
  },[])

  useEffect(() => {
    reset();
    if (open && type === 'edit') {
      fetchCarreraData();
    } else if (open && type === 'create') {
      console.log("IM IN CREATE")
      reset({
          nombre: '',
          semestres: '',
          facultad: '',
      });
    }
  }, [open,type]);

  const onSubmit = async (carrera) => {
    try {
      
      carrera.semestres = Number(carrera.semestres);

      if (type === 'edit' && carreraId) {
        await updateCarrera(carreraId, carrera);
      } else {
        await createCarrera(carrera);
      }

      reset({
          nombre: '',
          semestres: '',
          facultad: ''
        });
      setOpen(false);
      setTimeout(() => setInfoOpen(true), 300); 
      if (onSuccess) {
        await onSuccess(); 
      }
    } catch (error) {
      console.error("Error al crear el Carrera:", error);
    }
  };

  return (
    <div>
      <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={type=="edit" ? "Editar Carrera" : "Crear Carrera"}
          type="create"
          onConfirm={handleSubmit(onSubmit)}
        >
            <Input label="Nombre" placeholder="Ingrese el nombre..." name="nombre" { ...register("nombre", {required: true})} />
            <Input label="Semestres" type="number" placeholder="Ingresa los semestres..." name="semestres" { ...register("semestres", { required:true })} />
            <Input label="Facultad" placeholder="Ingrese la Facultad..." name="facultad" { ...register("facultad", { required:true})} />
        </Modal>

        {/* Modal informativo */}
        <Modal
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="Éxito"
        type="info"
        >
          <p>Carrera {type=="edit" ? "editado" : "creado"} exitosamente.</p>
        </Modal>

    </div>
  );
};


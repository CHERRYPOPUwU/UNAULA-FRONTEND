import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import Modal from '../../components/Modal';
import { createProject } from '../../api/projects';
import { Select } from '../../components/Select';
import { getAsesors } from '../../api/asesors';


export const FormProject = ({ open, setOpen, onSuccess, type}) => {


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

  useEffect(()=>{
    if(!asesors.length){
      fetchAsesores();
    }
  })

  const onSubmit = async (project) => {
    try {
      project.id_asesor = Number(project.id_asesor);
      await createProject(project); // Espera que se cree correctamente
      reset();
      setOpen(false);
      setTimeout(() => setInfoOpen(true), 400); // Espera breve antes de abrir modal info
      if (onSuccess) {
        onSuccess(); // Refresca la tabla
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
          title="Crear Proyecto"
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
          <p>Proyecto creado exitosamente.</p>
        </Modal>

    </div>
  );
};


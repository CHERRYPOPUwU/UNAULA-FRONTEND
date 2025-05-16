import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import Modal from '../../components/Modal';
import { getProjects } from '../../api/projects';
import { Select } from '../../components/Select';
import { getCarreras } from '../../api/carreras';
import { createEstudiante, getEstudianteById, updateEstudiante } from '../../api/estudiante';


export const FormEstudiante = ({ open, setOpen, onSuccess, type, estudianteId }) => {


  const { register, handleSubmit, reset } = useForm();
  const [infoOpen, setInfoOpen] = useState(false);
  const [carreras, setCarreras] = useState([]);
  const [proyectos, setProyectos] = useState([]);

  const fetchResources = async () => {
    try {
      const response = await getCarreras();
      const formatted = response.data.data.map(carrera => ({
        id: carrera.id,
        option: carrera.nombre
      }));
      setCarreras(formatted);
      const responseProject = await getProjects();
      const formattedProject = responseProject.data.data.map(proyecto => ({
        id: proyecto.id,
        option: proyecto.nombre
      }));
      setProyectos(formattedProject);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const fetchEstudianteData = async () => {
    if (type === 'edit' && estudianteId) {
      try {
        const response = await getEstudianteById(estudianteId);
        const data = response.data.data;
        reset({
          nombre: data.nombre,
          apellidos: data.apellidos,
          edad: data.edad,
          celular: data.celular,
          id_carrera: data.id_carrera,
          id_proyecto: data.id_proyecto,
          matriculado: data.matriculado ? "True": "False",
        });
      } catch (error) {
        console.error('Error fetching estudiante:', error);
      }
    }
  };

  useEffect(()=>{
    if (!carreras.length) fetchResources();
  },[])
  useEffect(() => {
    reset({
          nombre: '',
          apellidos: '',
          edad: '',
          celular: '',
          id_carrera:'',
          id_proyecto: '',
          matriculado: '',
        });
    if (open && type === 'edit') {
      fetchEstudianteData();
    } else if (open && type === 'create') {
      reset({
          nombre: '',
          apellidos: '',
          edad: '',
          celular: '',
          id_carrera:'',
          id_proyecto: '',
          matriculado: '',
        });
    }
  }, [open,type]);

  const onSubmit = async (estudiante) => {
    try {
      estudiante.id_carrera = Number(estudiante.id_carrera);
      estudiante.edad = Number(estudiante.edad);
      estudiante.id_proyecto = Number(estudiante.id_proyecto);
      estudiante.matriculado = estudiante.matriculado === "True";

      if (type === 'edit' && estudianteId) {
        await updateEstudiante(estudianteId, estudiante);
      } else {
        await createEstudiante(estudiante);
      }

      reset({nombre: '',
          apellidos: '',
          edad: '',
          celular: '',
          id_carrera:'',
          id_proyecto: '',
          matriculado: '',});
      setOpen(false);
      setTimeout(() => setInfoOpen(true), 300); 
      if (onSuccess) {
        await onSuccess(); 
      }
    } catch (error) {
      console.error("Error al crear el Estudiantes:", error);
    }
  };

  return (
    <div>
      <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={type=="edit" ? "Editar Estudiante" : "Crear Estudiante"}
          type="create"
          onConfirm={handleSubmit(onSubmit)}
          styleUnique='--estudiantes'
        > 
          <div>
              <Input label="Nombres" placeholder="Ingrese el nombre..." name="nombre" { ...register("nombre", {required: true})} />
              <Input label="Apellidos" placeholder="Ingrese los apellidos..." name="nombre" { ...register("apellidos", {required: true})} />
              <Input label="Edad" placeholder="Ingrese la Edad..." name="edad" type="number" { ...register("edad", { required:true })} />
              <Input label="Celular" placeholder="Ingrese el celular..." name="celular" type="number" { ...register("celular", { required:true })} />
          </div>
          <div>
            <Select label="Matriculado" placeholder="Esta matriculado?" name="matriculado" options={[{"id":"True", "option":"Sí"},{"id":"False", "option":"No"}]} { ...register("matriculado", {required:true})}/>
            <Select label="Carrera" placeholder="Seleccione la carrera" name="id_carrera" options={carreras} { ...register("id_carrera", {required:true})}/>
            <Select label="Proyecto" placeholder="Seleccione el proyecto" name="id_proyecto" options={proyectos} { ...register("id_proyecto", {required:true})}/> 
          </div>
            
        </Modal>

        {/* Modal informativo */}
        <Modal
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="Éxito"
        type="info"
        >
          <p>Estudiante {type=="edit" ? "editado" : "creado"} exitosamente.</p>
        </Modal>

    </div>
  );
};


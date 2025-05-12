import { useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useUsers } from "../context/UserContext";
import axios from "axios";

function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { users, createUser } = useUsers();
  const onSubmit = async (data) => {
    var formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("lastname", data.lastname);
    // formData.append("username", data.username);
    // formData.append("email", data.email);
    // formData.append("password", data.password);
    // formData.append("file", data.file[0]);

    // const res = await createUser(data);
    // console.log(res);
    formData.append('file', data.file[0]);
    const response = await axios.post('http://localhost:3000/coastline/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
  }
    


  return (
    <div className="">
      <form
        className=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="content__inputs">
          {/* <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Jose .."
            error={errors.name}
            {...register("name", { required: true })}
          />
          <Input
            label="Last Name"
            type="text"
            name="lastname"
            placeholder="Smith .."
            error={errors.lastname}
            {...register("lastname", { required: true })}
          />
          <Input
            label="Username"
            type="text"
            name="username"
            placeholder="joseSmith6723 .."
            error={errors.username}
            {...register("username", { required: true })}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Smith .."
            error={errors.email}
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder=" put the password user"
            error={errors.password}
            {...register("password", { required: true })}
          /> */}
          <Input
            label="Avatar"
            type="file"
            name="file"
            placeholder="Select the avatar"
            error={errors.file}
            {...register("file", { required: true })}
          />
        </div>

        <Button>Create User</Button>
      </form>
    </div>
  );
}

export default CreateUser;

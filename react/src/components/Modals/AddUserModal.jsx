import { Button } from "@material-tailwind/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import UserService from "../../services/UserService";
import InputText from "../InputText";
import ExclamationIcon from "../icons/ExclamationIcon";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  phone: Yup.string()
    .matches(/^[0-9]{9}$/, "El teléfono debe contener 9 dígitos")
    .required("El teléfono es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("Este campo es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
  rol: Yup.string().required("Seleccione un rol"),
});

export default function AddUserModal({ setState, user, users, setUsers }) {
  const service = new UserService();
  const add = (data, reset, setErrors) => {
    service
      .add(data)
      .then((response) => {
        setUsers((prevUsers) => [response, ...prevUsers]);
        setState(false)
        reset()
      })
      .catch((err) => {
        const status = err.response.status;
        status === 422 && setErrors(err.response.data);
        status === 409 && setErrors({ email: "Esta email ya ha sido tomado" });
      });
  };

  return (
    <>
  <div className="w-screen h-screen bg-gray-400 opacity-20 absolute top-0 z-50"></div>
    <div className="z-50 w-[40%] fixed h-auto text-center transform-translateX(-50%) shadow-xl top-[15%] left-[33%] dark:bg-gray-950 bg-white dark:text-white px-10 py-10 rounded-xl dark:shadow-lg dark:shadow-purple-900">
      <p
        onClick={() => setState(false)}
        className="absolute op top-3 right-5 dark:text-white dark:hover:bg-gray-700 rounded-full py-1 px-3 cursor-pointer"
      >
        X
      </p>
      <h2 className="text-center mb-10 mt-3 font-bold text-3xl">
        Añadir Usuario
      </h2>
      <div className="mt-5 gap-5">
        <Formik
          initialValues={{
            name: "",
            phone: "",
            email: "",
            password: "",
            rol: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setErrors }) =>
            add(values, resetForm, setErrors)
          }
        >
          {({errors})=>(
            <Form>
              <div className="grid sm:grid-cols-2 grid-cols-1  gap-4 w-full">
                <div className="mb-3">
                  <InputText
                    label="Nombre"
                    placeholder="Antonio Garcia..."
                    icon="user"
                    name="name"
                  />
                </div>
                <div>
                  <InputText
                    label="Teléfono"
                    placeholder="678543747..."
                    icon="phone"
                    name="phone"
                  />
                </div>
                <div className="mb-3">
                  <InputText
                    label="Email"
                    placeholder="antonio@example.com"
                    icon="envelope"
                    name="email"
                  />
                </div>
                <div>
                  <InputText
                    label="Contraseña"
                    placeholder=""
                    icon="eye"
                    type="password"
                    name="password"
                  />
                </div>
                <div className="col-span-2 w-full mt-3">
                  <Field
                    as="select"
                    name="rol"
                    className=" w-full px-3 py-2 dark:bg-gray-950 border-[1.5px] rounded-lg"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="0">Usuario</option>
                    <option value="1">Administrador</option>
                  </Field>
                  {errors.rol && (
                    <div className="text-red-600 flex text-center">
                      <span className="mt-1 me-2"><ExclamationIcon /></span>{" "}
                      <ErrorMessage name="rol"></ErrorMessage>
                    </div>
                  )}
                </div>
                <div className="col-span-2 mt-5">
                  <Button
                    onClick={add}
                    type="submit"
                    className="w-[50%] shadow-xl py-2.5 px-4 text-sm font-semibold rounded-xl  border border-green-600 text-white hover:bg-green-700 focus:outline-none  dark:text-green-500 dark:border-green-500 dark:hover:text-white dark:hover:bg-green-500  dark:bg-transparent bg-green-600"
                  >
                    Añadir
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
}

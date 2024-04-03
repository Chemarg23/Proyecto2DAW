import { Button } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import GuestHeader from "../Layouts/GuestHeader";
import "../assets/login.css";
import InputCheck from "../components/InputCheck";
import InputText from "../components/InputText";
import AppleIcon from "../components/icons/AppleIcon";
import FacebookIcon from "../components/icons/FacebookIcon";
import GoogleIcon from "../components/icons/GoogleIcon";
import AuthService from "../services/AuthService";
import { addUser } from "../store/userSlice";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Este email no es correcto")
    .required("Este campo es Obligatorio"),
  name: Yup.string().required("Este campo es Obligatorio"),
  phone: Yup.string().required("Este campo es obligatorio"),
  password: Yup.string()
    .min(8, "Demasiado corta, ha de tener min. 8 caracteres")
    .max(20, "Demasiado larga, ha de tener máx. 20 caracteres")
    .required("Este campo es Obligatorio"),
});
export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handle = (value, setErrors) => {
    const service = new AuthService();
    service
      .register(value)
      .then((response) => {
        dispatch(addUser(response.data));
        navigate("/main");
      })
      .catch((err) => {
        const status = err.response.status;
        status === 422 && setErrors(err.response.data);
        status === 409 && setErrors({ email: "Este email ya ha sido tomado" });
      });
  };
  return (
    <>
      <GuestHeader />
      <div className="font-[sans-serif] bg-gray-50 text-[#333] dark:bg-gray-800 dark:text-white">
        <div className="min-h-screen flex flex-col items-center justify-center ">
          <div className="items-center  max-w-6xl  py-4 m-2 shadow-2xl dark:shadow-purple-950 rounded-md dark:bg-gray-900 bg-white sm:align-middle sm:justify-center xl:w-[50%] lg:w-[60%] md:w-[65%] justify-center align-middle px-0">
            <div className="md:max-w-md sm:px-6 py-4">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  name: "",
                  phone: "",
                }}
                validationSchema={signInSchema}
                onSubmit={(values, { setErrors }) => handle(values, setErrors)}
              >
                {() => (
                  <Form className="xl:w-[160%] lg:w-[125%] md:w-[120%] p-4 ml-8 sm:w-[100%] ">
                    <div className="mb-12 text-center w-full col-span-2">
                      <h1 className="text-5xl font-extrabold main-title w-full py-3 col-span-2 ">
                        Regístrate
                      </h1>
                      <p className="text-sm mt-4 col-span-2">
                        Tienes ya una cuenta?
                        <Link
                          to="/login"
                          className="dark:text-purple-600 text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                        >
                          Inicia sesión aquí
                        </Link>
                      </p>
                    </div>
                    <div className="ml-6">
                      <div className="mb-8">
                        <InputText
                          name="email"
                          label="Email"
                          icon="envelope"
                          placeholder="Introduzca su correo electrónico"
                        />
                      </div>
                      <div className="mb-8">
                        <InputText
                          name="name"
                          label="Nombre"
                          icon="user"
                          placeholder="Introduzca su nombre"
                        />
                      </div>
                      <div className="mb-8">
                        <InputText
                          name="phone"
                          label="Número de teléfono"
                          icon="phone"
                          placeholder="Introduzca su número de teléfono"
                        />
                      </div>
                      <div className="mt-8 col-span-2">
                        <InputText
                          name="password"
                          label="Contraseña"
                          icon="eye"
                          placeholder="Introduzca su contraseña"
                          type="password"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-5">
                        <InputCheck label="Recuerdame" name="remember" />
                      </div>
                      <div className="mt-12">
                        <Button
                          type="submit"
                          variant="gradient"
                          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none dark:bg-purple-600 dark:hover:bg-purple-700"
                        >
                          Registrarse
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p className="my-8 text-sm text-gray-400 text-center">
                        o continua con
                      </p>
                      <div className="space-x-8 flex justify-center">
                        <Button
                          type="button"
                          className="border-none outline-none rounded-full py-0"
                        >
                          <GoogleIcon />
                        </Button>
                        <Button
                          type="button"
                          className="border-none outline-none py-0 rounded-full"
                        >
                          <AppleIcon />
                        </Button>
                        <Button
                          type="button"
                          className="border-none outline-none py-0 rounded-full"
                        >
                          <FacebookIcon />
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

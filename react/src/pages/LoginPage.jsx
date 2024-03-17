import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Header from "../Layouts/Header";
import "../assets/login.css";
import InputCheck from "../components/InputCheck";
import InputText from "../components/InputText";
import AppleIcon from "../components/icons/AppleIcon";
import FacebookIcon from "../components/icons/FacebookIcon";
import GoogleIcon from "../components/icons/GoogleIcon";
import AuthService from "../services/AuthService";
import { addUser } from "../store/userSlice";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Este email no es correcto")
    .required("Este campo es Obligatorio"),
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
      .login(value)
      .then((response) => {
        dispatch(addUser(response.data));
        navigate("/");
      })
      .catch((err) => {
        const status = err.response.status;
        status === 422 && setErrors(err.response.data);
        status === 404 && setErrors({ email: "Este email no esta registrado" });
        status === 401 && setErrors({ password: "La contraseña no coincide" });
      });
  };
  return (
    <>
      <Header />
      <div className="font-[sans-serif] bg-gray-50 text-[#333] dark:bg-gray-800 dark:text-white">
        <div className="min-h-screen flex flex-col items-center justify-center ">
          <div className="grid md:grid-cols-2 items-center  max-w-6xl w-full p-4 m-4 shadow-2xl dark:shadow-purple-950 rounded-md dark:bg-gray-900 bg-white sm:align-middle sm:justify-center">
            <div className="md:max-w-md sm:px-6 py-4 ml- lg:w-[100%] md:w-[200%] sm:w-[100%] ">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setErrors }) => handle(values, setErrors)}
              >
                {() => (
                  <Form>
                    {" "}
                    <div className="mb-12 text-center">
                      <h1 className="text-5xl font-extrabold main-title ">
                        Iniciar sesión
                      </h1>
                      <p className="text-sm mt-4 ">
                        No tienes una cuenta?
                        <a
                          href=""
                          className="dark:text-purple-600 text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                        >
                          Registrate aquí
                        </a>
                      </p>
                    </div>
                    <div className="ml-6">
                      <div className="">
                        <InputText
                          name="email"
                          label="Email"
                          icon="envelope"
                          placeholder="Introduzca su correo electrónico"
                        />
                      </div>
                      <div className="mt-8">
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
                        <div>
                          <a
                            href="jajvascript:void(0);"
                            className="dark:text-purple-600 text-blue-600 font-semibold text-sm hover:underline"
                          >
                            Olvidaste tu contraseña?
                          </a>
                        </div>
                      </div>
                      <div className="mt-12">
                        <button
                          type="submit"
                          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none dark:bg-purple-600 dark:hover:bg-purple-700"
                        >
                          Iniciar Sesión
                        </button>
                      </div>
                    </div>
                    <p className="my-8 text-sm text-gray-400 text-center">
                      o continua con
                    </p>
                    <div className="space-x-8 flex justify-center">
                      <button
                        type="button"
                        className="border-none outline-none"
                      >
                        <GoogleIcon />
                      </button>
                      <button
                        type="button"
                        className="border-none outline-none"
                      >
                        <AppleIcon />
                      </button>
                      <button
                        type="button"
                        className="border-none outline-none"
                      >
                        <FacebookIcon />
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="md:h-[110%] w-[100%] max-md:mt-10 bg-transparent rounded-xl lg:p-12 p-8 mr-28 sm:hidden md:flex">
              <img
                src="../../public/image.jpg"
                className="w-full h-full rounded-xl "
                height="20%"
                alt="login-image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

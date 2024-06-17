import { Button } from "@material-tailwind/react";
import { Field, Form, Formik } from "formik";
import { debounce } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import ExclamationIcon from "../components/icons/ExclamationIcon";
import InputText from "../components/InputText";
import GuestHeader from "../Layouts/GuestHeader";
import ProfileService from "../services/ProfileService";
import { baseUrl } from "../services/Service";
import { clear, updateUser } from "../store/userSlice";

const validationSchema = Yup.object().shape({
  imgPath: Yup.mixed().test(
    "La imagen debe ser de tipo JPG, JPEG o PNG",
    (value) => {
      if (!value) return true;
      return (
        value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type)
      );
    }
  ),
  name: Yup.string().required("El nombre es obligatorio"),
  phone: Yup.string().required("El teléfono es obligatorio"),
  email: Yup.string()
    .email("Formato de correo electrónico no válido")
    .required("El correo electrónico es obligatorio"),
});

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Por favor ingresa tu contraseña")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Las contraseñas deben coincidir")
    .required("Por favor confirma tu contraseña"),
  newPassword: Yup.string()
    .required("Por favor ingresa tu nueva contraseña")
    .notOneOf(
      [Yup.ref("password"), null],
      "La nueva contraseña no puede ser igual a la contraseña actual"
    )
    .min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
});

export default function ProfilePage() {
  const [loading, setLoader] = useState(false);
  const user = useSelector((state) => state.user);
  const [defaultValue, setDefault] = useState(user);
  const profileService = new ProfileService();
  const dispatch = useDispatch();
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const updateProfile = debounce((data, setErrors) => {
    profileService
      .update(user.id, data)
      .then((response) => {
        setDefault(response.data);
        toast.success("Actualizado!", {
          theme: document.querySelector("html").classList.contains("dark")
            ? "dark"
            : "light",
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
        });
        setLoader(false);
        dispatch(updateUser(response.data));
      })
      .catch((error) => {
        setLoader(false);
        const status = error.response.status;
        status === 409 && setErrors({ email: "Este email ya ha sido tomado" });
        status === 404 && setErrors({ email: "Este usuario no existe" });
        status === 500 &&
          setErrors({ email: "Los campos no cumplen el formato necesario" });
      });
  }, 1000);

  const changePassword = (data, resetForm, setErrors) => {
    profileService
      .changePassword(user.id, data)
      .then(() => {
        toast.info("Cambiada!", {
          theme: document.querySelector("html").classList.contains("dark")
            ? "dark"
            : "light",
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
        });
      })
      .catch((error) => {
        const status = error.response.status;
        status === 404 && setErrors({ password: "Este usuario no existe" });
        status === 422 && setErrors(error.response.data);
        status === 401 &&
          setErrors({ password: "La contraseña no es correcta" });
      });
  };

  const discharge = () => {
    profileService
      .discharge(user.id)
      .then(() => {
        dispatch(clear());
        navigate("/login");
      })
      .catch(() => {});
  };
  return (
    <>
      <ToastContainer />
      <GuestHeader />
      <div className=" px-5 md:px-24 py-16 dark:text-white">
        <Formik
          initialValues={{
            imgPath: "",
            name: defaultValue.name,
            phone: defaultValue.phone,
            email: defaultValue.email,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors, resetForm }) => {
            setLoader(true);
            updateProfile(values, setErrors, resetForm);
          }}
        >
          {({ setFieldValue, errors }) => (
            <Form>
              <h1 className="w-full dark:text-white text-4xl font-bold text-center mb-10">
                Hola {user.name}! Cambia tu perfil aquí
              </h1>
              <div className="text-center mb-7">
                <label htmlFor="imgPath" className="rounded-full">
                  <img
                    src={
                      img !== ""
                        ? img
                        : !user?.imgPath.includes("default.png")
                        ? `${baseUrl}stream/img/user/${user?.imgPath}`
                        : "https://thumbs.dreamstime.com/b/línea-icono-del-negro-avatar-perfil-de-usuario-121102131.jpg"
                    }
                    alt=""
                    className="rounded-full md:w-64 w-44 md:h-64 h-44 cursor-pointer mx-auto"
                  />
                  <Field name="imgPath" className="hidden"></Field>
                  <input
                    id="imgPath"
                    name="imgPath"
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("imgPath", file);
                      ["image/jpeg", "image/jpg", "image/png"].includes(
                        file.type
                      ) && setImg(URL.createObjectURL(file));
                    }}
                  />
                </label>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {errors.imgPath && (
                  <div className="col-span-2 text-center justify-center text-red-600 flex">
                    <span className="mt-1.5 me-2">
                      <ExclamationIcon />
                    </span>
                    La imagen debe ser jpg, png o jpeg
                  </div>
                )}
                <div className="md:col-span-1 col-span-2">
                  <InputText
                    label="Nombre"
                    placeholder="Nombre..."
                    icon="user"
                    name="name"
                  />
                </div>
                <div className="md:col-span-1 col-span-2">
                  <InputText
                    label="Teléfono"
                    placeholder="Teléfono..."
                    icon="phone"
                    name="phone"
                  />
                </div>
                <div className="col-span-2">
                  <InputText
                    label="Email"
                    placeholder="example@example.com..."
                    icon="envelope"
                    name="email"
                  />
                </div>
                <div className="col-span-2 justify-center text-center w-full py-5">
                  <Button
                    type="submit"
                    className="w-[60%] shadow-xl py-2.5 px-4 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700  focus:outline-none dark:bg-purple-600 dark:hover:bg-purple-700"
                  >
                    {loading && (
                      <i className="fa-solid fa-spinner fa-spin me-3"></i>
                    )}
                    Actualizar
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <hr className="w-full dark:border-white h-6 opacity-35 my-10" />
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
            newPassword: "",
          }}
          validationSchema={passwordSchema}
          onSubmit={(values, { resetForm, setErrors }) =>
            changePassword(values, resetForm, setErrors)
          }
        >
          <Form>
            <h1 className="text-4xl font-bold text-center col-span-full dark:text-white mb-7">
              Cambia tu contraseña
            </h1>
            <div className="grid grid-cols-2 gap-7">
              <div className="md:col-span-1 col-span-2">
                <InputText
                  label="Nueva contraseña: "
                  placeholder=""
                  icon="eye"
                  type="password"
                  name="newPassword"
                />
              </div>
              <div className="md:col-span-1 col-span-2">
                <InputText
                  label="Confirmar contraseña: "
                  placeholder=""
                  icon="eye"
                  type="password"
                  name="confirmPassword"
                />
              </div>
              <div className="col-span-full">
                <InputText
                  label="Contraseña"
                  placeholder=""
                  icon="eye"
                  type="password"
                  name="password"
                />
              </div>
              <div className="col-span-2 justify-center text-center w-full py-5">
                <Button
                  type="submit"
                  className="w-[60%] shadow-xl py-2.5 px-4 text-sm font-semibold rounded-xl  border border-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-800 dark:text-red-500 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:bg-red-500 dark:bg-transparent bg-red-600"
                >
                  Cambiar
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
        <hr className="w-full dark:border-white h-6 opacity-35 my-10" />

        <h1 className="text-4xl dark:text-white font-bold mb-10">
          Deseas darte de baja?
        </h1>
        <div className="flex">
          <p className="dark:text-white font-semibold text-2xl me-4">
            Pulse aquí:{" "}
          </p>
          <Button
            type="submit"
            onClick={discharge}
            className="md:w-[10%] w-[40%] shadow-xl py-2.5 px-4 text-sm font-semibold rounded-xl  border border-red-600 text-white hover:bg-red-700 focus:outline-none  dark:text-red-500 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-500  dark:bg-transparent bg-red-600"
          >
            Dar de baja
          </Button>
        </div>
      </div>
    </>
  );
}

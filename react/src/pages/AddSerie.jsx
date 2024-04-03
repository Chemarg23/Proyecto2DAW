import { Field, Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import * as Yup from 'yup';
import ExclamationIcon from "../components/icons/ExclamationIcon";
import InputText from "../components/InputText";
import MultiSelect from "../components/MultiSelect";
import GuestHeader from "../Layouts/GuestHeader";
import CategoryService from "../services/CategoryService";
import SerieService from "../services/SerieService";
const validationSchema = Yup.object().shape({
  imgPath: Yup.mixed()
    .required('Imagen de la serie es requerida')
    .test(
      'fileFormat',
      'La imagen debe ser de tipo PNG, JPG o JPEG',
      (value) =>
        value &&
        ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type)
    ),
  name: Yup.string().required('Nombre de la serie es requerido'),
  categories: Yup.array()
    .of(Yup.object())
    .required('Seleccione al menos una categoría'),
  descr: Yup.string().required('Descripción de la serie es requerida'),
});
export default function AddSerie() {
  const [imgUrl, setImgUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const categoryService = new CategoryService();
  const serieService = new SerieService();
  const navigate = useNavigate()
  useEffect(() => {
    categoryService.getAll().then((response) => {
      setCategories(response.data);
    });
  }, []);

  const getOptions = useMemo(() => {
    return categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categories]);

  const add = (values, setErrors) => {
    
    serieService.add(values).then((response) => {
      navigate("/serie/"+response.search,{state:{toast:true}})
    }).catch((err) => console.log(err));
    
  };
  return (
    <>
      <GuestHeader />

      <ToastContainer />
      <div className="dark:text-white px-16 py-12 border-black">
        <Formik
          initialValues={{
            imgPath: "",
            name: "",
            descr: "",
            categories: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors, resetForm }) =>
            add(values, setErrors, resetForm)
          }
        >
          {({ setFieldValue,errors }) => (
            <Form>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 text-center">
                  <h1 className="text-5xl font-bold">Añade una serie</h1>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="hiddenImage w-full align-center"
                    className={
                      imgUrl ? "my-6 w-full flex justify-center" : "hidden"
                    }
                  >
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt="Selected Image"
                        className="w-[50%] h-72"
                      />
                    ) : (
                      <span className="block w-24 h-24 bg-gray-200"></span>
                    )}
                  </label>
                  <label htmlFor="img" className="relative cursor-pointer">
                    <Field id="hiddenImage" name="imgPath" className="hidden" />
                    <input
                      type="file"
                      className="hidden"
                      name="img"
                      id="img"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("imgPath", file);
                        ["image/jpeg", "image/jpg", "image/png"].includes(
                          file.type
                        ) && setImgUrl(URL.createObjectURL(file));
                      }}
                    />
                    <p className="">Imagen de la serie</p>
                    <div className="w-full border border-gray-600 rounded-lg p-2 flex items-center justify-center">
                      {}
                      Seleccione una imagen
                    </div>
                  </label>
                  {errors.imgPath && <span className="gap-x-3 col-span-2  text-red-600 flex">
                    <span className="mt-1"><ExclamationIcon/></span>{errors.imgPath}</span>}
                </div>
                <div className="col-span-2">
                  <InputText
                    icon="serie"
                    label="Nombre"
                    name="name"
                    placeholder="Nombre de la serie..."
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="categories" className="text-white">
                    Selecciona categoría:
                  </label>
                  {categories && (
                    <MultiSelect
                      setter={setFieldValue}
                      values={getOptions}
                      name={"categories"}
                    />
                  )}
                  
                  {errors.categories && <span className="col-span-2 text-red-600 flex gap-x-3"><span className="mt-1"><ExclamationIcon/></span>{errors.categories}</span>}
                </div>
                <div className="col-span-2">
                  <label htmlFor="descr">Descripción</label>
                  <Field
                    as="textarea"
                    name="descr"
                    placeholder="Descripción de la serie..."
                    className="dark:text-white dark:border-gray-500 rounded-lg  border dark:bg-slate-600 w-full"
                    rows="4"
                  />
                  
                  {errors.descr && <span className="col-span-2 text-red-600 flex gap-x-3">
                    <span className="mt-1"><ExclamationIcon/></span>{errors.descr}</span>}
                </div>

                <div className="text-center col-span-2">
                  <button
                    type="submit"
                    className="dark:bg-purple-600 w-96 hover:dark:bg-purple-500 bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

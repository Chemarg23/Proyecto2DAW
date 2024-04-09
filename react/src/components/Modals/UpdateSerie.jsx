import { Button } from "@material-tailwind/react";
import { Field, Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import CategoryService from "../../services/CategoryService";
import SerieService from "../../services/SerieService";
import { addToList, removeFromList } from "../../store/userSlice";
import ExclamationIcon from "../icons/ExclamationIcon";
import InputText from "../InputText";
import MultiSelect from "../MultiSelect";

export default function UpdateSerie({ serie, setSerie, setState }) {
  const [categories, setCategories] = useState([]);
  const categoryService = new CategoryService();
  const serieService = new SerieService();
  const dispatch = useDispatch();
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

  const update = (values, setErrors) => {
    serieService
      .update(values, serie.id)
      .then((response) => {
        setSerie(response);
        setState(false);
        history.pushState(
          null,
          null,
          `/serie/${response.search.replace(/ /g, "-")}`
        );
        dispatch(removeFromList(serie))
        dispatch(addToList(response))
      })
      .catch((err) => {
        const status = err.response.status
        status === 422 && setErrors(err.response.data);
        (status === 500 || status===409 ) && setErrors({name:"Este nombre ya ha sido tomado"})
      
      });
  };
  return (
    <>
      <div className="w-[500%] h-[530%] z-50 fixed bg-white opacity-25  -translate-x-[4%] -translate-y-[90%]" style={{ zIndex: 900 }}></div>
      <div className="z-50 fixed top-[13%] left-[50%] transform -translate-x-1/2 bg-white dark:bg-gray-950 dark:text-white px-10 py-10 gap-y-11 rounded-xl shadow-md w-[90%] md:w-[80%] lg:w-[75%] xl:w-[70%]" style={{ zIndex: 1000 }}>
        <div
          onClick={() => setState(false)}
          className="absolute top-5 right-5 px-2 rounded-full text-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          x
        </div>
        <Formik
          initialValues={{
            img: "",
            name: serie.name,
            descr: serie.descr,
            categories: serie.categories.map((cat) => {
              return { value: cat.id, label: cat.name };
            }),
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors }) => update(values, setErrors)}
        >
          {({ setFieldValue, errors }) => (
            <Form>
              <div>
                <div className="text-center">
                  <h1 className="text-5xl font-bold">Actualiza una serie</h1>
                </div>
                <div>
                  <label htmlFor="img" className="relative cursor-pointer">
                    <Field id="hiddenImage" name="img" className="hidden" />
                    <input
                      type="file"
                      className="hidden"
                      name="img"
                      id="img"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("img", file);
                      }}
                    />
                    <p className="">Imagen de la serie</p>
                    <div className="w-full border border-gray-600 rounded-lg p-2 flex items-center justify-center">
                      {}
                      Seleccione una imagen
                    </div>
                  </label>
                  {errors.img && (
                    <span className="text-red-600 flex items-center gap-x-3">
                      <span className="mt-1">
                        <ExclamationIcon />
                      </span>
                      {errors.img}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <InputText
                    icon="serie"
                    label="Nombre"
                    name="name"
                    placeholder="Nombre del episodio..."
                  />
                  <div className="mt-4">
                    <label htmlFor="categories" className="text-white mt-4">
                      Selecciona categoría:
                    </label>
                    {categories && (
                      <MultiSelect
                        setter={setFieldValue}
                        values={getOptions}
                        name={"categories"}
                        value={serie.categories.map((cat) => {
                          return { value: cat.id, label: cat.name };
                        })}
                      />
                    )}
                    {errors.categories && (
                      <span className="text-red-600 flex items-center gap-x-3">
                        <span className="mt-1">
                          <ExclamationIcon />
                        </span>
                        {errors.categories}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="descr">Descripción</label>
                  <Field
                    as="textarea"
                    name="descr"
                    placeholder="Descripción de la serie..."
                    className="dark:text-white dark:border-gray-500 rounded-lg border dark:bg-slate-600 w-full"
                    rows="4"
                  />
                  {errors.descr && (
                    <span className="text-red-600 flex items-center gap-x-3">
                      <span className="mt-1">
                        <ExclamationIcon />
                      </span>
                      {errors.descr}
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    className="dark:bg-purple-600 w-full hover:dark:bg-purple-500 bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

const validationSchema = Yup.object().shape({
  img: Yup.mixed().test(
    "La imagen debe ser de tipo PNG, JPG o JPEG",
    (value) => {
      if (!value) return true;
      return (
        value && ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
      );
    }
  ),
  name: Yup.string().required("Nombre de la serie es requerido"),
  categories: Yup.array()
    .of(Yup.object())
    .required("Seleccione al menos una categoría"),
  descr: Yup.string().required("Descripción de la serie es requerida"),
});

import { Button } from "@material-tailwind/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import EpisodeService from "../../services/EpisodeService";
import ExclamationIcon from "../icons/ExclamationIcon";
import InputText from "../InputText";

const validationSchema = Yup.object().shape({
  img: Yup.mixed().test(
    "Solo se permiten archivos de tipo PNG o JPG",
    (value) => {
      if (!value) return true;
      return ["image/png", "image/jpeg"].includes(value.type);
    }
  ),
  video: Yup.mixed().test(
    "fileType",
    "Solo se permiten archivos de tipo MP4",
    (value) => {
      if (!value) return true;
      return value.type === "video/mp4";
    }
  ),
  name: Yup.string().required("El título del episodio es requerido"),
  episode_number: Yup.number().required("El número del episodio es requerido"),
});

export default function UpdateEpisodeModal({ setEpisode, setState, episode }) {
  const episodeService = new EpisodeService();
  const [loader, setLoader] = useState(false);

  const addEpisode = async (values, setError) => {
    setLoader(true);
    episodeService
      .update(episode.id, values)
      .then((response) => {
        setEpisode(response);
        setLoader(false);
        setState(false);
        history.pushState({}, '', `/watch/${response.fullname.replace(/ /g, "_")}`);

      })
      .catch((err) => {
        setLoader(false);
        const status = err.response.status
        if(status===409)  setError({name:"Este episodio ya existe"})
        if(status===500)  setError({video:"Ha habido algun fallo al subir los archivos"})
        
      });
  };

  return (
    <>
      <div className="w-[500%] h-[530%] z-50 fixed bg-white opacity-25  -translate-x-[4%] -translate-y-[90%]" style={{ zIndex: 900 }}></div>
      <div className="z-50 fixed top-[10%] left-[50%] transform -translate-x-1/2 bg-white dark:bg-gray-950 dark:text-white px-10 py-10 gap-y-11 rounded-xl shadow-md w-[90%] md:w-[80%] lg:w-[75%] xl:w-[70%]" style={{ zIndex: 1000 }}>
        <div
          onClick={() => setState(false)}
          className="absolute top-5 right-5 px-2 rounded-full text-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          x
        </div>
        <Formik
          initialValues={{
            img: "",
            video: "",
            name: episode.name,
            episode_number: episode.episodeNumber,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors }) => addEpisode(values, setErrors)}
        >
          {({ setFieldValue, errors }) => (
            <Form>
              <div>
                <div className="text-center">
                  <h1 className="text-5xl font-bold">Añade un capítulo</h1>
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
                    <p className="mt-3">
                      Imagen del capítulo (En caso de no seleccionar, se tomará
                      la de la serie)
                    </p>
                    <div className="w-full border border-gray-600 rounded-lg p-2 flex items-center justify-center">
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
                <div>
                  <label htmlFor="video" className="relative cursor-pointer">
                    <Field id="hiddenImage" name="video" className="hidden" />
                    <input
                      type="file"
                      className="hidden"
                      name="video"
                      id="video"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("video", file);
                      }}
                    />
                    <p className="mt-6">Episodio</p>
                    <div className="w-full border border-gray-600 rounded-lg p-2 flex items-center justify-center">
                      Episodio
                    </div>
                  </label>
                  {errors.video && (
                    <span className="text-red-600 flex items-center gap-x-3">
                      <span className="mt-1">
                        <ExclamationIcon />
                      </span>
                      {errors.video}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <InputText
                    label="Título del Episodio"
                    name="name"
                    icon="serie"
                    placeholder="Título del Episodio"
                  />
                </div>
                <div className="my-4">
                  <InputText
                    label="Número del Episodio"
                    type="number"
                    name="episode_number"
                    placeholder="Número de episodio"
                  />
                </div>
                <Button
                  type="submit"
                  className="dark:bg-purple-600 w-full hover:dark:bg-purple-500 bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  {" "}
                  {loader && (
                    <i className="fa-solid fa-spinner fa-spin me-3"></i>
                  )}
                  Añadir
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

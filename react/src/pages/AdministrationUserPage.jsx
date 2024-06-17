import { Button } from "@material-tailwind/react";
import { useEffect, useMemo, useState } from "react";
import AddUserModal from "../components/Modals/AddUserModal";
import ConfirmDischargeModal from "../components/Modals/ConfirmDischargeModal";
import DeleteUserModal from "../components/Modals/DeleteUserModal";
import GuestHeader from "../Layouts/GuestHeader";
import UserService from "../services/UserService";

export default function AdministrationUserPage() {
  const columns = [
    "Id",
    "Nombre",
    "Email",
    "Teléfono",
    "Fecha de alta",
    "Estado",
    "Acciones",
  ];
  const [users, setUsers] = useState([]);
  const service = new UserService();
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState([]);
  const [dischargeModal, setDischargeModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  
  const filteredData = useMemo(() => {
    const finalData = users.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );
    setTotalPages(
      Array.from(
        { length: Math.ceil(finalData.length / 10) },
        (_, index) => index
      )
    );
    Math.ceil(finalData.length / 10) < page && setPage(0);
    return finalData.slice(page * 10, page * 10 + 10);
  }, [search, page, users]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await service.getAllUsers();
      setUsers(response);
      setTotalPages(
        Array.from(
          { length: Math.ceil(response.length / 10) },
          (_, index) => index
        )
      );
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="">
        <GuestHeader />

        <div className="w-full delay-700 px-[10%] py-10">
          <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-3">
            <div className="w-full sm:w-auto mb-3 sm:mb-0">
              <Button
                onClick={() => setAddModal(true)}
                className=" px-3 w-full dark:shadow-md shadow-xl dark:shadow-green-800 py-2.5  text-sm font-semibold rounded-xl border border-green-600 text-white hover:bg-green-700 focus:outline-none dark:text-green-500 dark:border-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:bg-transparent bg-green-600"
              >
                <i className="bi bi-plus cursor-pointer scale-110"></i> Nuevo
              </Button>
            </div>
            <div className="search-container flex items-center w-full sm:w-auto mb-3 sm:mb-0 dark:text-white">
              <input
                type="text"
                className="py-2 px-1 rounded-xl dark:bg-gray-700 bg-gray-100 focus:ring-blue-500 w-full"
                placeholder="   Buscar..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <i className="bi bi-search search-icon cursor-pointer p-3"></i>
            </div>
          </div>

          <table className="border-white border-spacing-1.5 w-full  rounded-lg  table-auto divide-y divide-gray-200">
            <thead className="dark:bg-slate-950 dark:text-white rounded-lg ">
              <tr>
                {columns.map((column, index) => (
                  <th className="px-10 py-4 truncate" key={index}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="dark:text-white truncate text-wrap dark:bg-slate-900">
              {filteredData.map((data) => (
                <tr
                  key={data.id}
                  className="p-5 dark:hover:bg-gray-700 hover:bg-gray-200"
                >
                  <td className="py-4 px-6 text-center truncate  border-y-2 border-opacity-40 border-y-slate-300 dark:border-y-gray-500">
                    {data.id}
                  </td>
                  <td className="py-4 px-6 text-center truncate  border-y-2 border-opacity-40 border-y-slate-300 dark:border-y-gray-500">
                    {data.name}
                  </td>
                  <td className="py-4 px-6 text-center truncate  border-y-2 border-opacity-40 border-y-slate-300 dark:border-y-gray-500">
                    {data.email}
                  </td>
                  <td className="py-4 px-6 text-center truncate  border-y-2 border-opacity-40 border-y-slate-300 dark:border-y-gray-500">
                    {data.phone}
                  </td>
                  <td className="py-4 px-6 text-center truncate  border-y-2 border-opacity-40 border-y-slate-300 dark:border-y-gray-500">
                    {data.createdAt}
                  </td>
                  <td className="py-4 px-6 text-center truncate  border-y-2 border-opacity-40 border-y-slate-300 dark:border-y-gray-500">
                    {data.dischargeDate === null ? "Activo" : "Inactivo"}
                  </td>
                  <td className="py-4 px-6 text-center truncate  border-y-2 border-opacity-40 border-y-slate-300 dark:border-y-gray-500">
                    {data.dischargeDate === null ? (
                      <Button
                        onClick={() => {
                          setDischargeModal(true);
                          setUser(data);
                        }}
                        className="2-[50%] dark:shadow-md dark:shadow-red-600  shadow-xl py-2.5 px-4 text-sm font-semibold rounded-xl  border border-red-600 text-white hover:bg-red-700 focus:outline-none  dark:text-red-500 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-500  dark:bg-transparent bg-red-600"
                      >
                        Baja
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setUser(data);
                          setDeleteModal(true);
                        }}
                        className="2-[50%] dark:shadow-md dark:shadow-red-600 shadow-xl py-2.5 px-4 text-sm font-semibold rounded-xl  border border-red-600 text-white hover:bg-red-700 focus:outline-none  dark:text-red-500 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-500  dark:bg-transparent bg-red-600"
                      >
                        Eliminar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end w-[87%] text-md dark:text-white mt-1">
            <p className="">
              Mostrando de {page * 10} a{" "}
              {page * 10 + 10 > filteredData.length
                ? filteredData.length
                : page * 10 + 10}{" "}
              de {filteredData.length < 10 ? filteredData.length : users.length}{" "}
              usuarios
            </p>
            <p className="cursor-pointer px-5">
              {page > 0 && filteredData.length >= 10 && (
                <span
                  className="py-1 px-3 rounded-lg cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-200 "
                  onClick={() => setPage((page) => page - 1)}
                >
                  {" "}
                  Anterior
                </span>
              )}
              {users.length / 10 > 1 &&
                totalPages.map((page) => (
                  <span
                    className="py-1 px-3 rounded-lg cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-200 "
                    key={page}
                    onClick={() => setPage(page)}
                  >
                    {page + 1}
                  </span>
                ))}
              {page < filteredData.length - 1 && (
                <span
                  className="py-1 px-3 rounded-lg cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-200 "
                  onClick={() => setPage((page) => page + 1)}
                >
                  Siguiente
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {dischargeModal && (
        <ConfirmDischargeModal
          setState={setDischargeModal}
          user={user}
          users={users}
          setUsers={setUsers}
        />
      )}
      {deleteModal && (
        <DeleteUserModal
          setState={setDeleteModal}
          user={user}
          users={users}
          setUsers={setUsers}
        />
      )}
      {addModal && (
        <AddUserModal
          setState={setAddModal}
          user={user}
          users={users}
          setUsers={setUsers}
        />
      )}
    </>
  );
}

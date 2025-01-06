
"use client"
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { PercentageGauge } from "../Charts/PercentageGauge";
import Link from "next/link";
import { getPreguntaById, getUserById } from "@/actions";
import { CustomLoading } from "@/components";
import moment from "moment";
import "moment/locale/es";
import toast from "react-hot-toast";

export const ViewDesempeno = ({ userid }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preguntasConResultados, setPreguntasConResultados] = useState([]);
  const [preguntasFiltradas, setPreguntasFiltradas] = useState([]);
  const [ultimaPregunta, setUltimaPregunta] = useState(null);
  const [respuestasPorDia, setRespuestasPorDia] = useState([]);
  const [filtroAplicado, setFiltroAplicado] = useState(false);
  const [errorFecha, setErrorFecha] = useState("");
  moment.locale("es");

  // Validar fechas cuando cambien
  useEffect(() => {
    if (startDate && endDate) {
      const inicio = moment(startDate);
      const fin = moment(endDate);
      
      if (fin.isBefore(inicio)) {
        toast.error("La fecha final debe ser mayor o igual a la fecha inicial");
      } else {
        setErrorFecha("");
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setLoading(true);
    const fetchResultados = async () => {
      try {
        console.log("Comienza el fetching getUserById");
        console.log({userid});
        
        const user = await getUserById(userid);
        console.log(user);
        
        const resultados = user.data.resultados;
        const preguntas = await Promise.all(
          resultados.map(async (resultado) => {
            const pregunta = await getPreguntaById(resultado.id_pregunta);
            return {
              ...pregunta.data,
              ...resultado,
            };
          })
        );

        console.log("comienza el Promise all getPreguntaById");


        const preguntasOrdenadas = preguntas.sort(
          (a, b) => new Date(b.fecha_respuesta) - new Date(a.fecha_respuesta)
        );

        setPreguntasConResultados(preguntasOrdenadas);
        setPreguntasFiltradas(preguntasOrdenadas);
        setUltimaPregunta(preguntasOrdenadas[0]);

        // Calcular respuestas por día iniciales
        actualizarRespuestasPorDia(preguntasOrdenadas);

        console.log("finalizar despues del sort");

      } catch (error) {
        console.error("Error fetching resultados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResultados();
  }, [userid]);

  const actualizarRespuestasPorDia = (preguntas) => {
    const respuestasAgrupadas = preguntas.reduce((acc, respuesta) => {
      const fecha = moment(respuesta.fecha_respuesta).format('DD/MM/YYYY');
      if (!acc[fecha]) {
        acc[fecha] = { total: 0, aciertos: 0 };
      }
      acc[fecha].total += 1;
      if (respuesta.es_correcta) acc[fecha].aciertos += 1;
      return acc;
    }, {});

    const respuestasArray = Object.entries(respuestasAgrupadas)
      .sort(([fechaA], [fechaB]) => 
        moment(fechaB, 'DD/MM/YYYY') - moment(fechaA, 'DD/MM/YYYY'))
      .slice(0, 6)
      .map(([fecha, datos]) => ({
        fecha,
        preguntas: datos.total,
        aciertos: datos.aciertos,
      }));

    setRespuestasPorDia(respuestasArray);
  };

  const aplicarFiltros = (e) => {
    e.preventDefault();
     // Validación de fechas
     if (!startDate || !endDate) {
      toast.error("Ambas fechas son requeridas");
      return;
    }

    const inicio = moment(startDate);
    const fin = moment(endDate);
    
    if (fin.isBefore(inicio)) {
      toast.error("La fecha final debe ser mayor o igual a la fecha inicial");
      return;
    }

    const preguntasFiltradas = preguntasConResultados.filter((pregunta) => {
      const fechaRespuesta = moment(pregunta.fecha_respuesta);
      return fechaRespuesta.isBetween(startDate, endDate, 'day', '[]');
    });

    setPreguntasFiltradas(preguntasFiltradas);
    setFiltroAplicado(true);
  };

  const contarAciertosYFallos = (preguntas) => {
    return preguntas.reduce(
      (contador, pregunta) => {
        if (pregunta.es_correcta) {
          contador.aciertos += 1;
        } else {
          contador.fallos += 1;
        }
        return contador;
      },
      { aciertos: 0, fallos: 0 }
    );
  };

  const { aciertos, fallos } = contarAciertosYFallos(preguntasFiltradas);

  if (loading) {
    return (
      <CustomLoading
        color="#d9b16b"
        height={24}
        width={24}
        className="flex justify-center items-center h-[50vh]"
      />
    );
  }

  return (
    <div className="pb-10">
      <div className="pb-2">
        <div className="flex justify-end">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-blue-500 font-bold rounded flex items-center text-sm transition duration-300"
          >
            <FaFilter className="mr-2" /> Filtrar
          </button>
        </div>

        <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          showFilters ? "max-h-96" : "max-h-0"
        }`}>
          <div className="flex flex-col items-center justify-center px-1 py-2 sm:py-4">
            <form
              onSubmit={aplicarFiltros}
              className="bg-white shadow-md rounded-lg p-6 w-full flex flex-col sm:flex-row sm:gap-4"
            >
              <div className="mb-4 sm:mb-0 sm:w-1/3">
                <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha Inicial:
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="mb-4 sm:mb-0 sm:w-1/3">
                <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha Final:
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="flex justify-center items-end sm:mb-0 sm:w-1/3">
                <button
                  type="submit"
                  className="bg-primary text-white font-bold py-2 px-4 rounded h-[46px] w-full"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="p-4 flex flex-col justify-start sm:items-center bg-white shadow-sm rounded-lg border border-gray-100 w-[60%]">
            <h2 className="text-xl sm:text-4xl font-semibold text-gray-700 sm:text-center leading-tight pb-2">
              {filtroAplicado
                ? `Del ${moment(startDate).format("D [de] MMMM [del] YYYY")} al ${moment(
                    endDate
                  ).format("D [de] MMMM [del] YYYY")}`
                : moment(ultimaPregunta?.fecha_respuesta).format(
                    "D [de] MMMM [del] YYYY"
                  )}
            </h2>
            <h3 className="text-sm text-gray-600 mb-1">
              {filtroAplicado ? "Periodo filtrado" : "Última actualización"}
            </h3>
          </div>
          <div className="p-4 flex flex-col justify-start items-center bg-white shadow-sm rounded-lg border border-gray-100 w-[40%]">
            <h2 className="text-lg font-semibold text-gray-700 text-center leading-tight pb-2">
              Preguntas resueltas
            </h2>
            <h3 className="text-sm text-gray-600 mb-1">En el periodo</h3>
            <p className="text-4xl font-bold text-primary">{preguntasFiltradas.length}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="p-6 flex flex-col justify-center items-center bg-white shadow-sm rounded-lg border border-gray-100 sm:w-[60%]">
            <h2 className="text-lg font-semibold text-gray-700 text-center pb-2">
              {filtroAplicado ? "Rendimiento en el periodo" : "Mi rendimiento"}
            </h2>
            <PercentageGauge 
              aciertos={aciertos} 
              totalRespuestas={preguntasFiltradas.length} 
            />
          </div>

          <div className="flex w-full gap-2 sm:flex-col sm:w-[40%]">
            <div className="p-6 flex flex-col justify-center items-center bg-white shadow-sm rounded-lg border border-gray-100 w-1/2 sm:w-full">
              <h2 className="text-lg font-semibold text-gray-700">Aciertos</h2>
              <p className="text-4xl font-bold text-green-600">{aciertos}</p>
              <p className="text-sm text-gray-600">
                {((aciertos / preguntasFiltradas.length) * 100).toFixed(1)}%
              </p>
            </div>

            <div className="p-6 flex flex-col justify-center items-center bg-white shadow-sm rounded-lg border border-gray-100 w-1/2 sm:w-full">
              <h2 className="text-lg font-semibold text-gray-700">Fallos</h2>
              <p className="text-4xl font-bold text-red-600">{fallos}</p>
              <p className="text-sm text-gray-600">
                {((fallos / preguntasFiltradas.length) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col justify-center items-center bg-white shadow-sm rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">
            Últimas preguntas respondidas
          </h2>
          <div className="w-full overflow-x-auto mt-4">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-2">FECHA</th>
                  <th className="px-4 py-2">PREGUNTAS</th>
                  <th className="px-4 py-2">ACIERTOS</th>
                </tr>
              </thead>
              <tbody>
                {respuestasPorDia.map((dato, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2">{dato.fecha}</td>
                    <td className="px-4 py-2">{dato.preguntas}</td>
                    <td className="px-4 py-2">{dato.aciertos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            href="/inicio/historial"
            className="text-blue-500 hover:underline text-sm pt-4"
          >
            Ver historial
          </Link>
        </div>
      </div>
    </div>
  );
};


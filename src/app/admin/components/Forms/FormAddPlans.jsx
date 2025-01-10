"use client"
import { useState, useEffect } from "react";
import { createPlan, updatePlan } from "@/actions";
import { toast } from "react-hot-toast";
import { extractDescriptionWithoutFeatures, extractFeaturesFromDescription } from "@/utils/extractDescription";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";


export const FormAddPlans = ({ plan, onClose, user }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo_plan: "Básico",
    precio: 0,
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
  });
  const { toggleRefreshTable } = useRedrawStore();
  const [features, setFeatures] = useState([""]);

  useEffect(() => {
    if (plan) {
      // Extract features from description when editing
      const extractedFeatures = extractFeaturesFromDescription(plan.descripcion);
      const plainDescription = extractDescriptionWithoutFeatures(plan.descripcion);
      
      // Format dates for input if they exist
      const formattedStartDate = plan.fecha_inicio ? new Date(plan.fecha_inicio).toISOString().split('T')[0] : "";
      const formattedEndDate = plan.fecha_fin ? new Date(plan.fecha_fin).toISOString().split('T')[0] : "";
      
      setFormData({
        ...plan,
        precio:parseFloat(plan.precio),
        descripcion: plainDescription,
        fecha_inicio: formattedStartDate,
        fecha_fin: formattedEndDate
      });
      setFeatures(extractedFeatures.length > 0 ? extractedFeatures : [""]);
    }
  }, [plan]);

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate dates
    if (new Date(formData.fecha_fin) <= new Date(formData.fecha_inicio)) {
      toast.error("La fecha de fin debe ser posterior a la fecha de inicio");
      return;
    }
    
    // Combine description with features
    const featuresText = features.filter(f => f.trim()).join(", ");
    const completeDescription = `${formData.descripcion} -${featuresText}-`;
    
    const finalData = {
      ...formData,
      descripcion: completeDescription
    };
    
    console.log("Data to be submitted:", finalData);
    
    try {
      if (plan) {
        const respUpdatePlan = await updatePlan(plan.id_Plan,finalData);
        if (respUpdatePlan.success) {
          toast.success("Plan actualizado con éxito");
          toggleRefreshTable();
        } else {
          toast.error(respUpdatePlan.message);
          console.log(respUpdatePlan.message);
        }
      } else {
        const respCreatePlan = await createPlan(finalData);
        if (respCreatePlan.success) {
          toast.success("Plan Creado con éxito");
          toggleRefreshTable();
        } else {
          toast.error(respCreatePlan.message);
        }
      }
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un error al procesar el plan");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Nombre del Plan
        </label>
        <input
          type="text"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tipo</label>
        <select
          value={formData.tipo_plan}
          onChange={(e) => setFormData({ ...formData, tipo_plan: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="basic">Básico</option>
          <option value="premium">Intensivo</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Precio(PYG)</label>
        <input
          type="number"
          value={formData.precio}
          onChange={(e) =>
            setFormData({ ...formData, precio: parseFloat(e.target.value) })
          }
          className="w-full p-2 border rounded"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha de Inicio</label>
          <input
            type="date"
            value={formData.fecha_inicio}
            onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fecha de Fin</label>
          <input
            type="date"
            value={formData.fecha_fin}
            onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })}
            className="w-full p-2 border rounded"
            min={formData.fecha_inicio} // Prevent selecting dates before start date
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
          className="w-full p-2 border rounded"
          rows="3"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Características
        </label>
        {features.map((feature, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Característica del plan"
              required
            />
            {features.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="text-red-500 px-2"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddFeature}
          className="text-blue-500 hover:text-blue-700"
        >
          Agregar Característica
        </button>
      </div>

      <div className="flex justify-end gap-2">
        <button type="submit" className="max-w-[600px] w-full px-4 py-2 bg-primary text-white rounded-md">
          {plan ? "Guardar Cambios" : "Crear Plan"}
        </button>
      </div>
    </form>
  );
};
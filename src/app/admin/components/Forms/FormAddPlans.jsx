
"use client"
import { useState } from "react";

export const FormAddPlans = ({ plan, onClose }) => {
  const [formData, setFormData] = useState(
    plan || {
      name: "",
      type: "basic",
      price: 0,
      description: "",
      features: [""],
      status: "active",
    }
  );

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({
      ...formData,
      features: updatedFeatures,
    });
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: updatedFeatures,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call
    // const result = await createPlan(formData) or await updatePlan(formData)
    toast.success(
      plan ? "Plan actualizado con éxito" : "Plan creado con éxito"
    );
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Nombre del Plan
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tipo</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="basic">Básico</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Precio</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) })
          }
          className="w-full p-2 border rounded"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
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
        {formData.features.map((feature, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Característica del plan"
              required
            />
            {formData.features.length > 1 && (
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

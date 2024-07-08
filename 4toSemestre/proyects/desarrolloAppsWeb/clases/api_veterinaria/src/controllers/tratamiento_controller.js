const detalleTratamiento = (req, res) => {
  res.send("Detalle del tratamiento");
};
const registrarTratamiento = (req, res) => {
  res.send("Registrar tratamiento");
};
const actualizarTratamiento = (req, res) => {
  res.send("Actualizar tratamiento");
};
const eliminarTratamiento = (req, res) => {
  res.send("Eliminar tratamiento");
};
const cambiarEstado = (req, res) => {
  res.send("Cambiar estado del tratamiento");
};

export {
  detalleTratamiento,
  registrarTratamiento,
  actualizarTratamiento,
  eliminarTratamiento,
  cambiarEstado,
};

import * as dao from "./dao.js";
function ModuleRoutes(app) {
    const deleteModule = async (req, res) => {
        const status = await dao.deleteModule(req.params.mid)
        res.json(status);
      }
    
  const createModule = async (req, res) => {
    const newModule = {
      ...req.body,
      course: req.params.cid,
    }
    const result = await dao.createModule(newModule);
    res.json(result);
  }


  const updateModule = async (req, res) => {
    const { mid } = req.params;
    const status = await dao.updateModule(mid, req.body)
    res.json(status);
  }

  const getModules = async (req, res) => {
    const modules = await dao.findModuleByClassId(req.params.cid)
    if (modules) {
      res.json(modules);
    }
    else { res.status(200); }
  }
 
   
    app.put("/api/modules/:mid", updateModule);
    app.delete("/api/modules/:mid", deleteModule);
    app.post("/api/courses/:cid/modules", createModule);
    app.get("/api/courses/:cid/modules", getModules);

    

}
export default ModuleRoutes;
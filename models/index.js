import db from "../config/db.js";

import Exercise from "./exerciseModel.js";
import User from "./userModel.js";
import Plan from "./planModel.js";
import Activity from "./activityModel.js";
import BodyPart from "./bodyPartModel.js";
import Category from "./categoryModel.js";
import Routine from "./routineModel.js";
import Serie from "./serieModel.js";
import Rol from "./rolModel.js";

// RELACIÓN USUARIO-PLAN -- ONE TO MANY 
User.hasMany(Plan, { foreignKey: 'userId' });
Plan.belongsTo(User, { foreignKey: 'userId' });

// RELACIÓN USUARIO-ROL -- ONE TO MANY 
Rol.hasMany(User, { foreignKey: 'rolId' });
User.belongsTo(Rol, { foreignKey: 'rolId' });

// RELACIÓN PLAN-RUTINA -- ONE TO MANY
Plan.hasMany(Routine, { foreignKey: 'planId' });
Routine.belongsTo(Plan, { foreignKey: 'planId' });

// RELACIÓN RUTINA-ACTIVIDAD -- ONE TO MANY
Routine.hasMany(Activity, { foreignKey: 'routineId' });
Activity.belongsTo(Routine, { foreignKey: 'routineId' });

// RELACIÓN ACTIVIDAD-SERIE -- ONE TO MANY
Activity.hasMany(Serie, { foreignKey: 'activityId' });
Serie.belongsTo(Activity, { foreignKey: 'activityId' });

// RELACIÓN ACTIVIDAD-EJERCICIO -- MANY TO MANY
Activity.belongsToMany(Exercise, { through: "ActivityExercise" });
Exercise.belongsToMany(Activity, { through: 'ActivityExercise' });

// RELACIÓN EJERCICIO-GRUPO MUSCULAR -- MANY TO MANY
BodyPart.belongsToMany(Exercise, { through: "ExerciseBodyPart" });
Exercise.belongsToMany(BodyPart, { through: 'ExerciseBodyPart' });

// RELACIÓN EJERCICIO-CATEGORIA -- ONE TO MANY
Category.hasMany(Exercise, { foreignKey: 'categoryId' });
Exercise.belongsTo(Category, { foreignKey: 'categoryId' });

export { Exercise, User, Plan, Routine, Activity, BodyPart, Category, Serie, Rol };

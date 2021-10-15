import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "@/views/Welcome.vue";
import Login from "@/views/login/Login.vue";
import AuthLayout from "@/layouts/Auth";
import VerifyLogin from "@/views/login/VerifyLogin.vue";
import Report from "@/layouts/Report.vue";
import ModuleVisualizationBase from "@/views/reports/moduleVisualization/BaseLevel.vue";
import ModuleVisualizationFirst from "@/views/reports/moduleVisualization/FirstLevel.vue";
import ModuleVisualizationSecond from "@/views/reports/moduleVisualization/SecondLevel.vue";
import ModuleVisualizationThird from "@/views/reports/moduleVisualization/ThirdLevel.vue";
import ResourceTypeUsageBase from "@/views/reports/resourceTypeUsage/BaseLevel.vue";
import ResourceTypeUsageFirst from "@/views/reports/resourceTypeUsage/FirstLevel.vue";
import ResourceTypeUsageSecond from "@/views/reports/resourceTypeUsage/SecondLevel.vue";
import ResourceTypeUsageThird from "@/views/reports/resourceTypeUsage/ThirdLevel.vue";
import FileTypeUsageBase from "@/views/reports/fileTypeUsage/BaseLevel.vue";
import FileTypeUsageFirst from "@/views/reports/fileTypeUsage/FirstLevel.vue";
import FileTypeUsageSecond from "@/views/reports/fileTypeUsage/SecondLevel.vue";
import FileTypeUsageThird from "@/views/reports/fileTypeUsage/ThirdLevel.vue";
import InteractionByResourceBase from "@/views/reports/interactionByResource/BaseLevel.vue";
import InteractionByResourceFirst from "@/views/reports/interactionByResource/FirstLevel.vue";
import InteractionByResourceSecond from "@/views/reports/interactionByResource/SecondLevel.vue";
import ResourceVisualizationBase from "@/views/reports/resourceVisualization/BaseLevel.vue";
import ResourceVisualizationFirst from "@/views/reports/resourceVisualization/FirstLevel.vue";
import ResourceVisualizationSecond from "@/views/reports/resourceVisualization/SecondLevel.vue";
import CourseComunnicationBase from "@/views/reports/courseCommunication/BaseLevel.vue";
import CourseComunnicationFirst from "@/views/reports/courseCommunication/FirstLevel.vue";
import CourseComunnicationSecond from "@/views/reports/courseCommunication/SecondLevel.vue";
import EvaluationPanicBase from "@/views/reports/evaluationPanic/BaseLevel.vue";
import EvaluationPanicFirst from "@/views/reports/evaluationPanic/FirstLevel.vue";
import EvaluationPanicSecond from "@/views/reports/evaluationPanic/SecondLevel.vue";
import EvaluationPanicThird from "@/views/reports/evaluationPanic/ThirdLevel.vue";
import CourseInteractionFirst from "@/views/reports/courseInteraction/FirstLevel.vue";
import CourseInteractionSecond from "@/views/reports/courseInteraction/SecondLevel.vue";
import CourseList from "@/views/courses/CourseList.vue";

Vue.use(VueRouter);

function existToken() {
  return !!localStorage.udecdash_token && !!localStorage.udecdash_user;
}
const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      if (existToken()) {
        next("courses");
      } else {
        delete localStorage.udecdash_token;
        delete localStorage.udecdash_user;
        if(localStorage.error_code == null){
          localStorage.setItem("error_code", 401);
        }
        next("login");
      }
    }
  },
  {
    path: "/login",
    component: AuthLayout,
    children: [
      {
        path: "/",
        name: "login",
        component: Login
      },
      {
        path: ":code",
        name: "verifyLogin",
        component: VerifyLogin
      }
    ]
  },
  {
    path: "/courses",
    beforeEnter: (to, from, next) => {
      if (existToken()) {
        next();
      } else {
        delete localStorage.udecdash_token;
        delete localStorage.udecdash_user;
        localStorage.setItem("error_code", 401);
        next("login");
      }
    },
    name: "CourseList",
    component: CourseList
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/course/:course_id/report",
    beforeEnter: (to, from, next) => {
      if (existToken()) {
        next();
      } else {
        delete localStorage.udecdash_token;
        delete localStorage.udecdash_user;
        localStorage.setItem("error_code", 401);
        next("login");
      }
    },
    component: Report,
    name: "report",
    meta: {
      breadcrumb: [{ name: "Reportes", value: "report" }]
    },
    children: [
      {
        path: "module_visualization",
        component: ModuleVisualizationBase,
        children: [
          {
            path: "/",
            component: ModuleVisualizationFirst,
            name: "module_visualization_first",
            props: true,
            meta: {
              breadcrumb: [{ name: "Visualización por modulo",abr:"Visualización por modulo", value: "module_visualization" }]
            }
          },
          {
            path: ":module_id",
            component: ModuleVisualizationSecond,
            name: "module_visualization_second",
            props: true,
            meta: {
              breadcrumb: [
                {
                  name: "Visualización por modulo",
                  abr:"Vm",
                  link: "module_visualization_first",
                  value: "module_visualization"
                },
                { name: "Estudiantes",  abr:"Estudiantes", value: "module_visualization" }
              ]
            }
          },
          {
            path: ":module_id/:user_id",
            component: ModuleVisualizationThird,
            name: "module_visualization_third",
            props: true,
            meta: {
              breadcrumb: [
                {
                  name: "Visualización por modulo",
                  abr:"Vm",
                  link: "module_visualization_first",
                  value: "module_visualization"
                },
                {
                  name: "Estudiantes",
                  abr:"Estudiantes",
                  link: "module_visualization_second",
                  value: "module_visualization"
                },
                { name: "Recursos",abr:"Recursos", value: "module_visualization" }
              ]
            }
          }
        ]
      },

      {
        path: "resource_type_usage",
        component: ResourceTypeUsageBase,
        children: [
          {
            path: "/",
            component: ResourceTypeUsageFirst,
            name: "resource_type_usage_first",
            meta: {
              breadcrumb: [
                { name: "Visualización por tipo de recurso", abr:"Visualización por tipo de recurso", value: "resource_type_usage" }
              ]
            }
          },
          {
            path: ":type",
            component: ResourceTypeUsageSecond,
            props: true,
            name: "resource_type_usage_second",
            meta: {
              breadcrumb: [
                {
                  name: "Visualización por tipo de recurso",
                  abr:"Vtr",
                  link: "resource_type_usage_first",
                  value: "resource_type_usage"
                },
                { name: "Recursos",abr:"Recursos", value: "resource_type_usage" }
              ]
            }
          },
          {
            path: ":type/:resource",
            component: ResourceTypeUsageThird,
            props: true,
            name: "resource_type_usage_third",
            meta: {
              breadcrumb: [
                {
                  name: "Visualización por tipo de recurso",
                  abr:"Vtr",
                  link: "resource_type_usage_first",
                  value: "resource_type_usage"
                },
                {
                  name: "Recursos",
                  abr:"Recursos",
                  link: "resource_type_usage_second",
                  value: "resource_type_usage"
                },
                  { name: "Estudiantes", abr:"Estudiantes",value: "resource_type_usage" }
              ]
            }
          }
        ]
      },
      {
        path: "file_type_usage",
        component: FileTypeUsageBase,
        children: [
          {
            path: "/",
            component: FileTypeUsageFirst,
            name: "file_type_usage_first",
            meta: {
              breadcrumb: [
                { name: "Visualización por tipo de archivos",abr:"Visualización por tipo de archivos", value: "file_type_usage" }
              ]
            }
          },
          {
            path: ":type/",
            component: FileTypeUsageSecond,
            props: true,
            name: "file_type_usage_second",
            meta: {
              breadcrumb: [
                {
                  name: "Visualización por tipo de archivos",
                  abr:"Vta",
                  link: "file_type_usage_first",
                  value: "file_type_usage"
                },
                { name: "Archivos", abr:"Archivos", value: "file_type_usage" }
              ]
            }
          },
          {
            path: ":type/:file",
            component: FileTypeUsageThird,
            props: true,
            name: "file_type_usage_third",
            meta: {
              breadcrumb: [
                {
                  name: "Visualización por tipo de archivos",
                  abr:"Vta",
                  link: "file_type_usage_first",
                  value: "file_type_usage"
                },
                {
                  name: "Archivos",
                  abr:"Archivos",
                  link: "file_type_usage_second",
                  value: "file_type_usage"
                },
                { name: "Estudiantes", abr:"Estudiantes", value: "file_type_usage" }
              ]
            }
          }
        ]
      },
      {
        path: "interaction_by_resource",
        component: InteractionByResourceBase,
        children: [
          {
            path: "/",
            component: InteractionByResourceFirst,
            name: "interaction_by_resource_first",
            meta: {
              breadcrumb: [
                { name: "Interacción por recurso", abr:"Interacción por recurso",value: "interaction_by_resource" }
              ]
            }
          },

          {
            path: ":module_id/:resource_id",
            component: InteractionByResourceSecond,
            name: "interaction_by_resource_second",
            meta: {
              breadcrumb: [
                {
                  name: "Interacción por recurso",
                  abr:"Ir",
                  value: "interaction_by_resource",
                  link: "interaction_by_resource_first"
                },
                { name: "Estudiantes",abr:"Estudiantes", value: "interaction_by_resource" }
              ]
            }
          }
        ]
      },
      {
        path: "resource_visualization",
        component: ResourceVisualizationBase,
        children: [
          {
            path: "/",
            component: ResourceVisualizationFirst,
            props: true,
            name: "resource_visualization_first",
            meta: {
              breadcrumb: [
                { name: "Visualización de recursos",abr: "Visualización de recursos", value: "resource_visualization" }
              ]
            }
          },
          {
            path: ":module_id/:resource_id",
            component: ResourceVisualizationSecond,
            props: true,
            name: "resource_visualization_second",
            meta: {
              breadcrumb: [
                {
                  name: "Visualización de recursos",
                  abr:"Vr",
                  link: "resource_visualization_first",
                  value: "resource_visualization"
                },
                { name: "Estudiantes", abr:"Estudiantes", value: "resource_visualization" }
              ]
            }
          }
        ]
      },
      {
        path: "course_communication",
        component: CourseComunnicationBase,
        children: [
          {
            path: "/",
            component: CourseComunnicationFirst,
            name: "course_communication_first",
            meta: {
              breadcrumb: [
                { name: "Comunicación del curso",abr:"Comunicación del curso", value: "course_communication" }
              ]
            }
          },
          {
            path: ":type",
            component: CourseComunnicationSecond,
            props: true,
            name: "course_communication_second",
            meta: {
              breadcrumb: [
                {
                  name: "Comunicación del curso",
                  abr:"Cc",
                  link: "course_communication_first",
                  value: "course_communication"
                },
                { name: "Estudiantes",abr:"Estudiantes", value: "course_communication" }
              ]
            }
          }
        ]
      },
      {
        path: "evaluation_panic",
        component: EvaluationPanicBase,
        children: [
          {
            path: "/",
            component: EvaluationPanicFirst,
            name: "evaluation_panic_first",
            meta: {
              breadcrumb: [{ name: "Pánico de evaluación",abr: "Pánico de evaluación", value: "evaluation_panic" }]
            }
          },
          {
            path: "evaluation_panic/:resource_id/:type/:date",
            component: EvaluationPanicSecond,
            name: "evaluation_panic_second",
            meta: {
              breadcrumb: [
                {
                  name: "Pánico de evaluación",
                  abr:"Pe",
                  link: "evaluation_panic_first",
                  value: "evaluation_panic"
                },
                { name: "Recursos",abr:"Recursos", value: "evaluation_panic" }
              ]
            }
          },
          {
            path: "evaluation_panic/:resource_id/:type/:date/:resource_detail",
            component: EvaluationPanicThird,
            name: "evaluation_panic_third",
            meta: {
              breadcrumb: [
                {
                  name: "Pánico de evaluación",
                  abr:"Pe",
                  link: "evaluation_panic_first",
                  value: "evaluation_panic"
                },
                {
                  name: "Recursos",
                  abr:"Recursos",
                  link: "evaluation_panic_second",
                  value: "evaluation_panic"
                },
                { name: "Estudiantes", abr:"Estudiantes",value: "evaluation_panic" }
              ]
            }
          }
        ]
      },

      {
        path: "course_interaction",
        component: CourseInteractionFirst,
        name: "course_interaction_first",
        meta: {
          breadcrumb: [{ name: "Interacciones por estudiante",abr: "Interacciones por estudiante", value: "course_interaction" }]
        }
      },
      {
        path: "course_interaction/summary",
        component: CourseInteractionSecond,
        name: "course_interaction_second",
        meta: {
          breadcrumb: [{ name: "Interacciones del grupo de curso",abr: "Interacciones del grupo de curso", value: "course_interaction" }]
        }
      }
    ]
  },
  {
    path: "/permission_rechazed/PERMISSION_REJECTED",
    beforeEnter: (to, from, next) => {
      if (existToken()) {
        next("courses");
      } else {
        localStorage.setItem("error_code", 1);
        next("login");
      }
    }
  },
  {
    path: "/permission_rechazed/TOKEN_OBTAIN_FAILED",
    beforeEnter: (to, from, next) => {
      if (existToken()) {
        next("courses");
      } else {
        localStorage.setItem("error_code", 2);
        next("login");
      }
    }
  },
  {
    path: "/permission_rechazed/LOCAL_AUTHENTICATION_FAILED",
    beforeEnter: (to, from, next) => {
      if (existToken()) {
        next("courses");
      } else {
        localStorage.setItem("error_code", 3);
        next("login");
      }
    }
  },
  {
    path: "/permission_rechazed/USER_NOT_EXIST",
    beforeEnter: (to, from, next) => {
      if (existToken()) {
        next("courses");
      } else {
        localStorage.setItem("error_code", 4);
        next("login");
      }
    }
  },
  {
    path: "/permission_rechazed/NOT_IS_TEACHER",
    beforeEnter: (to, from, next) => {
      if (existToken()) {
        next("courses");
      } else {
        localStorage.setItem("error_code", 5);
        next("login");
      }
    }
  },
  {
    path: "/:catchAll(.*)",
    beforeEnter: (to, from, next) => {
      if (existToken()) {
        next("courses");
      } else {
        localStorage.setItem("error_code", 404);
        next("login");
      }
    }
  }
];

const router = new VueRouter({
  // base: '/production',
  mode: "history",
  routes
});

export default router;

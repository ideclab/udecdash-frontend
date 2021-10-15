<template>
    <v-btn small rounded outlined  class="px-10 px-sm-5" id="v-step-5" @click="exportPDF()">
      <v-icon> mdi-download </v-icon>
    </v-btn>
</template>

<script>
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
export default {
  props: {
    report: {
      type: Object,
      default: () => ({
        name: "report",
        level: "first",
      }),
    },
    data: {
      default: null,
    },
    title: {
      default: "",
    },
  },
  data:()=>({
    months: [
      { id: 1, name: 'Enero' },
      { id: 2, name: 'Febrero' },
      { id: 3, name: 'Marzo' },
      { id: 4, name: 'Abril' },
      { id: 5, name: 'Mayo' },
      { id: 6, name: 'Junio' },
      { id: 7, name: 'Julio' },
      { id: 8, name: 'Agosto' },
      { id: 9, name: 'Septiembre' },
      { id: 10, name: 'Octubre' },
      { id: 11, name: 'Noviembre' },
      { id: 12, name: 'Diciembre' }
    ],
  }),
  methods: {
    exportPDF() {
      switch (this.report["name"]) {
        case "module_visualization":
          this.moduleVisualization();
          break;
        case "resource_type_usage":
          this.resourceTypeUsage();
          break;
        case "file_type_usage":
          this.fileTypeUsage();
          break;
        case "interaction_by_resource":
          this.interactionByResource();

          break;
        case "resource_visualization":
          this.resourceVisualization();
          break;
        case "course_communication":
          this.courseCommunication();
          break;
        case "evaluation_panic":
          this.evaluationPanic();
          break;
        case "course_interaction":
          this.courseInteraction();
          break;
        default:
          break;
      }
    },
    moduleVisualization() {
      let level = this.report["level"];
      if (level == "first") {
        this.firstLevelModuleVisualization();
      } else if (level == "second") {
        this.secondLevelModuleVisualization();
      } else if (level == "third") {
        this.thirdLevelModuleVisualization();
      }
    },
    firstLevelModuleVisualization() {
      const doc = new jsPDF();
      let body = [];
      let information = this.data.sort(
        (a, b) => b.visualizations_percentage - a.visualizations_percentage
      );
      information.forEach((e) => {
        body.push([e["name"], e["visualizations_percentage"] + "%"]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`Visualización por modulos `, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [
          { M: "Nombre de modulos", P: "Porcentaje de modulos concluidos" },
        ],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87],
        },
        columnStyles: {
          P: { halign: "center" },
        },
      });
      doc.save("Visualización por modulos.pdf");
    },
    secondLevelModuleVisualization() {
      const doc = new jsPDF();
      let body = [];
      let information = this.data.sort(
        (a, b) => b.percentage_of_views - a.percentage_of_views
      );
      information.forEach((e) => {
        body.push([e["name"], e["percentage_of_views"] + "%"]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`Visualización por modulos - ${this.title}`, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [{ E: "Estudiante", P: "Progreso del modulo" }],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87],
        },
        columnStyles: {
          P: { halign: "center" },
        },
      });
      doc.save(`Visualización por modulos - ${this.title}.pdf`);
    },
    thirdLevelModuleVisualization() {
      const doc = new jsPDF();
      let body = [];
      this.data.forEach((e) => {
        body.push([
          e["resource_name"],
          this.formatDate(e["first_view"]) +
            "  /  " +
            this.formatHour(e["first_view"]),
          e["viewed"] ? "visto" : "no visto",
        ]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`VM- ${this.title} `, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [{ R: "Recurso", H: "Hora de visualizacion", V: "Visualizado" }],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87],
        },
        columnStyles: {
          V: { halign: "center" },
        },
      });
      doc.save(`VM - ${this.title}.pdf`);
    },
    resourceTypeUsage() {
      let level = this.report["level"];
      if (level == "first") {
        this.firstLevelResourceTypeUsage();
      } else if (level == "second") {
        this.secondLevelResourceTypeUsage();
      } else if (level == "third") {
        this.thirdLevelResourceTypeUsage();
      }
    },
    firstLevelResourceTypeUsage() {
      const doc = new jsPDF();
      let body = [];
      this.data.forEach((e) => {
        body.push([
          this.transformSpanishName(e["name"]),
          e["resources_percentage"] + "%",
          e["resources_count"],
          e["resource_type_use_percentage"] + "%",
        ]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`Visualización por tipo de recurso `, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [
          {
            R: "Tipo de recurso",
            PR: "Porcentaje total del recurso",
            RE: "recursos existentes",
            PV: "Promedio de visualizacion",
          },
        ],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87],
        },
        columnStyles: {
          PR: { halign: "center" },
          RE: { halign: "center" },
          PV: { halign: "center" },
        },
      });
      doc.save("Visualización por tipo de recurso.pdf");
    },
    secondLevelResourceTypeUsage() {
      const doc = new jsPDF();
      let body = [];
      let information = this.data.sort(
        (a, b) =>
          b.members_visualizations_percentage -
          a.members_visualizations_percentage
      );
      information.forEach((e) => {
        body.push([
          e["resource_name"],
          e["members_visualizations_percentage"] + "%",
        ]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`VR- ${this.transformSpanishName(this.title)}`, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [{ N: "Nombre", V: "Porcentaje de visualizacion" }],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87],
        },
        columnStyles: {
          V: { halign: "center" },
        },
      });
      doc.save(`VR - ${this.transformSpanishName(this.title)}.pdf`);
    },
    thirdLevelResourceTypeUsage() {
      const doc = new jsPDF();
      let body = [];
      let information = this.data.sort((a, b) => b.first_view - a.first_view);
      information.forEach((e) => {
        body.push([
          e["name"],
          this.formatDate(e["first_view"]) +
            "  /  " +
            this.formatHour(e["first_view"]),
          e["viewed"] ? "visto" : "no visto",
        ]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`${this.title} `, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [["Estudiante", "Fecha", "Visualizado"]],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87],
        },
      });
      doc.save(`VT - ${this.title}.pdf`);
    },

    fileTypeUsage() {
      let level = this.report["level"];
      if (level == "first") {
        this.firstLevelFileTypeUsage();
      } else if (level == "second") {
        this.secondLevelFileTypeUsage();
      } else if (level == "third") {
        this.thirdLevelFileTypeUsage();
      }
    },
    firstLevelFileTypeUsage() {
      const doc = new jsPDF();
      let body = [];
      this.data.forEach((e) => {
        body.push([
          e["name"],
          e["file_percentage"] + "%",
          e["file_count"],
          e["downloads_count"],
          e["file_type_usage_percentage"] + "%",
        ]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`Visualización por tipo de recurso `, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [
          {
            A: "Tipos de archivos",
            PA: "Porcentaje total del archivo",
            AE: "archivos existentes",
            DT: "Descargas",
            PV: "Promedio de visualizacion",
          },
        ],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87],
        },
        columnStyles: {
          PA: { halign: "center" },
          AE: { halign: "center" },
          PV: { halign: "center" },
          DT: { halign: "center" },
        },
      });
      doc.save("Visualización por tipo de recurso.pdf");
    },

    secondLevelFileTypeUsage() {
      const doc = new jsPDF();
      let body = [];
      let information = this.data.sort(
        (a, b) =>
          b.members_visualizations_percentage -
          a.members_visualizations_percentage
      );
      information.forEach((e) => {
        body.push([
          e["resource_name"],
          e["members_visualizations_percentage"] + "%",
        ]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`VA - ${this.title}`, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [{ N: "Nombre", V: "Porcentaje de visualizacion" }],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87],
        },
        columnStyles: {
          V: { halign: "center" },
        },
      });
      doc.save(`VA - ${this.title}.pdf`);
    },
    thirdLevelFileTypeUsage() {
      const doc = new jsPDF();
      let body = [];
      this.data.forEach((e) => {
        body.push([
          e["name"],
          this.formatDate(e["first_view"]) +
            "  /  " +
            this.formatHour(e["first_view"]),
          e["viewed"] ? "visto" : "no visto",
        ]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`${this.title} `, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [["Estudiante", "Fecha", "Visualizado"]],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87],
        },
      });
      doc.save(`VA - ${this.title}.pdf`);
    },
    resourceVisualization() {
      let level = this.report["level"];
      if (level == "first") {
        this.firstLevelResourceVisualization();
      } else if (level == "second") {
        this.secondLevelResourceVisualization();
      }
    },
    firstLevelResourceVisualization() {
      const doc = new jsPDF();
      let body = [];
      this.data.forEach((e) => {
        body.push([
          e["resource_name"],
          e["student_count"],
          e["visualizations_count"],
        ]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`Visualización de recursos `, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [
          {
            R: "Recursos",
            TE: "Total de estudiantes a interactuar",
            TI: "Total de interacciones",
          },
        ],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87],
        },
        columnStyles: {
          TE: { halign: "center" },
          TI: { halign: "center" },
        },
      });
      doc.save("Visualización de recursos.pdf");
    },
    secondLevelResourceVisualization() {
      const doc = new jsPDF();
      let body = [];
      let information = this.data.sort((a, b) => b.views_count - a.views_count);

      information.forEach((e) => {
        body.push([e["name"], e["views_count"]]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`${this.title} `, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [{ E: "Estudiante", I: "Interacciones" }],
        body: body.sort(),
        headStyles: {
          fillColor: [0, 59, 87],
        },
        I: { halign: "center" },
      });
      doc.save(`VR - ${this.title}.pdf`);
    },

interactionByResource(){
      let level = this.report["level"];
      if (level == "first") {
        this.firstLevelInteractionByResource();
      } else if (level == "second") {
        this.secondLevelInteractionByResource();
      }
},
firstLevelInteractionByResource(){
      const doc = new jsPDF()
      doc.text('Interacción por recurso', 14, 16)
      doc.autoTable({ head:[ {H:''}],
       startY:  17,
       headStyles: {
            fillColor: [0, 0, 0,.0]
          }, })
      this.data.forEach(e => {
        let body = []
        doc.text(e.name, 14, doc.lastAutoTable.finalY + 10)
        e['resources_interaction'].forEach(p => {
          body.push([
            p.name,
            e.members_count - p.viewed_resources_count,
            p.viewed_resources_count
          ])
        })
        doc.autoTable({
          head: [
            {
              R: 'Recursos',
              C: 'Estudiantes sin interacciones',
              S: 'Estudiantes con interacciones'
            }
          ],
          body: body,
          startY: doc.lastAutoTable.finalY + 14,
          headStyles: {
            fillColor: [0, 59, 87]
          },
          columnStyles: {
            R: { cellWidth: 100 },
            C: { halign: 'center' },
            S: { halign: 'center' }
          }
        })
      })
      doc.save('Interación por recurso.pdf')
},
secondLevelInteractionByResource(){
      const doc = new jsPDF()
      let body = []
      this.data.forEach(e => {
        body.push([
          e['name'],
          this.formatDate(e['current_resource']['first_view']) +
            '  /  ' +
            this.formatHour(e['current_resource']['first_view']),
          e['current_resource']['viewed'] ? 'visto' : 'no visto'
        ])
      })
      var finalY = doc.lastAutoTable.finalY || 10
      doc.text(`${this.title} `, 14, finalY + 15)
      doc.autoTable({
        startY: finalY + 20,
        head: [['Estudiante', 'Fecha', 'Visualizado']],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87]
        }
      })
      doc.save(`IR- ${this.title}.pdf`)
},


    courseCommunication() {
      let level = this.report["level"];
      if (level == "first") {
        this.firstLevelCourseCommunication();
      } else if (level == "second") {
        this.secondLevelCourseCommunication();
      }
    },
    firstLevelCourseCommunication() {
      const doc = new jsPDF()
      let body = []
      let body2 = []
      doc.text('Comunicacion del curso', 14, 16)
      doc.text('Foros no evaluados', 14,25)
      body.push([
      this.data.information.discussion_entry_percentage,
      this.data.information.discussion_entry_count,
      this.data.member_count_discussion])
      body2.push([this.data.information.mail_messages_percentage,
      this.data.information.mail_messages_count,
      this.data.information.member_count_message])
      doc.autoTable({
          head: [
            {
              R: 'Porcentaje de uso dentro del curso',
              C: 'Entradas creadas',
              S: 'Participantes'
            }
          ],
          body: body,
          startY: 35,
          columnStyles: {
            R: { cellWidth: 100 },
            C: { halign: 'center' },
            S: { halign: 'center' }
          }
        });
        doc.text('Bandeja de entrada', 14, doc.lastAutoTable.finalY + 10)
        doc.autoTable({
          head: [
            {
              R: 'Porcentaje de uso dentro del curso',
              C: 'Entradas creadas',
              S: 'Participantes'
            }
          ],
          body: body2,
          startY: doc.lastAutoTable.finalY + 14,
          columnStyles: {
            R: { cellWidth: 100 },
            C: { halign: 'center' },
            S: { halign: 'center' }
          }
        })
  doc.save("Comunicación del curso.pdf");
    },
    secondLevelCourseCommunication() {
      const doc = new jsPDF();
      let body = [];
      let information = this.data.sort(
        (a, b) => b.creation_count - a.creation_count
      );
      information.forEach((e) => {
        body.push([e["name"], e["creation_count"]]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`${this.title} `, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [{ E: "Estudiante", I: "Interacciones" }],
        body: body.sort(),
        headStyles: {
          fillColor: [0, 59, 87],
        },
        columnStyles: {
          I: { halign: "center" },
        },
      });
      doc.save(`${this.title}.pdf`);
    },
    evaluationPanic() {
      let level = this.report["level"];
      if (level == "first") {
        this.firstLevelEvaluationPanic();
      } else if (level == "second") {
        this.secondLevelEvaluationPanic();
      } else if (level == "third") {
        this.thirdLevelEvaluationPanic();
      }
    },
    firstLevelEvaluationPanic() {
      const doc = new jsPDF();
      doc.text("Pánico de evaluacion", 14, 16);
      doc.autoTable({ head: [[]], body: [[]], startY: 20 });
      this.data.forEach((e) => {
        let head_before = [];
        let head_after = [];
        let body_before = [];
        let body_after = [];
        let after = [];
        var pageNumber = doc.internal.getNumberOfPages();

        doc.text(e.quiz.resource_name, 14, doc.lastAutoTable.finalY + 10);
        for (const index in e.viewed_after) {
          after.push(index);
        }
        head_before.push({
          RV: "Recursos visualizados",
          FE: "fecha pre evaluacion",
        });
        head_after.push({
          RV: "Recursos visualizados",
          FE: "fecha post evaluacion",
        });

        for (let index = 0; index < 3; index++) {
          body_before.push([
            e.viewed_before[e.date_viewed_before[index]].length,
            this.newformatDate(e.date_viewed_before[index]),
          ]);
          body_after.push([
            e.viewed_after[after[index]].length,
            this.newformatDate(after[index]),
          ]);
        }
        doc.setPage(pageNumber);

        doc.autoTable({
          head: head_before,
          body: body_before,
          startY: doc.lastAutoTable.finalY + 14,

          showHead: "firstPage",
          styles: { overflow: "hidden" },
          margin: { right: 107 },
          headStyles: {
            fillColor: [0, 59, 87],
          },
          columnStyles: {
            RV: { halign: "center" },
          },
        });
        doc.autoTable({
          head: head_after,
          body: body_after,
          startY: doc.lastAutoTable.finalY - 30.4,

          showHead: "firstPage",
          styles: { overflow: "hidden" },
          margin: { left: 107 },
          headStyles: {
            fillColor: [0, 59, 87],
          },
          columnStyles: {
            RV: { halign: "center" },
          },
        });
      });

      doc.save("Panico de evaluación.pdf");
    },
    secondLevelEvaluationPanic() {
      const doc = new jsPDF();
      let body = [];
      this.data.forEach((e) => {
        body.push([
          e.name,
          e.all_visualizations_count,
          e.members_visualization_percentage + "%",
        ]);
      });
      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`${this.title} `, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [
          {
            R: "Recurso",
            V: "Visualizaciones",
            P: "Porcentaje de estudiantes",
          },
        ],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87],
        },
        columnStyles: { P: { halign: "center" }, V: { halign: "center" } },
      });
      doc.save(`Pánico de evaluación - ${this.title}.pdf`);
    },
    thirdLevelEvaluationPanic() {
      const doc = new jsPDF();
      let body = [];
      this.data.forEach((e) => {
        body.push([e["name"], e["count_views"]]);
      });

      var finalY = doc.lastAutoTable.finalY || 10;
      doc.text(`${this.title} `, 14, finalY + 15);
      doc.autoTable({
        startY: finalY + 20,
        head: [{ E: "Estudiante", V: "Visualizaciones" }],
        body: body.sort(),
        columnStyles: { V: { halign: "center" } },
        headStyles: {
          fillColor: [0, 59, 87],
        },
      });
      doc.save(`PE - ${this.title}.pdf`);
    },

    formatDate(date) {
      if (date != null) {
        let newDate = new Date(date);
        let day =
          newDate.getDate().toString().length > 1
            ? newDate.getDate()
            : "0" + newDate.getDate().toString();
        let month =
          (newDate.getMonth() + 1).toString().length > 1
            ? newDate.getMonth() + 1
            : "0" + (newDate.getMonth() + 1).toString();
        let year = newDate.getFullYear();

        return day + "-" + month + "-" + year;
      } else {
        return "";
      }
    },
courseInteraction(){
     let level = this.report["level"];
      if (level == "first") {
        this.firstLevelCourseInteraction();
      } else if (level == "second") {
        this.secondLevelCourseInteraction();
      }
},
firstLevelCourseInteraction(){
  console.log(this.data)
    const doc = new jsPDF()
      let body = []
      let month = this.months.find(
        item => item.id == this.data['month']
      ).name
      this.data['information']['interaction'].forEach(e => {
        body.push([e])
      })
      var finalY = doc.lastAutoTable.finalY || 10
      doc.text(
        `Conexiónes de ${month} ${this.data['year']} `,
        14,
        finalY + 15
      )
      doc.autoTable({
        startY: finalY + 20,
        head: [[this.data.information.name]],
        body: body,
        headStyles: {
          fillColor: [0, 59, 87]
        }
      })
      doc.save(`IC - ${this.data.information.name} `)
},
secondLevelCourseInteraction(){
    let month = this.months.find(
        item => item.id == this.data
      ).name
 const doc = new jsPDF('L')
  doc.text(
        `Conexiónes de ${month} `,
        14, 15
      )
      html2canvas(document.querySelector('#grafico'), {
        imageTimeout: 5000,
        useCORS: true
      }).then(canvas => {
        let img = canvas.toDataURL('image/png')
        doc.addImage(img, 'JPEG', 10, 50, 280, 100)
        doc.save('Interacciones del curso.pdf')
      })
},
    formatHour(date) {
      if (date != null) {
        let newDate = new Date(date);
        let hour =
          newDate.getHours().toString().length > 1
            ? newDate.getHours()
            : "0" + newDate.getHours().toString();
        let minute =
          newDate.getMinutes().toString().length > 1
            ? newDate.getMinutes()
            : "0" + newDate.getMinutes().toString();

        return hour + ":" + minute;
      } else {
        return "";
      }
    },
    newformatDate(date) {
      let dd = date.split("-");
      let newDate = dd[2] + "-" + dd[1] + "-" + dd[0];
      return newDate;
    },
    transformSpanishName(name) {
      if (name == "Assignment") return "Tareas";
      else if (name == "Attachment") return "Documentos";
      else if (name == "ContextExternalTool") return "Herramientas externas";
      else if (name == "DiscussionTopic") return "Foros de discusión";
      else if (name == "ExternalUrl") return "Url externas";
      else if (name == "Quiz") return "Evaluaciones";
      else if (name == "WikiPage") return "Páginas";
      else return "Otros";
    },
  },
};
</script>
<style lang="scss" scoped>
.v-btn {
  border: 2px solid #706f6f !important;
  color: #706f6f;
       margin-left: 10px;
     @media only screen and (max-width: 600px) {
  height: 30px !important;
  }

  &:hover {
    color: white;
    background: #706f6f;
  }
}
</style>

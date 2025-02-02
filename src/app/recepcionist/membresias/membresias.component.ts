import { Component, OnInit } from '@angular/core';
import { plan } from 'src/app/servicios/plan';
import { PlanService } from 'src/app/servicios/plan.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css']
})
export class MembresiasComponent implements OnInit{
  plan: any;
  elID: any;
  membresias: any[] = []; // Declarar el tipo de elID como string o nulo
  item: any;

constructor(private activeRoute: ActivatedRoute,private router: Router, private planService: PlanService) {
  this.elID = this.activeRoute.snapshot.paramMap.get('id');
  console.log(this.elID);
  if (this.elID) { // Validar si el ID es nulo
    this.planService.obternerPlan().subscribe(
      (membresias: any) => {
        // Filtrar las membresías para obtener solo las del gimnasio con el ID correspondiente
        this.membresias = membresias.filter((item:any) => item.Gimnasio_idGimnasio === this.elID);
        console.log("esto hace"+this.membresias);
        const nombresMembresias = this.membresias.map((membresia: any) => membresia.titulo); // Reemplaza 'nombre' con el nombre de la propiedad que desees imprimir
    console.log("Nombres de membresías:", nombresMembresias);
      },
      (error) => {
        console.error('Error al obtener membresías:', error);
        // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje de error en tu aplicación.
      }
    );
  }
}

navegarPagina(url: String): void {
  //console.log("Va a navegar", url);
  this.router.navigate([ url ]);
}





  ngOnInit(): void {
    this.planService.obternerPlan().subscribe(respuesta=>{console.log(respuesta)
    this.plan=respuesta;
    });
    
  }

}

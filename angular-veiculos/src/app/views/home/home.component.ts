import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';


export interface PeriodicElement {
  id: number;
  placa: string;
  chassi: string;
  renavan: string;
  modelo: string;
  marca: string;
  ano: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, placa: 'JIN0814', chassi: 'qwe1234', renavan: '1234', modelo: '207', marca: 'Peugeot', ano: 2010},
  {id: 2, placa: 'BUZ6737', chassi: 'BA22', renavan: '0037', modelo: 'BRASILIA', marca: 'VW', ano: 1976},
  {id: 3, placa: 'jku9091', chassi: '9BFZ', renavan: '5678', modelo: 'ESCORT', marca: 'FORD', ano: 1993}
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'placa', 'chassi', 'renavan', 'modelo', 'marca', 'ano', 'actions'];
  dataSource = ELEMENT_DATA;
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(element: PeriodicElement | null): void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        id: null,
        placa: '',
        chassi: '',
        renavan: '',
        modelo: '',
        marca: '',
        ano: null
      } : {
        id: element.id,
        placa: element.placa,
        chassi: element.chassi,
        renavan: element.renavan,
        modelo: element.modelo,
        marca: element.marca,
        ano: element.ano
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(i => i.id).includes(result.id)) {
          this.dataSource[result.id -1] = result;
          this.table.renderRows();
        }else{
          this.dataSource.push(result);
          this.table.renderRows();
        }
        this.dataSource.push(result);
        this.table.renderRows();
      }
    });
  }

  deleteElement(id: number): void{
    this.dataSource = this.dataSource.filter(i => i.id !== id);
  }

  editElement(element: PeriodicElement):void{
    this.openDialog(element);
  }

}

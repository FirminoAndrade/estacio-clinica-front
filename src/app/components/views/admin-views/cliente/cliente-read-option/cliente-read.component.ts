import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/components/models/cliente.modelo';
import { ClienteService } from 'src/app/components/services/cliente.service';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css'],
})
export class ClienteReadComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'cpf',
    'dataNascimento',
    'email',
    'telefone',
    'acoes',
  ];
  clientes: Cliente[] = [];
  qtdClientes!: number;
  dataSource!: MatTableDataSource<Cliente>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ClienteService, private router: Router) {
    this.service.listarClientesService().subscribe((resposta) => {
      this.dataSource = new MatTableDataSource(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }
  public ngOnInit(): void {
    this.listarClientes();
    this.quantidadeClientes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public listarClientes() {
    this.service.listarClientesService().subscribe((resposta) => {
      this.clientes = resposta;
    });
  }

  public quantidadeClientes() {
    this.service.quantidadeClientes().subscribe((resposta) => {
      this.qtdClientes = resposta;
    });
  }

  public navegarParaClienteCreate() {
    this.router.navigate(['clientes/create']);
  }
}

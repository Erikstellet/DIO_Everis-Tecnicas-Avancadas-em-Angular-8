import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component
({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss']
})
export class VisualizarFilmesComponent implements OnInit
{
  readonly semFoto = "https://cutt.ly/KhKtsdK";

  filme: Filme;
  id: number;

  constructor
  (
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private filmesService: FilmesService,
    private router: Router
  ) { }

  ngOnInit()
  {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  private excluir(): void
  {
    const config =
      {
        data:
          {
            titulo: "Você realmente que apagar?",
            descricao: "Caso tenha certeza, clique no botão Ok",
            corBtnSucesso: 'warn',
            corBtnCancelar: 'primary',
            possuirBtnFechar: true
          } as Alerta
      }

      const dialogRef = this.dialog.open(AlertaComponent, config);

      dialogRef.afterClosed().subscribe((opcao: boolean) =>
      {
        if(opcao)
        {
          this.filmesService.excluir(this.id)
                            .subscribe(() => this.router.navigateByUrl('/filmes'));
        }
      });
  }

  private visualizar(): void
  {
    this.filmesService.visualizar(this.id)
                      .subscribe((filme: Filme) => this.filme = filme);
  }
}


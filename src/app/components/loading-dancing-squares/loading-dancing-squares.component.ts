import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-dancing-squares',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-dancing-squares.component.html',
  styleUrls: ['./loading-dancing-squares.component.scss']
})
export class LoadingDancingSquaresComponent {
  @Input() size = 18;     // tamaño de cada cuadrito
  @Input() gap  = 6;      // espacio entre cuadritos
}


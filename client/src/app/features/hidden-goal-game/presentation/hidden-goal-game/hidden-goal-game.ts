import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavBar } from '../../../../shared/nav-bar/nav-bar';

@Component({
  selector: 'app-hidden-goal-game',
  imports: [NavBar],
  templateUrl: './hidden-goal-game.html',
})
export class HiddenGoalGame implements OnInit, OnDestroy {
  gameState: 'BUSCANDO_PELOTA' | 'BUSCANDO_ARCO' | 'GOL' = 'BUSCANDO_PELOTA';
  boostPercentage: number = 0;
  boostColor: string = 'bg-blue-500';
  
  // Posiciones de los objetivos (porcentajes relativos al contenedor)
  ballPosition = { x: 30, y: 60 };
  goalPosition = { x: 70, y: 40 };
  
  mousePosition = { x: 0, y: 0 };
  ballFound: boolean = false;
  goalFound: boolean = false;
  
  // Timer system
  startTime: number = 0;
  elapsedTime: number = 0;
  timerInterval: any = null;
  finalTime: number = 0;
  
  onMouseMove(event: MouseEvent) {
    const gameContainer = event.currentTarget as HTMLElement;
    const rect = gameContainer.getBoundingClientRect();
    
    this.mousePosition.x = ((event.clientX - rect.left) / rect.width) * 100;
    this.mousePosition.y = ((event.clientY - rect.top) / rect.height) * 100;
    
    this.updateBoost();
  }
  
  onGameClick(event: MouseEvent) {
    if (this.gameState === 'GOL') return;
    
    const gameContainer = event.currentTarget as HTMLElement;
    const rect = gameContainer.getBoundingClientRect();
    
    const clickX = ((event.clientX - rect.left) / rect.width) * 100;
    const clickY = ((event.clientY - rect.top) / rect.height) * 100;
    
    if (this.gameState === 'BUSCANDO_PELOTA') {
      const distanceToBall = Math.hypot(clickX - this.ballPosition.x, clickY - this.ballPosition.y);
      if (distanceToBall < 5) { // 5% de tolerancia
        this.ballFound = true;
        this.gameState = 'BUSCANDO_ARCO';
      }
    } else if (this.gameState === 'BUSCANDO_ARCO') {
      const distanceToGoal = Math.hypot(clickX - this.goalPosition.x, clickY - this.goalPosition.y);
      if (distanceToGoal < 8) { // 8% de tolerancia para el arco
        this.goalFound = true;
        this.gameState = 'GOL';
        this.finalTime = this.elapsedTime;
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
          this.timerInterval = null;
        }
      }
    }
  }
  
  private updateBoost() {
    let targetX, targetY;
    
    if (this.gameState === 'BUSCANDO_PELOTA') {
      targetX = this.ballPosition.x;
      targetY = this.ballPosition.y;
    } else if (this.gameState === 'BUSCANDO_ARCO') {
      targetX = this.goalPosition.x;
      targetY = this.goalPosition.y;
    } else {
      this.boostPercentage = 0;
      return;
    }
    
    const distance = Math.hypot(this.mousePosition.x - targetX, this.mousePosition.y - targetY);
    const maxDistance = Math.hypot(100, 100); // Máxima distancia posible en el contenedor
    
    // Convertir distancia a porcentaje de boost (invertido: más cerca = más boost)
    this.boostPercentage = Math.max(0, Math.min(100, 100 - (distance / maxDistance) * 100));
    
    // Actualizar color del boost
    if (this.boostPercentage > 66) {
      this.boostColor = 'bg-red-500';
    } else if (this.boostPercentage > 33) {
      this.boostColor = 'bg-orange-500';
    } else {
      this.boostColor = 'bg-blue-500';
    }
  }
  
  ngOnInit() {
    this.resetGame();
  }
  
  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
  
  resetGame() {
    // Detener timer anterior
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    // Generar coordenadas aleatorias
    this.ballPosition = this.generateRandomPosition(15, 85, 15, 85);
    this.goalPosition = this.generateRandomPosition(15, 85, 15, 85);
    
    // Asegurar que no estén demasiado cerca
    while (this.arePositionsTooClose(this.ballPosition, this.goalPosition)) {
      this.goalPosition = this.generateRandomPosition(15, 85, 15, 85);
    }
    
    this.gameState = 'BUSCANDO_PELOTA';
    this.ballFound = false;
    this.goalFound = false;
    this.boostPercentage = 0;
    this.boostColor = 'bg-blue-500';
    this.finalTime = 0;
    
    // Iniciar timer
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
    }, 10);
  }
  
  private generateRandomPosition(minX: number, maxX: number, minY: number, maxY: number) {
    return {
      x: Math.random() * (maxX - minX) + minX,
      y: Math.random() * (maxY - minY) + minY
    };
  }
  
  private arePositionsTooClose(pos1: any, pos2: any, minDistance: number = 25) {
    const distance = Math.hypot(pos1.x - pos2.x, pos1.y - pos2.y);
    return distance < minDistance;
  }
}

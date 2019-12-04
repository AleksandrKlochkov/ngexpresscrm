import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { PositionsService } from 'src/app/shared/servises/position.service'
import { Position } from '../../../shared/interfaces'
import { MaterialServices, MaterialInstance } from 'src/app/shared/classes/material.services'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string
  @ViewChild('modal', {static: true}) modalRef: ElementRef
  positions: Position[] = []
  loading = false
  positionId = null
  modal: MaterialInstance
  form: FormGroup

  constructor(private positionService: PositionsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })
    this.loading = true
    this.positionService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions 
      this.loading = false
    })
  }

  ngAfterViewInit(){
    this.modal = MaterialServices.initModal(this.modalRef)
  }

  ngOnDestroy(){
    this.modal.destroy()
  }

  onSelectPosition(position: any) {
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open()
    MaterialServices.updateTextInputs()
  }

  onAddPosition(){
    this.positionId = null
    this.form.reset({
      name: null,
      cost: 1
    })
    this.modal.open()
    MaterialServices.updateTextInputs()
  }

  onCancel(){
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()

    const newPosition: any = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    const completed = () => {
      this.modal.close()
      this.form.reset( {name: '', cost: 1})
      this.form.enable()
    }

    if(this.positionId){
      newPosition._id = this.positionId
      this.positionService.update(newPosition).subscribe(
        (position: any) => {
          const idx = this.positions.findIndex((p: any) => p._id === position._id)
          this.positions[idx] = position
          MaterialServices.toast('Изменения сохранены')
        },
        error => {
          MaterialServices.toast(error.error.message)
        },
        completed
      )
    }else {
      this.positionService.create(newPosition).subscribe(
        position => {
          MaterialServices.toast('Позиция создана')
          this.positions.push(position)
        },
        error => {
          MaterialServices.toast(error.error.message)
        },
        completed
      )
    }

  }

  onDeletePosition(event: Event, position: any){
    event.stopPropagation()
    const decition = window.confirm(`Удалить позицию "${position.name}"?`)

    if (decition) {
      this.positionService.delete(position).subscribe(
        response => {
          const idx = this.positions.findIndex((p: any) => p._id === position._id)
          this.positions.splice(idx, 1)
          MaterialServices.toast(response.message)
        },
        error => MaterialServices.toast(error.error.message), 
      )
    }
  }

}

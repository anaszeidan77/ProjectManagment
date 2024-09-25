import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../components/shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // private componentRef!: ComponentRef<ModalComponent>;
  // private componentSubscriber!: Subject<string>;
  // constructor(private resolver: ComponentFactoryResolver) {}

  // openModal(entry: ViewContainerRef, modalTitle: string, modalBody: string) {
  //   let factory = this.resolver.resolveComponentFactory(ModalComponent);
  //   this.componentRef = entry.createComponent(factory);
  //   this.componentRef.instance.title = modalTitle;
  //   this.componentRef.instance.body = modalBody;
  //   this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
  //   this.componentRef.instance.confirmEvent.subscribe(() => this.confirm());
  //   this.componentSubscriber = new Subject<string>();
  //   return this.componentSubscriber.asObservable();
  // }

  // closeModal() {
  //   this.componentSubscriber.complete();
  //   this.componentRef.destroy();
  // }

  // confirm() {
  //   this.componentSubscriber.next('confirm');
  //   this.closeModal();
  // }


  private componentRef!: ComponentRef<ModalComponent>;
  private componentSubscriber!: Subject<any>;

  constructor(private resolver: ComponentFactoryResolver) {}

  openModal(entry: ViewContainerRef, modalConfig: { title: string, bodyTemplate: any, buttons?: any[], data?: any }) {
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = entry.createComponent(factory);

    this.componentRef.instance.title = modalConfig.title;
    this.componentRef.instance.bodyTemplate = modalConfig.bodyTemplate;
    this.componentRef.instance.buttons = modalConfig.buttons || [];
    this.componentRef.instance.data = modalConfig.data || {};

    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe((action: string) => this.confirm(action));

    this.componentSubscriber = new Subject<any>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm(action: string) {
    this.componentSubscriber.next(action);
    this.closeModal();
  }
}

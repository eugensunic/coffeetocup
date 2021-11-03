import { Store, Select } from '@ngxs/store';
import { SetCommentTextArea } from '../states/comment-area.state';
import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { CoffeeBrewStates } from './brewing-process-input/states/combined.states';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
@Component({
  selector: 'app-pour-over-form',
  templateUrl: './pour-over-form.component.html',
})
export class PourOverFormComponent implements OnInit, OnDestroy {
  textAreaComment = '';
  blockPageReloadRef = this.blockPageReload;
  coffeeInMaking;
  @Select(CoffeeBrewStates)
  coffeeBrew$: Observable<any>;
  toggle = false;
  stepIndex = 0;

  constructor(private store: Store, private shared: SharedService) {}

  ngOnInit() {
    this.coffeeBrew$.subscribe((x) =>
      this.shared.getActiveStepIndex().subscribe((index) => {
        this.stepIndex = index;
      })
    );
    // window.addEventListener('beforeunload', (e: any) => this.blockPageReloadRef(e));
  }

  changeTextArea() {
    this.store.dispatch(new SetCommentTextArea(this.textAreaComment));

    this.writeParallelCommentForSm(this.textAreaComment);
  }

  blockPageReload(x) {
    x.returnValue = 'your custom message';
  }

  myFunc() {
    this.toggle = !this.toggle;
  }

  ngOnDestroy() {
    // window.removeEventListener('beforeunload', (e: any) => this.blockPageReloadRef(e));
  }

  writeParallelCommentForSm(comment) {
    if (document.getElementById('comment-origin-sm')) {
      (document.getElementById('comment-origin-sm') as HTMLInputElement).value = comment;
    }
    if (document.getElementById('comment-brew-sm')) {
      (document.getElementById('comment-brew-sm') as HTMLInputElement).value = comment;
    }
    if (document.getElementById('comment-attributes-sm')) {
      (document.getElementById('comment-attributes-sm') as HTMLInputElement).value = comment;
    }
  }
}

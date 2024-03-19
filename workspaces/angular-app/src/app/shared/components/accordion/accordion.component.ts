// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  inject,
} from '@angular/core';
import { AccordionItemComponent } from './directives/accordion-item.directive';
import { sectionExpanded } from '../../animations/section.animations';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { ELEMENT_ID_TYPE } from 'src/app/utilities/constants';

@Component({
  selector: 'oz-accordion',
  templateUrl: './accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sectionExpanded],
  host: {
    class: 'accordion',
  },
})
export class AccordionComponent implements AfterViewInit {
  @Input() collapsible: boolean = true;
  @Output() openedItem: EventEmitter<number> = new EventEmitter<number>();
  @ContentChildren(AccordionItemComponent)
  accordionItems!: QueryList<AccordionItemComponent>;

  private _changeDetectorRef = inject(ChangeDetectorRef);

  expandedIds = new Set<number>();

  ngAfterViewInit(): void {
    this._changeDetectorRef.markForCheck();
  }

  toggle(index: number): void {
    const item = this.accordionItems.get(index);

    if (item?.isDisabled) {
      return;
    }

    if (this.expandedIds.has(index)) {
      this.expandedIds.delete(index);
    } else {
      if (this.collapsible) {
        this.expandedIds.clear();
      }

      this.expandedIds.add(index);
      this.openedItem.emit(index);
    }
  }

  getId(title: string): string {
    return UtilityService.prepareIdsForAutomationTests(
      title,
      ELEMENT_ID_TYPE.CONTAINER
    );
  }
}

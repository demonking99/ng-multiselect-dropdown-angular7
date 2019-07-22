import { Component, Type, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MultiSelectComponent, IDropdownSettings } from './../src';
import { createTestingModule, tickAndDetectChanges } from './helper';

@Component({
  template: ``
})
class MultiSelectDropdownMultipleSelectComponent {
  @ViewChild(MultiSelectComponent, { static: false }) select: MultiSelectComponent;
  cities = [
    { item_id: 0, item_text: 'Navsari' },
    { item_id: 1, item_text: 'Mumbai' },
    { item_id: 2, item_text: 'Bangalore' },
    { item_id: 3, item_text: 'Pune' },
    { item_id: 5, item_text: 'New Delhi' }
  ];
  selectedItem = [{ item_id: 0, item_text: 'Navsari' }];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
}
// https://github.com/haison8x/ng-multiselect-dropdown-latest/issues/67
describe('ng-multiselect-component: Issue No: 67( Option with value = 0 does not work)', function() {
  let fixture: ComponentFixture<MultiSelectDropdownMultipleSelectComponent>;
  beforeEach(fakeAsync(() => {
    fixture = createTestingModule(
      MultiSelectDropdownMultipleSelectComponent,
      `<div class='container'>
          <ng-multiselect-dropdown name="city" [data]="cities"
      [(ngModel)]="selectedItem" [settings]="dropdownSettings"
      (onSelect)="onItemSelect($event)"
      [disabled]="disabled">
    </ng-multiselect-dropdown>
    </div>`
    );
  }));

  it('should have 5 total items', () => {
    const de: DebugElement[] = fixture.debugElement.queryAll(By.css('.item2>li'));
    expect(fixture.componentInstance.cities.length).toBe(5);
    expect(de.length).toBe(5);
    expect(fixture.componentInstance.selectedItem.length).toBe(1);
  });
});

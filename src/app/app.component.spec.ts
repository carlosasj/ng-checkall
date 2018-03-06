import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgCheckallModule } from './modules/ng-checkall/ng-checkall.module';
import { FormsModule } from '@angular/forms';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const detectChanges = async (n = 10) => {
    fixture.detectChanges();
    await sleep(n);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgCheckallModule,
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should toggle the last item', async(() => {
    component.toggleItem();
    fixture.detectChanges();
    expect(component.checkItems.filter(i => !i.disabled).every(i => i.checked)).toBeTruthy();
  }));

  it('should mark the "Check All" when toggle the last item', async () => {
    component.toggleItem();
    await detectChanges();
    expect(component.checkAll).toBeTruthy();
  });

  it('should unmark the "Check All" when added an item', async () => {
    // Mark all the items, so "Check All" will be checked as well
    component.toggleItem();
    await detectChanges();
    expect(component.checkAll).toBeTruthy();

    // Add an item
    component.addItem();
    await detectChanges();
    expect(component.checkAll).toBeFalsy();
  });

  it('should mark the "Check All" when toggle the "disabled" property', async () => {
    component.toggleDisabled();
    await detectChanges();
    expect(component.checkAll).toBeTruthy();
  });

  it('should mark only the enabled items on the "Check All" click', async () => {
    // Add items and mark all of them as unchecked
    component.addItem();
    component.addItem();
    component.checkItems.forEach(i => i.checked = false);
    await detectChanges();
    expect(component.checkAll).toBeFalsy();

    // Click on Check All
    fixture.nativeElement.querySelector('[checkall]').click();
    await detectChanges();
    expect(component.checkAll).toBeTruthy();
    expect(component.checkItems.filter(i => !i.disabled).every(i => i.checked)).toBeTruthy();
    expect(component.checkItems.filter(i => i.disabled).every(i => !i.checked)).toBeTruthy();
  });

  it('dynamic items should mark/unmark "Check All"', async () => {
    // Add items and mark all of them as checked
    component.addItem();
    component.addItem();
    component.checkItems.forEach(i => i.checked = true);

    await detectChanges();
    expect(component.checkAll).toBeTruthy();

    // Get last item
    const last = fixture.nativeElement.querySelectorAll('[checkone]').item(component.checkItems.length - 1);

    // Unmark
    last.click();
    await detectChanges();
    expect(component.checkAll).toBeFalsy();

    // Mark
    last.click();
    await detectChanges();
    expect(component.checkAll).toBeTruthy();
  });

});

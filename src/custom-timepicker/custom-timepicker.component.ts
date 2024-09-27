import {
  Component,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  ElementRef,
  AfterViewInit,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-common-timepicker',
  templateUrl: './custom-timepicker.component.html',
})
export class CommonTimepickerComponent implements AfterViewInit {
  @Input() modelValue: any = { hour: 0, minute: 0, second: 0 };
  @Output() modelValueChange = new EventEmitter<any>();
  @Input() meridian: boolean = false;
  @Input() name: any;
  @Input() id: any;
  @ViewChild('timePicker', { static: false }) timePicker!: NgbTimepicker;
  @ViewChild('timePicker', { read: ElementRef }) timePickerElement!: ElementRef;
  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Initialize time if it's null or undefined
    if (!this.modelValue) {
      this.modelValue = { hour: 0, minute: null, second: null }; // Set a default time
    }
  }
  ngAfterViewInit() {
    // Initialize the timepicker when the component is fully rendered
    this.initializeTimepicker();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Reinitialize the timepicker when the 'meridian' value changes (for 12-hour vs 24-hour toggle)
    if (changes['meridian']) {
      this.initializeTimepicker();
      this.updateTimeView(this.modelValue);
    }
  }

  initializeTimepicker() {
    setTimeout(() => {
      const timepickerElement =
        this.elRef.nativeElement.querySelector('ngb-timepicker');
      if (this.meridian) {
        // If it's a 12-hour format, setup the meridian dropdown
        const meridianButton = timepickerElement?.querySelector(
          'button.btn-outline-primary'
        );
        if (meridianButton) {
          this.convertMeridianToggleToDropdown(meridianButton);
        } else {
          console.warn('Meridian button not found!');
        }
      }
    }, 0);
  }

  // Method to convert the meridian toggle button into a dropdown
  convertMeridianToggleToDropdown(button: HTMLElement) {
    const select = this.renderer.createElement('select');
    this.renderer.addClass(select, 'custom-select');
    this.renderer.addClass(select, 'header-select');

    // Create options for AM and PM
    ['AM', 'PM'].forEach((meridian) => {
      const option = this.renderer.createElement('option');
      this.renderer.appendChild(option, this.renderer.createText(meridian));
      this.renderer.setProperty(option, 'value', meridian);
      this.renderer.appendChild(select, option);
    });

    // Set the dropdown value based on the hour
    this.renderer.setProperty(
      select,
      'value',
      this.modelValue.hour < 12 ? 'AM' : 'PM'
    );
    this.renderer.listen(select, 'change', (event) => {
      this.updateMeridian(event.target.value);
    });

    // Replace the button with the dropdown
    this.renderer.insertBefore(button.parentNode, select, button);
    this.renderer.removeChild(button.parentNode, button);
  }

  // Update the meridian based on the dropdown selection
  updateMeridian(selectedMeridian: string) {
    if (selectedMeridian === 'AM' && this.modelValue.hour >= 12) {
      this.modelValue.hour -= 12;
    } else if (selectedMeridian === 'PM' && this.modelValue.hour < 12) {
      this.modelValue.hour += 12;
    }
    // Handle edge case for 24 hours
    if (this.modelValue.hour === 24) {
      this.modelValue.hour = 0; // Reset to 0 for AM
    }
    this.modelValueChange.emit(this.modelValue);
  }

  updateTimeView(newValue?: any) {
    if (newValue) {
      // Reset the timepicker value
      if (this.timePicker) this.timePicker.writeValue(null);
      this.cdr.detectChanges();
      this.timePicker.writeValue(newValue);
      this.modelValueChange.emit(newValue);
      // Calculate AM/PM based on the hours from newValue
      const hours = newValue.hour; // Assuming newValue is a Date object
      const meridian = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
      // Access the timepicker's input element directly
      const timepickerElement = this.timePickerElement.nativeElement; // Access the underlying element
      const meridianSelect = timepickerElement.querySelector(
        'select.header-select'
      );
      if (meridianSelect) {
        this.renderer.setProperty(meridianSelect, 'value', meridian); // Update the dropdown value
      }
    }
  }
}

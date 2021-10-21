import {Directive, Input, ElementRef, OnInit, forwardRef, NgZone, Injector, AfterViewInit} from '@angular/core';
import {FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, Validators, AbstractControl } from '@angular/forms';

declare const grecaptcha: any;

declare global {
  interface Window {
    grecaptcha: any;
    reCaptchaLoad: () => void;
  }
}

export interface ReCaptchaConfig {
  theme?: 'dark' | 'light';
  type?: 'audio' | 'image';
  size?: 'compact' | 'normal';
  tabindex?: number;
}

@Directive({
  selector: '[appRecaptcha]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RecaptchaDirective),
      multi: true
    }]
})
export class RecaptchaDirective implements OnInit, AfterViewInit, ControlValueAccessor {
  private control: AbstractControl;

  @Input() key: string;
  @Input() config: ReCaptchaConfig = {};
  @Input() lang: string;

  private onChange: ( value: string ) => void;
  private onTouched: ( value: string ) => void;

  private widgetId: number;

  constructor(private element: ElementRef, private  ngZone: NgZone, private injector: Injector) { }

  ngOnInit(): void {
    this.registerReCaptchaCallback();
    this.addScript();
  }

  writeValue( obj: any ): void {
  }

  registerOnChange( fn: any ): void {
    this.onChange = fn;
  }

  registerOnTouched( fn: any ): void {
    this.onTouched = fn;
  }

  registerReCaptchaCallback(): void {
    window.reCaptchaLoad = () => {
      const config = {
        ...this.config,
        'sitekey': this.key,
        'callback': this.onSuccess.bind(this),
        'expired-callback': this.onExpired.bind(this)
      };
      this.widgetId = this.render(this.element.nativeElement, config);
    };
  }

  private render( element: HTMLElement, config ): number {
    return grecaptcha.render(element, config);
  }

  onExpired(): void {
    this.ngZone.run(() => {
      this.onChange(null);
      this.onTouched(null);
    });
  }

  onSuccess( token: string ): void {
    this.ngZone.run(() => {
      this.onChange(token);
      this.onTouched(token);
    });
  }

  ngAfterViewInit(): void {
    this.control = this.injector.get(NgControl).control;
    this.setValidator();
  }

  private setValidator(): void {
    this.control.setValidators(Validators.required);
    this.control.updateValueAndValidity();
  }

  addScript(): void {
    const script = document.createElement('script');
    const lang = this.lang ? '&hl=' + this.lang : '';
    script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit&hl=en`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Manejar fragmentos cuando se navega a esta ruta
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.route.fragment.subscribe(fragment => {
          if (fragment) {
            setTimeout(() => {
              this.scrollToFragment(fragment);
            }, 100);
          }
        });
      });

    // También manejar el fragmento inicial si existe
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.scrollToFragment(fragment);
        }, 300);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private scrollToFragment(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      const offset = 80; // Altura del navbar sticky
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
